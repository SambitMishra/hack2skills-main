export interface SearchContext {
  title: string;
  url: string;
  snippet: string;
  sourceAuthenticityScore?: number;
}

export interface SearchService {
  searchContext(query: string): Promise<SearchContext[]>;
}
