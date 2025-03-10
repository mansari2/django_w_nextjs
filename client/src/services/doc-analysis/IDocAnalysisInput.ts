export type TDocAnalysisType = 'top_words' | 'sentence_percentage';

export interface IDocAnalysisInput {
  text_body: string;
  keyword_macros: string[];
  analysis_type: TDocAnalysisType;
}
