import axios from "axios";

const axiosApi = axios.create({
  baseURL: "localhost:8000",
});

export default axiosApi;
