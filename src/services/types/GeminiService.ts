export interface GeminiResult {
  probability: number;
  verdict: 'REAL' | 'AI_GENERATED' | 'INCONCLUSIVE';
}

export interface GeminiService {
  analyze(file: File): Promise<GeminiResult>;
}
