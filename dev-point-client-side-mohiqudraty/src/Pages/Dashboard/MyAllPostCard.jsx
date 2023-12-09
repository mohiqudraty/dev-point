/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";
import useMyPost from "../../Api/useMyPost";
import Swal from "sweetalert2";



const MyAllPostCard = ({post}) => {
  const {refetch} = useMyPost()
  const axiosPublic = useAxiosPublic()
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
      const handleDelete = () => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            axiosPublic.delete(`my-post?id=${_id}`)
            .then(res => {
              console.log(res.data);
              if(res.data.deletedCount > 0){
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your Post has been deleted.",
                  icon: "success"
                });
                refetch()
              }
            })
          
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your Post is safe :)",
              icon: "error"
            });
          }
        });
        



       
      }
    return (
      <>
        {/* row 1 */}
        <tr>
        <th>{postTitle}</th>
        <td>{upVote + downVote }</td>
        <td><Link to={`/dashboard/comments/${_id}`} className="hover:bg-slate-500 p-1 rounded-sm">Comment</Link></td>
        <td><button onClick={handleDelete} className="hover:bg-yellow-600 p-1 rounded-sm">Delete</button></td>
      </tr></>
    );
};

export default MyAllPostCard;