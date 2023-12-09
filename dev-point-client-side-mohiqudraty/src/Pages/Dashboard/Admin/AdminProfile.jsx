import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosPublic from "../../../Hooks/useAxios/useAxiosPublic";
import useUsers from "../../../Api/useUsers";
import usePost from "../../../Api/usePost";
import useComments from "../../../Api/useComments";
import PieChart from "./PieChart";


const AdminProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [myInfo, setMyInfo] = useState({});
 const {users} = useUsers()
 const {posts} = usePost()
 const {comments} = useComments()
  // console.log(myPost);

  // profile info ------
  useEffect(() => {
    axiosPublic.get(`users?email=${user?.email}`).then((res) => {
      // console.log(res.data);
      setMyInfo(res.data);
    });
  }, [axiosPublic, user?.email]);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mt-4">My Profile</h2>
      <div className="flex justify-center mt-10">
        <div className="card  bg-base-100 shadow-xl">
          <figure className="pt-3">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{myInfo.name}</h2>
            <p>{myInfo.email}</p>
            <div className="flex gap-2">
              {" "}
              {myInfo.role === "member" && (
                <img
                  className="w-10"
                  src="https://i.ibb.co/LNyvr2t/silver-medal-7645294.png"
                  alt=""
                />
              )}
              {myInfo.role === "paid" && (
                <>
                  <img
                    className="w-10"
                    src="https://i.ibb.co/LNyvr2t/silver-medal-7645294.png"
                    alt=""
                  />
                  <img
                    className="w-10"
                    src="https://i.ibb.co/X73G3hk/badge-3357968.png"
                    alt=""
                  />
                </>
              )}
              {myInfo.role === "admin" && (
                <>
                  <img
                    className="w-10"
                    src="https://i.ibb.co/LNyvr2t/silver-medal-7645294.png"
                    alt=""
                  />
                  <img
                    className="w-10"
                    src="https://i.ibb.co/X73G3hk/badge-3357968.png"
                    alt=""
                  />
                  <img
                    className="w-10"
                    src="https://i.ibb.co/mGPTYqQ/platinum-6051451.png"
                    alt=""
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------- */}
      <div className="stats shadow w-full mt-3">  
  <div className="stat place-items-center ">
    <div className="stat-title">Total Post</div>
    <div className="stat-value">{posts?.length}</div>
    {/* <div className="stat-desc">From January 1st to February 1st</div> */}
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title">Users</div>
    <div className="stat-value ">{users?.length}</div>
    {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title">Total Comment</div>
    <div className="stat-value">{comments?.length}</div>
    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
  </div>
    </div>
    <PieChart users={users?.length} comments={comments?.length} posts={posts?.length}></PieChart>
    </div>
  );
};

export default AdminProfile;
