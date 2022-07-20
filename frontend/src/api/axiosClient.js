import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = "http://localhost:5000/api";

const accesstoken = localStorage.getItem("accesstoken");

const axiosClient = axios.create({
  baseURL: baseUrl,
});
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      Authorization: accesstoken,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    toast.success("Successful");
    return response.data;
  },
  (error) => {
    console.log(error.response.data);
    toast.error(error.response.data.message);
    return error.response.data;
  }
);
export default axiosClient;
