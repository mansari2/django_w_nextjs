import { TDocAnalysisType } from './IDocAnalysisInput';

interface IBaseDocAnalysisOutput {
  keyword_macro: string;
  analysis_type: TDocAnalysisType;
}

interface IDocAnalysisOutputTopWords extends IBaseDocAnalysisOutput {
  analysis_type: 'top_words';
  value: string[];
}

interface IDocAnalysisOutputSentencePercentage extends IBaseDocAnalysisOutput {
  analysis_type: 'sentence_percentage';
  value: number;
}

export type TDocAnalysisOutput =
  | IDocAnalysisOutputTopWords
  | IDocAnalysisOutputSentencePercentage;
