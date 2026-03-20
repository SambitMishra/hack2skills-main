import type { IncidentRepository } from './types/IncidentRepository';
import type { GeminiService } from './types/GeminiService';
import type { SearchService } from './types/SearchService';

export const analyzeMedia = async (
  file: File,
  repo: IncidentRepository,
  gemini: GeminiService,
  search: SearchService
) => {
  if (!file) throw new Error('No file provided');

  // In production, we'd generate a sophisticated perceptual vector here.
  const fileHash = `mock-hash`;

  const existingIncident = await repo.findByHash(fileHash);

  if (existingIncident) {
    return {
      isVerifiedDuplicate: true,
      aiProbabilityScore: existingIncident.ai_score,
      verdict: existingIncident.verdict,
      searchGroundingContext: existingIncident.search_context_jsonB || [],
      incidentId: 'existing-id' // mock id
    };
  }

  // Cache miss. Call Gemini & Search concurrently for efficiency.
  const [aiResult, searchContext] = await Promise.all([
    gemini.analyze(file),
    search.searchContext(file.name)
  ]);

  // Save the resultant data to our repository without saving the image blob.
  await repo.create({
    file_hash: fileHash,
    ai_score: aiResult.probability,
    verdict: aiResult.verdict,
    search_context_jsonB: searchContext
  });

  return {
    isVerifiedDuplicate: false,
    aiProbabilityScore: aiResult.probability,
    verdict: aiResult.verdict,
    searchGroundingContext: searchContext,
    incidentId: 'new-id' 
  };
};
