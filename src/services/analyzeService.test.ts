import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeMedia } from './analyzeService';
import { IncidentRepository } from './types/IncidentRepository';
import { GeminiService } from './types/GeminiService';
import { SearchService } from './types/SearchService';

describe('Analyze Service', () => {
  let mockRepo: IncidentRepository;
  let mockGemini: GeminiService;
  let mockSearch: SearchService;

  beforeEach(() => {
    mockRepo = {
      findByHash: vi.fn(),
      findInBoundingBox: vi.fn(),
      create: vi.fn()
    };

    mockGemini = {
      analyze: vi.fn()
    };

    mockSearch = {
      searchContext: vi.fn()
    };
  });

  it('bypasses Gemini if media hash is found in the incidents repository', async () => {
    const file = new File(['fake data'], 'test.png', { type: 'image/png' });
    
    // Setup cache hit
    vi.mocked(mockRepo.findByHash).mockResolvedValue({
      file_hash: 'mock-hash',
      ai_score: 0.99,
      verdict: 'AI_GENERATED',
      latitude: undefined,
      longitude: undefined,
      search_context_jsonB: []
    });

    const result = await analyzeMedia(file, mockRepo, mockGemini, mockSearch);

    expect(mockRepo.findByHash).toHaveBeenCalled();
    expect(mockGemini.analyze).not.toHaveBeenCalled();
    expect(mockSearch.searchContext).not.toHaveBeenCalled();
    
    expect(result.isVerifiedDuplicate).toBe(true);
    expect(result.aiProbabilityScore).toBe(0.99);
    expect(result.verdict).toBe('AI_GENERATED');
  });

  it('calls Gemini and Search if media hash is not in repository, then saves result', async () => {
    const file = new File(['fake data'], 'test.png', { type: 'image/png' });
    
    // Setup cache miss
    vi.mocked(mockRepo.findByHash).mockResolvedValue(null);
    vi.mocked(mockGemini.analyze).mockResolvedValue({
      probability: 0.1,
      verdict: 'REAL'
    });
    vi.mocked(mockSearch.searchContext).mockResolvedValue([{
      title: 'Original Source',
      url: 'http://example.com',
      snippet: 'This is the original image.',
      sourceAuthenticityScore: 0.95
    }]);

    const result = await analyzeMedia(file, mockRepo, mockGemini, mockSearch);

    expect(mockRepo.findByHash).toHaveBeenCalled();
    expect(mockGemini.analyze).toHaveBeenCalledWith(file);
    expect(mockSearch.searchContext).toHaveBeenCalled();
    expect(mockRepo.create).toHaveBeenCalled(); // Should save the new incident
    
    expect(result.isVerifiedDuplicate).toBe(false);
    expect(result.aiProbabilityScore).toBe(0.1);
    expect(result.verdict).toBe('REAL');
    expect(result.searchGroundingContext).toHaveLength(1);
  });

  it('throws an error if file is empty or missing', async () => {
    await expect(analyzeMedia(null as unknown as File, mockRepo, mockGemini, mockSearch))
      .rejects
      .toThrow('No file provided');
  });
});
