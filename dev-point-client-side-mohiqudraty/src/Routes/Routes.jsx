import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Dashboard from "../Layout/Dashboard";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Membership from "../Pages/Membership/Membership";
import PrivetRoute from "./PrivetRoute";
import PostDetails from "../Pages/Home/Post/PostDetails";
import MyProfile from "../Pages/Dashboard/MyProfile";
import AddPost from "../Pages/Dashboard/AddPost";
import MyPosts from "../Pages/Dashboard/MyPosts";
import AllUser from "../Pages/Dashboard/AllUser";
import AllComment from "../Pages/Dashboard/AllComment";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";
import ReportedComments from "../Pages/Dashboard/Admin/ReportedComments";
import Payment from "../Pages/Membership/Payment";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/membership",
        element: (
          <PrivetRoute>
            <Membership></Membership>
          </PrivetRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivetRoute>
            <Payment></Payment>
          </PrivetRoute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <PrivetRoute>
            <PostDetails></PostDetails>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children:[
      {
        path:'/dashboard/my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path:'/dashboard/add-post',
        element: <AddPost></AddPost>
      },
      {
        path:'/dashboard/my-posts',
        element: <MyPosts></MyPosts>
      },
      {
        path:'/dashboard/all-user',
        element: <AllUser></AllUser>
      },
      {
        path:'/dashboard/comments/:id',
        element: <AllComment></AllComment>
      },
      {
        path:'/dashboard/admin-profile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path:'/dashboard/manage-users',
        element: <ManageUsers></ManageUsers>
      },
      {
        path:'/dashboard/make-announcement',
        element: <MakeAnnouncement></MakeAnnouncement>
      },
      {
        path:'/dashboard/reported-comments',
        element: <ReportedComments></ReportedComments>
      }
    ]
  },
]);

export default router;
