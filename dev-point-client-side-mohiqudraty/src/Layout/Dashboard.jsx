import { useEffect, useState } from "react";
import { BiHome, BiPen, BiUserCircle } from "react-icons/bi";
import { FaUser, FaUsers,  } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxios/useAxiosPublic";
import useAuth from "../Hooks/useAuth/useAuth";
import { Announcement, Report } from "@mui/icons-material";

const Dashboard = () => {
  const {user} = useAuth()
  const axiosPublic = useAxiosPublic()
  const [myInfo, setMyInfo] = useState({})





  // profile info ------
  useEffect(() => {
    axiosPublic.get(`/users?email=${user?.email}`)
    .then(res => {
      // console.log(res.data);
      setMyInfo(res.data)
    })
  },[axiosPublic, user?.email])


  // B. Manage Users
  // C. Reported Comments/Activities
  // D. Make Announcement

  const navMenu = (
    <>
      {
        myInfo.role === 'admin' ? <>
         <li>
        <NavLink
          to={"/dashboard/admin-profile"}
          className={({ isActive, isPending }) =>
            isActive ? "underline" : isPending ? "pending" : ""
          }
        >
          <span className="flex items-center gap-2">
            <FaUser></FaUser> Admin Profile
          </span>
        </NavLink>
      </li>
         <li>
        <NavLink
          to={"/dashboard/manage-users"}
          className={({ isActive, isPending }) =>
            isActive ? "underline" : isPending ? "pending" : ""
          }
        >
          <span className="flex items-center gap-2">
            <FaUsers></FaUsers> Manage Users
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/make-announcement"}
          className={({ isActive, isPending }) =>
            isActive ? "underline" : isPending ? "pending" : ""
          }
        >
          <span className="flex items-center gap-2">
            <Announcement></Announcement>Announcement
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/reported-comments"}
          className={({ isActive, isPending }) =>
            isActive ? "underline" : isPending ? "pending" : ""
          }
        >
          <span className="flex items-center gap-2">
            <Report></Report>Reported Comments
          </span>
        </NavLink>
      </li>
        </> :
         <li>
         <NavLink
           to={"/dashboard/my-profile"}
           className={({ isActive, isPending }) =>
             isActive ? "underline" : isPending ? "pending" : ""
           }
         >
           <span className="flex  items-center gap-2">
             {" "}
             <BiUserCircle></BiUserCircle> My Profile
           </span>
         </NavLink>
       </li>
      }
     
      <li>
        <NavLink
          to={"/dashboard/add-post"}
          className={({ isActive, isPending }) =>
            isActive ? "underline" : isPending ? "pending" : ""
          }
        >
          <span className="flex  items-center gap-2">
            {" "}
            <MdAdd></MdAdd> Add Post
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/my-posts"}
          className={({ isActive, isPending }) =>
            isActive ? "underline" : isPending ? "pending" : ""
          }
        >
          <span className="flex items-center gap-2">
            <BiPen></BiPen> My Posts
          </span>
        </NavLink>
      </li>
     
    
    </>
  );
  return (
    <div data-aos="fade-down"
    data-aos-easing="linear"
    data-aos-duration="1500" className="flex">
      {/* sidebar  */}
      <div className="w-[20%] min-h-screen bg-slate-900">
        <h2 className="text-3xl font-black p-5 m-2 text-white border-2">
          Dashboard
        </h2>
        <ul className="p-10 space-y-5 text-white font-bold">{navMenu}</ul>
        <div className="divider w-[90%] mx-auto h-1 bg-white"></div>
        <ul className="p-10 space-y-5 text-white font-bold">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isActive ? "underline" : isPending ? "pending" : ""
              }
            >
              <span className="flex items-center gap-2">
                {" "}
                <BiHome></BiHome> Home
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content  */}
      <div className="flex-1 bg-gray-300">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
