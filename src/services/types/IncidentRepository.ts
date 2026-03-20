export interface Incident {
  file_hash: string;
  ai_score: number;
  verdict: 'REAL' | 'AI_GENERATED' | 'INCONCLUSIVE';
  latitude?: number;
  longitude?: number;
  search_context_jsonB?: any;
}

export interface IncidentRepository {
  findByHash(hash: string): Promise<Incident | null>;
  findInBoundingBox(swLat: number, swLng: number, neLat: number, neLng: number): Promise<Incident[]>;
  create(data: Omit<Incident, 'id' | 'createdAt'>): Promise<Incident>;
}
