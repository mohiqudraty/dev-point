import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";
import AllCommentTable from "./AllCommentTable";



const AllComment = () => {
    const axiosPublic = useAxiosPublic()
    const {id} = useParams()
    console.log(id);
    const [comments, setComments] = useState([])

    useEffect(() => {
        axiosPublic.get(`comments?postId=${id}`)
        .then(res => {
        //   console.log(res.data);
          setComments(res.data)
        })
      } ,[axiosPublic,id])
   


    return (
        <div>
        <div className="overflow-x-auto">
          <h2 className="text-center text-slate-900 font-semibold text-xl mt-10">My All Comment</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
          <th>Email</th>
      <th>Comment</th>
      <th>Feedback</th>
      <th>Report</th>
          </tr>
        </thead>
        <tbody>
       {comments?.length ? comments?.map(comm => <AllCommentTable key={comm._id} comm={comm}></AllCommentTable>) : <p>No Comment</p>}
        </tbody>
      </table>
    </div>
      </div>
    );
};

export default AllComment;