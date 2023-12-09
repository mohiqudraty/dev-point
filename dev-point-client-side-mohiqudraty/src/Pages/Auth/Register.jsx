import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth/useAuth";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Register = () => {
  const axiosPublic = useAxiosPublic()
  const { createUser, updateUserProfile, googleSignIn, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        const user = {
          name: res.user?.displayName,
          email: res.user?.email,
          role: 'member',
        };
  
        axiosPublic.post('users', user)
          .then((response) => {
            console.log(response.data);
            if (response.data.insertedId) {
              Swal.fire({
                title: "Registration Successful",
                text: "You Got Silver Badge!",
                imageUrl: "https://i.ibb.co/LNyvr2t/silver-medal-7645294.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Badge"
              });
              navigate("/");
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Failed to register: ${error.message}`);
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error(`Failed to sign in with Google: ${err.message}`);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
  
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(data.name, data.photo).then(() => {
          console.log("user created");
          const user = {
            name: data.name,
            email: data.email,
            role: 'member',
          };
  
          axiosPublic.post('users', user)
            .then(res => {
              console.log(res.data);
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Registration Successful",
                  text: "You Got Silver Badge!",
                  imageUrl: "https://i.ibb.co/LNyvr2t/silver-medal-7645294.png",
                  imageWidth: 200,
                  imageHeight: 200,
                  imageAlt: "Badge"
                });
                navigate("/");
              }
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              setLoading(false); // Reset loading state whether success or failure
            });
        });
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false); // Reset loading state in case of an error
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center mt-6 px-6 py-2 md:py-8 mx-auto md:h-screen">
        <Link
          to={"/"}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="h-14"
            src="https://i.ibb.co/f0kJTdd/devpoint-logo.png"
            alt="logo"
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              {/* name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name <span className="text-red-700">*</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write Your Full Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-sm text-red-600">Name is Required!</p>
                )}
              </div>
              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email <span className="text-red-700">*</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Write Your Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.email?.type === "required" && (
                  <p className="text-sm text-red-600">Email is Required!</p>
                )}
              </div>
              {/* password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password <span className="text-red-700">*</span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password?.type === "required" && (
                  <p className="text-sm text-red-600">Password is Required!</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-sm text-red-600">
                    Password must be 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-sm text-red-600">
                    Password must have at least one uppercase <b>[A-Z]</b>{" "}
                    letter, one lowercase <b>[a-z]</b> letter, one number{" "}
                    <b>[0-9]</b> and one special[!@#$] character.
                  </p>
                )}
              </div>
              {/* photo */}
              <div>
                <label
                  htmlFor="photo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Photo
                </label>
                <input
                  {...register("photo", { required: true })}
                  type="text"
                  name="photo"
                  id="photo"
                  placeholder="Put Your Photo URL"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.photo?.type === "required" && (
                  <p className="text-sm text-red-600">Photo is Required!</p>
                )}
              </div>

              {/* terms  */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register("terms", { required: true })}
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  {errors.terms?.type === "required" && (
                    <p className="text-sm text-red-600">Terms is Required!</p>
                  )}
                </div>
              </div>
              <input
                type="submit"
                className="w-full cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                value={"Create an account"}
              />

              <button
                onClick={handleGoogle}
                type="button"
                className="w-full btn-outline btn cursor-pointer text-gray-900 hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                <FaGoogle /> Register With Google
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
