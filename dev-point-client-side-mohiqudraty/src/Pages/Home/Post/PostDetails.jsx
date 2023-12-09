/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BiComment, BiDownvote, BiShare, BiUpvote } from "react-icons/bi";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxios/useAxiosPublic";
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
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth/useAuth";


const PostDetails = () => {
  const {user} = useAuth()
  const axiosPublic = useAxiosPublic();
  const [post, setPost] = useState({});
  const { id } = useParams();
  // console.log(id);
  const [comments, setComments] = useState([])
// shared url --------
  const shareUrl = `http://localhost:5173/post/${id}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success(`Link copied!`);
  };
// get single post 
  useEffect(() => {
    axiosPublic.get(`single-post/${id}`).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });
  }, [axiosPublic, id]);

  const {
    _id,
    authorImage,
    authorName,
    authorEmail,
    postTitle,
    postDescription,
    tag,
    postedTime,
    upVote,
    downVote,
  } = post || {};
  const formattedDate = moment(postedTime).format("MMMM Do YYYY, h:mm:ss a");


// comment focus -------
  const commentInputRef = useRef(null);
  const handleCommentClick = () => {
    // Focus on the comment input field when the comment button is clicked
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

// post a comment -------
  const handleComment = (e) => {
    e.preventDefault()
    const form = e.target;
    const comment = form.comment.value;
    const commentData = {
      postId: _id,
      postTitle,
      comment,
      email:user?.email
    }
    axiosPublic.post(`comment`,commentData)
    .then(res => {
      console.log(res.data);
      if(res.data.insertedId){
        toast.success(`You Put a comment${comment}`)
        axiosPublic.get(`comments?postId=${_id}`)
  .then(res => {
    console.log(res.data);
    setComments(res.data)
  })
      }
    })
    console.log(commentData);
  }

  useEffect(() => {
    axiosPublic.get(`comments?postId=${_id}`)
    .then(res => {
      console.log(res.data);
      setComments(res.data)
    })
  } ,[axiosPublic,_id])


  return (
    <section>
      <div className="max-w-4xl mx-auto px-10 my-4 py-6 bg-white rounded-lg shadow-md">
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
        <div className="mt-2">
          <h3 className="text-2xl text-gray-700 font-bold cursor-pointer hover:text-gray-600">
            {postTitle}
          </h3>
          <p className="mt-2 text-gray-600">{postDescription}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center justify-center gap-5">
            <button>
              <BiUpvote className="cursor-pointer inline" />
              {upVote}
            </button>
            <button>
              <BiDownvote className="cursor-pointer inline" />
              {downVote}
            </button>
<button onClick={handleCommentClick}>
<BiComment  className="cursor-pointer inline" />{comments?.length}
</button>

            {/* The button to open modal */}
            <label htmlFor="my_modal_7" className="btn">
              <BiShare className="cursor-pointer inline" />
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="text-lg font-bold">Share With Friends</h3>
                <div className="flex gap-5 my-3">
                  {/* Facebook Share Button */}
                  <FacebookShareButton url={shareUrl} quote={postTitle}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  {/* Twitter Share Button */}
                  <TwitterShareButton url={shareUrl} title={postTitle}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>

                  {/* WhatsApp Share Button */}
                  <WhatsappShareButton url={shareUrl} title={postTitle}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>

                  {/* Email Share Button */}
                  <EmailShareButton url={shareUrl} subject={postTitle}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>

                  {/* Button to Copy Link */}
                  <button className="btn" onClick={handleCopy}>
                    Copy Link
                  </button>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_7">
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* comment area  */}
      <div>
      <form  onSubmit={handleComment} className="mb-5 max-w-4xl mx-auto ">
           <div>
           <label
              htmlFor="comment"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Comment
            </label>
            <textarea
             ref={commentInputRef}
              name="comment"
              type="text"
              id="comment"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
           </div>
           <button className="btn bg-slate-900 hover:bg-slate-800 text-white my-1 cursor-pointer">Comment</button>
          </form>
        <div className="max-w-4xl mx-auto">
        <h3 className="text-slate-900">All Comments </h3>
         {comments.length && comments.map(comment => <div key={comment._id} className=" border-2 p-4 my-5 hover:bg-slate-400">
            <h3 className="font-medium ">{comment.postTitle}</h3>
            <p>{comment.comment}</p>
          </div>)}
        </div>
          
      </div>
    </section>
  );
};

export default PostDetails;
