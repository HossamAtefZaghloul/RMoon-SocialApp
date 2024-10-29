import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, header) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url || !header) return;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${header}`,
          },
        });
        setData(res.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url, header]);

  return { data, error };
};

export default useFetch;
