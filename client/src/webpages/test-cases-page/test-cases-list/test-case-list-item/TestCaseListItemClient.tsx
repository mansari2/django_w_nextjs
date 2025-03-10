import { useGetMutationRequestHandler } from '@/webpages/shared/hooks/useGetMutationHandler';
import { ExperimentOutlined } from '@ant-design/icons';
import { Button, Col, List, Result, Row } from 'antd';
import { useState } from 'react';
import { ITestCaseConfig } from '../../constants/test-cases-constants';
import styles from './TestCaseListItemClient.module.css';

interface IValidationState {
  isLoading: boolean;
  isValid: boolean | null;
  errorMessages: string[];
}

interface ITestCaseListItemClientProps {
  testCaseConfig: ITestCaseConfig;
}

export default function TestCaseListItemClient(
  props: ITestCaseListItemClientProps
) {
  const { testCaseConfig } = props;

  const [validationState, setValidationState] = useState<IValidationState>({
    isLoading: false,
    isValid: null,
    errorMessages: [],
  });
  const [validationRequestInitiator] = useGetMutationRequestHandler(
    testCaseConfig.requestUrl,
    'POST',
    () => {
      setValidationState({
        isLoading: true,
        isValid: null,
        errorMessages: [],
      });
    },
    () => {
      setValidationState((prevState) => ({ ...prevState, isLoading: false }));
    }
  );

  const intiateValidationRequest = () => {
    validationRequestInitiator(
      testCaseConfig.requestBody,
      (payload) => {
        const [isValid, errorMessages] =
          testCaseConfig.validateResponse(payload);
        setValidationState((prevState) => ({
          ...prevState,
          isValid,
          errorMessages,
        }));
      },
      (error) => {
        setValidationState((prevState) => ({
          ...prevState,
          isValid: false,
          errorMessages: [error],
        }));
      }
    );
  };

  return (
    <>
      <List.Item
        key={testCaseConfig.name}
        actions={[
          <Button
            type='primary'
            loading={validationState.isLoading}
            icon={<ExperimentOutlined />}
            key='run_test'
            onClick={intiateValidationRequest}
          />,
        ]}
      >
        <List.Item.Meta
          title={testCaseConfig.name}
          description={
            <TestCaseListItemDescription
              description={testCaseConfig.description}
              validationState={validationState}
            />
          }
        />
      </List.Item>
    </>
  );
}

interface ITestCaseListItemDescriptionProps {
  description: string;
  validationState: IValidationState;
}

function TestCaseListItemDescription(props: ITestCaseListItemDescriptionProps) {
  const { description, validationState } = props;
  return (
    <div>
      <div>
        <p>{description}</p>
      </div>
      <Row>
        <Col span={12}>
          <div>
            {validationState.isValid && (
              <Result status='success' title='Success! Great job &#128640;' />
            )}
          </div>
          <div className={styles['error-container']}>
            {validationState.errorMessages.length > 0 && (
              <Result status='error' title='Validation failed' />
            )}
            <div className={styles['error-reasons-container']}>
              {validationState.errorMessages.map((errorMessage, index) => (
                <p key={index}>{errorMessage}</p>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
