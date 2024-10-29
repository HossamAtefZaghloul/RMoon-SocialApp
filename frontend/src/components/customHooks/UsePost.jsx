import { useState, useEffect } from "react";
import axios from "axios";

const UsePost = (url, body = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url || !body) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.post(url, body);
        setData(res.data);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(body)]);

  return { data, loading, error };
};

export default UsePost;
