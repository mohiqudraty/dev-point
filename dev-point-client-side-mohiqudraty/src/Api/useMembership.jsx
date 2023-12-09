import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxios/useAxiosPublic";

const useMembership = () => {
  const axiosPublic = useAxiosPublic();
  // all post api
  const { data: plan = [] } = useQuery({
    queryKey: ["membership"],
    queryFn: async () => {
      const res = await axiosPublic.get("/membership");
      return res.data;
    },
  });

  return { plan };
};

export default useMembership;
