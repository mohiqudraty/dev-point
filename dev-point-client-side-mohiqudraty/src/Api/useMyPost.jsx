
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth/useAuth";
import useAxiosPublic from "../Hooks/useAxios/useAxiosPublic";

const useMyPost = () => {
    
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: myPost = [], refetch } = useQuery({
      queryKey: ["all-post"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/my-posts?email=${user?.email}`);
        return res.data;
      },
    });

     
      return {myPost, refetch}
};

export default useMyPost;