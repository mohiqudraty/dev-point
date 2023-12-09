import { Facebook, GitHub, Instagram } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-10 border-slate-400 border-t-2">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-4 lg:py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-2 md:mb-0">
            <Link to={"/"} className="flex items-center">
              <img
                src="https://i.ibb.co/f0kJTdd/devpoint-logo.png"
                className="h-8 me-3"
                alt="FlowBite Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a
                    href="https://stackoverflow.com/"
                    className="hover:underline"
                  >
                    Stack Overflow
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.mozilla.org/en-US/"
                    className="hover:underline"
                  >
                    MDN
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </li>
                <li className="mb-2">
                  <a href="https://github.com/" className="hover:underline ">
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Dev Point
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center gap-6 sm:mt-0">
            <Link
              to={"https://www.facebook.com/"}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Facebook></Facebook>
            </Link>
            <Link
              to={"https://www.instagram.com/"}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Instagram></Instagram>
            </Link>
            <Link
              to={"https://github.com/"}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <GitHub></GitHub>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
