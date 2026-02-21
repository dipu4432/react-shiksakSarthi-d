import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials:true
});

export const fetchData = async (endpoint) => {
  console.log("endpoint: ",endpoint )
  const res = await API.get(endpoint);

  // Normalize response here
  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data?.data)) {
    return res.data.data;
  }

  return [];
};
