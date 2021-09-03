/* eslint-disable no-shadow */
import axios from "axios";
import { useState, useEffect } from "react";

const useRequest = (method, url, options) => {
  const [status, setStatus] = useState({
    loading: false,
    data: false,
    error: false,
  });

  const fetchNow = (method, url, options) => {
    axios[method](url, options)
      .then((res) => res.json())
      .then((res) => setStatus);
  };

  useEffect(() => {}, []);

  return {};
};

export default useRequest;
