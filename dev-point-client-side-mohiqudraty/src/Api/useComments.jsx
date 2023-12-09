import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios/useAxiosSecure";

const useComments = () => {
  const axiosSecure = useAxiosSecure()
  // all post api
  const { data: comments = []} = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/comments");
      return res.data;
    },
  });

  return { comments };
};

export default useComments;
