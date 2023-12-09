/* eslint-disable no-unused-vars */

import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";
import toast from "react-hot-toast";

const AllCommentTable = ({ comm }) => {
    const axiosPublic = useAxiosPublic()
    const { _id, postId, postTitle, comment, email } = comm || {};
    const [isReport, setIsReport] = useState('');
    const [report, setReport] = useState('')


    const handleFeedback = (event) => {
        event.preventDefault()
        const selectedFeedback = event.target.value;
        setIsReport(selectedFeedback !== '');
        setReport(selectedFeedback)
    };
// console.log(report);
    const handleReport = () => {
        const feedback = {
            reportId: _id,
            report: report,
            comment,
            email,
        }
        axiosPublic.post('/report', feedback)
        .then(res => {
            // console.log(res.data);
            if(res.data.insertedId){
                toast.success('Your Report Successful!')
            }
        })
    };

    return (
        <tr>
            <th>{email}</th>
            <td>
                {comment.length > 20 ? (
                    <>
                        {comment.slice(0, 20)}{" "}
                        
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Read More</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Comment</h3>
    <p className="py-4">{comment}</p>
  </div>
</dialog>
                    </>
                ) : (
                    comment
                )}
            </td>
            <td>
                <select name="report" onChange={handleFeedback} >
                    {/* Feedback options */}
                    <option selected value="report">report</option>
                    <option value="Spam or Ad">Spam or Ad</option>
                    <option value="Offensive Content">Offensive Content</option>
                    <option value="Inaccurate Info">Inaccurate Info</option>
                </select>
            </td>
            <td>
                <button disabled={!isReport} className={!isReport ? "btn-disabled" : 'btn-link'} onClick={handleReport}>
                    Report
                </button>
            </td>
        </tr>
    );
};

export default AllCommentTable;
