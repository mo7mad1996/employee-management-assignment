import axios from "axios";

const api = axios.create({
  // console.log(process);
  baseURL: process.env.VUE_APP_API_URL,
});

export default api;
