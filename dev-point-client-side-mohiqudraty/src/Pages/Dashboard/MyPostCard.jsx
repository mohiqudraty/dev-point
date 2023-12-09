/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect,  useState } from "react";
import { BiComment, BiDownvote,  BiUpvote } from "react-icons/bi";
import { Link,  } from "react-router-dom";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";



const MyPostCard = ({post}) => {
  const axiosPublic = useAxiosPublic();
  const [upVote, setUpVote] = useState(post.upVote);
  const [downVote, setDownVote] = useState(post.downVote);
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const [comments, setComments] = useState([])
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
      console.log(res.data);
      setComments(res.data)
    })
  } ,[axiosPublic,_id])



  return (
    <section className="my-5">
         <Link to={`post/${_id}`}>
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
         
          >
            <BiUpvote
            
              className="cursor-pointer inline"
            />
            {upVote}
          </button>
          <button
          >
            <BiDownvote
           
            />
            {downVote}
          </button>

         
            {" "}
            <BiComment className="cursor-pointer inline" />{comments?.length}
        </div>
      </div>
    </div>
          </Link>
  </section>
  );
};

export default MyPostCard;
