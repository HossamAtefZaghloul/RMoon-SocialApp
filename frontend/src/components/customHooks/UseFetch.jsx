import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url || !token) return;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url, token]);

  return { data, error };
};

export default useFetch;
