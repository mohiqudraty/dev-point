import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar/NavBar";
import useAuth from "../Hooks/useAuth/useAuth";
import Loader from "../Components/Shared/Spinner/Loader";
import Footer from "../Components/Shared/Footer/Footer";

const Root = () => {
  const { loading } = useAuth();
  if(loading){
    return <Loader></Loader>
  }
  return (
    <div>
          <NavBar></NavBar>
          <div className="min-h-[calc(100vh-350px)]">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
      
    </div>
  );
};

export default Root;
