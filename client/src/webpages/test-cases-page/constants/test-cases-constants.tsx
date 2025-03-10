import { IDocAnalysisInput } from '@/services/doc-analysis/IDocAnalysisInput';
import { TDocAnalysisOutput } from '@/services/doc-analysis/IDocAnalysisOutput';
import { IHealthCheckSummary } from '@/services/infra/IHealthCheckSummary';
import * as _ from 'lodash';
import {
  DOC_ANALYSIS_URL,
  HEALTH_CHECK_URL,
} from '../../shared/utils/env-variables';
import { LEGAL_DOC_1 } from './data-constants';

type TValidationHandler = (responseData: unknown) => TValidationResult;
type TValidationResult = [boolean, string[]];

export interface ITestCaseConfig {
  name: string;
  description: string;
  requestUrl: string;
  requestBody: unknown | null;
  validateResponse: TValidationHandler;
}

const ANALYSIS_INPUT_TOP_WORDS: IDocAnalysisInput = {
  text_body: LEGAL_DOC_1,
  keyword_macros: ['confidential'],
  analysis_type: 'top_words',
};

export const TEST_CASES: ITestCaseConfig[] = [
  {
    name: 'Health check',
    description: 'Verify base health-check connection is established',
    requestUrl: HEALTH_CHECK_URL,
    requestBody: null,
    validateResponse: (responseData: unknown) => {
      if (responseData == null) {
        return [false, ['Response data is null']];
      }

      if (typeof responseData !== 'object') {
        return [false, ['Response data is not an object']];
      }

      const expectedHealthSummary: IHealthCheckSummary = {
        message: 'pong',
      };
      const hasValidHealthSummaryResponse = _.isEqual(
        responseData,
        expectedHealthSummary
      );

      if (!hasValidHealthSummaryResponse) {
        return [
          false,
          [
            `
              Response data does not contain expected summary.
              Expected: ${JSON.stringify(expectedHealthSummary)}
              Received: ${JSON.stringify(responseData)}
            `,
          ],
        ];
      }

      return [true, []];
    },
  },
  {
    name: 'Macro test (top_words)',
    description: 'Validate behavior for simple macro with `top_words` analysis',
    requestUrl: DOC_ANALYSIS_URL,
    requestBody: ANALYSIS_INPUT_TOP_WORDS,
    validateResponse: (responseData: unknown) => {
      const expectedOutput: TDocAnalysisOutput[] = [
        {
          keyword_macro: 'confidential',
          analysis_type: 'top_words',
          value: ['information', 'party', 'agreement'],
        },
      ];
      const hasValidResponse = _.isEqual(responseData, expectedOutput);

      if (!hasValidResponse) {
        return [
          false,
          [
            `
              Response data does not match expected type.
              Expected: ${JSON.stringify(expectedOutput)}
              Received: ${JSON.stringify(responseData)}
            `,
          ],
        ];
      }

      return [true, []];
    },
  },
];
