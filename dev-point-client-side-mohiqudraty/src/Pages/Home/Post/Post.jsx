/* eslint-disable no-unused-vars */
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { BiComment, BiDownvote,  BiUpvote } from "react-icons/bi";
import { Link, useNavigate, } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxios/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth/useAuth";
const Post = ({ post }) => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth()
  const [upVote, setUpVote] = useState(post.upVote);
  const [downVote, setDownVote] = useState(post.downVote);
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const [comments, setComments] = useState([])
  const navigate = useNavigate()
  const {
    _id,
    authorImage,
    authorName,
    authorEmail,
    postTitle,
    postDescription,
    tag,
    postedTime,
    // upVote,
    // downVote,
  } = post || {};

  const formattedDate = moment(postedTime, "YYYY-MM-DDTHH:mm:ssZ").format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  useEffect(() => {
    axiosPublic.get(`comments?postId=${_id}`)
    .then(res => {
      // console.log(res.data);
      setComments(res.data)
    })
  } ,[axiosPublic,_id])


  const handleUpVote = async () => {
    try {
      if(!user){
        return navigate('/login')
      }
      const response = await axiosPublic.put(`/posts/${_id}/upvote`);
      console.log(response.data);
      if (response.data.modifiedCount > 0) {
        setUpVote(upVote + 1);
        toast.success("You Take a Up Vote");
        setIsUpVoted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownVote = async () => {
    try {
      if(!user){
        return navigate('/login')
      }
      const response = await axiosPublic.put(`/posts/${_id}/downvote`);
      console.log(response.data);
      if (response.data.modifiedCount > 0) {
        setDownVote(downVote + 1);
        toast.success("You Take a Down Vote");
        setIsDownVoted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <section  data-aos="flip-left"  className="my-5">
      <div className="max-w-4xl mx-auto px-10 my-4 py-6 bg-slate-300 hover:border-2 border-slate-900 duration-500 ease-in rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <a className="flex items-center">
              <img
                className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                src={authorImage}
                alt="avatar"
              />
              <h1 className="text-gray-700 font-bold mr-2">{authorName}</h1>
              <span className="font-light text-gray-600">{formattedDate}</span>
            </a>
          </div>

          <a
            className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
            href="#"
          >
            {tag}
          </a>
        </div>
        <Link to={`post/${_id}`} className="mt-2">
          <h3 className="text-2xl text-gray-700 font-bold cursor-pointer hover:text-gray-600">
            {postTitle}
          </h3>
          {/* <p className="mt-2 text-gray-600">{postDescription}</p> */}
        </Link>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center justify-center gap-5">
            <button
              className={
                isUpVoted  ? "btn-disabled bg-blue-400 rounded-md p-1" : ""
              }
            >
              <BiUpvote
                onClick={handleUpVote}
                className="cursor-pointer inline"
              />
              {upVote}
            </button>
            <button
              className={
                isDownVoted  ? "btn-disabled bg-slate-600 rounded-md p-1" : ""
              }
            >
              <BiDownvote
                onClick={handleDownVote}
                className="cursor-pointer inline"
              />
              {downVote}
            </button>

            <Link to={`post/${_id}`}>
              {" "}
              <BiComment className="cursor-pointer inline" />{comments?.length}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
