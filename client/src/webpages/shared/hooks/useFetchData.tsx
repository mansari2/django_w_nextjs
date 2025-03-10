'use client';

import { notification } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

interface IFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/** Fetch arbitrary endpoint data automatically, on command, or both */
export default function useFetchData<T>(
  endpointURL: string,
  requestConfig: {
    shouldAutoInitRequest?: boolean;
    httpMethod?: RequestInit['method'];
    requestBody: RequestInit['body'];
  } = {
    shouldAutoInitRequest: true,
    httpMethod: 'GET',
    requestBody: null,
  }
): [
  // response state
  IFetchState<T>,
  // manual request initiator
  () => void,
] {
  const { shouldAutoInitRequest, httpMethod, requestBody } = requestConfig;

  const [requestState, setRequestState] = useState<IFetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });
  const didInitRequest = useRef<boolean>(false);

  const makeRequest = useCallback(() => {
    setRequestState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });
    fetch(endpointURL, { method: httpMethod, body: requestBody })
      .then<T>((response) => {
        return response.json();
      })
      .then<void>((data) => {
        setRequestState((prevState) => {
          return {
            ...prevState,
            data,
            isLoading: false,
          };
        });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Error fetching data',
          description: err instanceof Error ? err.message : String(err),
          placement: 'bottomRight',
        });
        setRequestState({
          data: null,
          isLoading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });
  }, [endpointURL, httpMethod, requestBody]);

  useEffect(() => {
    if (!shouldAutoInitRequest || didInitRequest.current) {
      return;
    }
    didInitRequest.current = true;
    makeRequest();
  }, [makeRequest, shouldAutoInitRequest]);

  return [requestState, makeRequest];
}
