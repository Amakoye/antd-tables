import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetch = (endpoint, dataType) => {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      await axios.get(endpoint).then(({ data }) => {
        setData(data[dataType]);
        console.log();
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }, [dataType, endpoint]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [data];
};

export { useFetch };
