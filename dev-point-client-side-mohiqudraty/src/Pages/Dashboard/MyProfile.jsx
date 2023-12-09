import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";
import useAuth from "../../Hooks/useAuth/useAuth";
import useMyPost from "../../Api/useMyPost";
import MyPostCard from "./MyPostCard";

const MyProfile = () => {
  const {user} = useAuth()
  const axiosPublic = useAxiosPublic()
  const [myInfo, setMyInfo] = useState({})
const {myPost} = useMyPost()
// console.log(myPost);
 

  // profile info ------
useEffect(() => {
  axiosPublic.get(`users?email=${user?.email}`)
  .then(res => {
    // console.log(res.data);
    setMyInfo(res.data)
  })
},[axiosPublic, user?.email])

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
              {myInfo.role === 'member' && <img
                className="w-10"
                src="https://i.ibb.co/LNyvr2t/silver-medal-7645294.png"
                alt=""
              /> }
               {myInfo.role === 'paid' && <><img
                className="w-10"
                src="https://i.ibb.co/LNyvr2t/silver-medal-7645294.png"
                alt=""
              />
               <img
                className="w-10"
                src="https://i.ibb.co/X73G3hk/badge-3357968.png"
                alt=""
              />
              </> }
               {myInfo.role === 'admin' && <><img
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
              </>  }
             
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-2xl text-center mt-8">Recent Post</h3>
      {
        myPost.slice(0,3).map(post => <MyPostCard key={post._id} post={post}></MyPostCard>)
      }
    </div>
  );
};

export default MyProfile;
