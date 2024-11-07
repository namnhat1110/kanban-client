import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useAxios = <T>(
  url: string,
  params?: AxiosRequestConfig
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await axios.get(url, params);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  return {
    data,
    loading,
    error,
    setData,
    setRefresh,
  };
};
