import { Link, NavLink } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import { Badge } from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import useAnnouncement from "../../../Api/useAnnouncement";

const NavBar = () => {
  const { user, logoutUser } = useAuth();
  const { announcement } = useAnnouncement();
  const [isOpen, setOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  // sign out handle -----
  const handleSignOut = () => {
    logoutUser();
  };

  // mene link --
  const navMenu = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isActive ? "underline" : isPending ? "pending" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/membership"}
          className={({ isActive, isPending }) =>
            isActive ? "underline" : isPending ? "pending" : ""
          }
        >
          Membership
        </NavLink>
      </li>
      <li>
        <Link>
          <Badge badgeContent={announcement?.length} color="primary">
            <NotificationsNoneOutlined
              color="action"
              className="bg-white rounded-sm"
            />
          </Badge>
        </Link>
      </li>
      {!user ? (
        <li>
          <Link to={"/register"}>Join Us</Link>
        </li>
      ) : (
        <li>
          <Link onClick={handleSignOut}>Sign Out</Link>
        </li>
      )}
    </>
  );
  return (
    <nav className="py-2 md:py-5 px-3 flex relative bg-slate-900 text-white font-bold justify-between items-center">
      {/* hum burger icon */}
      <span className="md:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </span>
      {/* mobile menu  */}
      <div
        className={
          !isOpen
            ? "absolute -top-[10000px] "
            : "absolute z-40 left-0 right-0 text-center duration-300 ease-in top-20"
        }
      >
        <ul className=" bg-slate-900 p-10 space-y-4">{navMenu}</ul>
      </div>

      {/* logo */}
      <div className="mx-auto md:mx-0">
        <Link to={"/"}>
          <img
            className="h-12"
            src="https://i.ibb.co/f0kJTdd/devpoint-logo.png"
            alt="dev point logo"
          />
        </Link>
      </div>
      <div>
        {/* menu */}
        <div>
          <ul className="hidden md:flex space-x-8 justify-center items-center ">
            {navMenu}
          </ul>
        </div>
      </div>
      {/* profile */}
      <div
        onClick={() => {
          setIsOpenProfile(!isOpenProfile);
        }}
        className="flex justify-center items-center cursor-pointer"
      >
        {user && (
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img className="w-full" src={user?.photoURL} />
            </div>
          </div>
        )}
      </div>
      <div
        className={
          isOpenProfile
            ? "absolute z-50 bg-slate-900 p-10 top-20 right-0 left-0 text-center space-y-5 duration-1000 transition "
            : "hidden"
        }
      >
        <p className="text-slate-300 my-5">{user?.displayName}</p>
        <Link to={"/dashboard/my-profile"} className="font-bold">
          Dashboard
        </Link>
        <button onClick={handleSignOut} className="btn block mx-auto font-semibold">Sign Out</button>
      </div>
    </nav>
  );
};

export default NavBar;
