import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetch = (endpoint, dataType) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      await axios.get(endpoint).then(({ data }) => {
        setData(data[dataType]);
        setLoading(false);
        console.log();
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }, [dataType, endpoint]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [data, loading];
};

export { useFetch };
