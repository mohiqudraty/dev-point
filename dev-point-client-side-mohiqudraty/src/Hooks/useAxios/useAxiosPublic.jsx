import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://y-liart-pi.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
