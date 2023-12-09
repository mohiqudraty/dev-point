import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios/useAxiosSecure";

const useReport = () => {
    const axiosSecure = useAxiosSecure()
    // all post api
    const { data: reports = [], refetch } = useQuery({
      queryKey: ["report"],
      queryFn: async () => {
        const res = await axiosSecure.get("/report");
        return res.data;
      },
    });
  
    return { reports, refetch };
  };
  
  export default useReport;