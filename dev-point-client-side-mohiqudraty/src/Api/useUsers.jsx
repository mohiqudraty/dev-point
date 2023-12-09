import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios/useAxiosSecure";

const useUsers = () => {
 
  const axiosSecure = useAxiosSecure()
  // all post api
  const { data: users = [], refetch} = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  return { users, refetch };
};

export default useUsers;