import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios/useAxiosSecure";

const usePost = () => {
  const axiosSecure = useAxiosSecure()
  // all post api
  const { data: posts = [] } = useQuery({
    queryKey: ["all-post"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-post");
      return res.data;
    },
  });

  return { posts };
};

export default usePost;
