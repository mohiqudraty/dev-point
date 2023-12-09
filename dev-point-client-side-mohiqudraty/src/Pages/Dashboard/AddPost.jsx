import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth/useAuth";
import Select from "react-select";
import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";
import toast from "react-hot-toast";
import useMyPost from "../../Api/useMyPost";
import { useNavigate } from "react-router-dom";
const options = [
  { value: "Security", label: "Security" },
  { value: "Bootstrap", label: "Bootstrap" },
  { value: "React Native", label: "React Native" },
  { value: "Node.js", label: "Node.js" },
  { value: "CSS", label: "CSS" },
  { value: "Python", label: "Python" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "React", label: "React" },
  { value: "Database", label: "Database" },
  { value: "Frontend", label: "Frontend" },
  { value: "DevOps", label: "DevOps" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "WebSockets", label: "WebSockets" },
  { value: "UI/UX", label: "UI/UX" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "React", label: "React" },
  { value: "JavaScript", label: "JavaScript" },
];
// Security
// Bootstrap
// React Native
// Node.js
// CSS
// Python
// GraphQL
// React
// Database
// Frontend
// DevOps
// Machine Learning
// WebSockets
// UI/UX
// MongoDB
// React
// JavaScript

const AddPost = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [myInfo, setMyInfo] = useState({})
const {myPost} = useMyPost()
const navigate = useNavigate()

  const postedTime = new Date();
  // profile info ------
  useEffect(() => {
    axiosPublic.get(`users?email=${user?.email}`)
    .then(res => {
      // console.log(res.data);
      setMyInfo(res.data)
    })
  },[axiosPublic, user?.email])



  const handleAddPost = (e) => {
    if(myInfo.role === 'member' && myPost.length >= 5){
      toast('You can not more then 5 post without Membership!')
      return  navigate('/membership')
    }
    e.preventDefault();
   
    const form = e.target;
    const authorName = form.authorName.value;
    const authorEmail = form.authorEmail.value;
    const postTitle = form.postTitle.value;
    const authorImage = form.authorImage.value;
    const postDescription = form.postDescription.value;
    const tag = selectedOption.value;
    const upVote = parseInt(form.upVote.value);
    const downVote = parseInt(form.downVote.value);

    const post = {
      authorImage,
      authorName,
      authorEmail,
      postTitle,
      postDescription,
      tag,
      postedTime,
      upVote,
      downVote,
    };
    console.log(post);
    axiosPublic.post("add-post", post).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("New Post Published");
        form.reset();
      }
    });
  };

  return (
    <div className="pt-10">
      <h2 className="text-3xl font-semibold text-center my-10">Add Post</h2>
      <form onSubmit={handleAddPost} className="max-w-[90%] p-3 mx-auto">
        {/* author name and email  */}
        <div className="flex flex-col md:flex-row md:gap-8 justify-center">
          {/* name  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              defaultValue={user && user.displayName}
              readOnly
              name="authorName"
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
          {/* email  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              defaultValue={user && user.email}
              readOnly
              name="authorEmail"
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
        </div>
        {/* title author image  */}
        <div className="flex flex-col md:flex-row md:gap-8 justify-center">
          {/* title  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              name="postTitle"
              type="text"
              id="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
          {/* image  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              defaultValue={user && user.photoURL}
              readOnly
              name="authorImage"
              type="text"
              id="image"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
        </div>
        {/* description and tag  */}
        <div className="flex flex-col md:flex-row md:gap-8 justify-center">
          {/* description  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              name="postDescription"
              type="text"
              id="description"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
          {/* tag  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="tag"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tag
            </label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              required
            />
          </div>
        </div>
        {/* upVote and downVote */}
        <div className="flex flex-col md:flex-row md:gap-8 justify-center">
          {/* up vote  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="upVote"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Up Vote
            </label>
            <input
              defaultValue={0}
              name="upVote"
              type="number"
              id="upVote"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
          {/* Down Vote  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="downVote"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Down Vote
            </label>
            <input
              defaultValue={0}
              name="downVote"
              type="number"
              id="downVote"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="text-white w-full bg-slate-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-gary-700 dark:focus:ring-slate-800"
          >
            Add post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
