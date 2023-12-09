/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxios/useAxiosSecure";
import useReport from "../../../Api/useReport";
import toast from "react-hot-toast";



const ReportTable = ({repo}) => {
    const axiosSecure = useAxiosSecure()
    const {refetch} = useReport()
    
    
    // console.log(Object.keys(repo).join(','));
    const {_id,reportId,report,comment,email} = repo || {}

    const handleReport = () => {
        axiosSecure.delete(`users?email=${email}`)
        .then(res => {
            console.log(res.data);
            if(res.data.deletedCount > 0){
                toast.success("user Deleted")
                refetch()
            }
        })
        axiosSecure.delete(`/report?id=${_id}`)
        .then(res => {
            console.log(res.data);
            // if(res.data.deletedCount > 0){
            //     toast.success("user Deleted")
            // }
        })



    }




    return (
        <>
        {/* row 1 */}
        <tr>
        <th>{comment}</th>
        <td>{report}</td>
        <td><button onClick={handleReport} className="hover:bg-yellow-600 p-1 rounded-sm">Delete User</button></td>
      </tr></>
    );
};

export default ReportTable;