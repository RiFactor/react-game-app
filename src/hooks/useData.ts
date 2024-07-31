import { useState, useEffect } from "react";
import apiClient, { AxiosError, CanceledError } from "../services/api-client";

interface IFetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    apiClient
      .get<IFetchResponse<T>>(endpoint, { signal: controller.signal })
      .then(({ data: { results } }) => {
        setData(results);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        console.error("Error fetching data", err);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, isLoading, error };
};

export default useData;
