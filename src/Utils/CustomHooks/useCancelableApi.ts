import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, Canceler } from 'axios';
import { baseURL } from '../baseUrls';

interface UseCancelableApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  setRequest: (url: string, params?: Record<string, any>) => void;
}

const useCancelableApi = <T = any>(initialUrl = '', initialParams = {}): UseCancelableApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [url, setUrl] = useState(initialUrl);
  const [params, setParams] = useState<Record<string, any>>(initialParams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback((url: string, params: Record<string, any>): Canceler => {
    const source: CancelTokenSource = axios.CancelToken.source();
    setLoading(true);

    baseURL.get<T>(url, {
      cancelToken: source.token,
      params,
    })
      .then((response: AxiosResponse<T>) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          setError(err as Error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return source.cancel;
  }, []);

  useEffect(() => {
    if (url) {
      const cancel = fetchData(url, params);

      // Cleanup function to cancel the request if the component unmounts or params change
      return () => {
        cancel();
      };
    }
  }, [url, params, fetchData]);

  const setRequest = (newUrl: string, newParams: Record<string, any> = {}) => {
    setUrl(newUrl);
    setParams(newParams);
  };

  return { data, loading, error, setRequest };
};

export default useCancelableApi;
