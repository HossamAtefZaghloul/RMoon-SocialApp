import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, header) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url || !header) return;
    
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${header}` },
          cancelToken: source.token,
        });
        setData(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          setError(err.response?.data?.message || "An error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => source.cancel("Operation canceled by the user."); 
  }, [url, header]);

  return { data, error, isLoading };
};

export default useFetch;
