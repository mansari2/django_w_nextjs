import { IDocAnalysisInput } from '@/services/doc-analysis/IDocAnalysisInput';
import {
  LEGAL_DOC_1,
  USER_MESSAGE_1,
} from '@/webpages/test-cases-page/constants/data-constants';
import { NextResponse } from 'next/server';

type TTextBodyPayload = Pick<IDocAnalysisInput, 'text_body'>;

export const GET = async (): Promise<NextResponse> => {
  const textBodyData: TTextBodyPayload[] = [LEGAL_DOC_1, USER_MESSAGE_1].map(
    (textBody) => ({
      text_body: textBody,
    })
  );
  return NextResponse.json(textBodyData);
};
