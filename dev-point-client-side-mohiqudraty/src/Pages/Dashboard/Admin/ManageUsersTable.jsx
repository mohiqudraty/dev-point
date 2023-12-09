
import useAxiosPublic from "../../../Hooks/useAxios/useAxiosPublic";
import useUsers from "../../../Api/useUsers";
import Swal from "sweetalert2";


const ManageUsersTable = ({user}) => {
    const axiosPublic = useAxiosPublic()
    const { refetch} = useUsers()
    // console.log(Object.keys(user).join(','));
    const {_id,name,email,role} = user || {}

const handleAdmin = () => {
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
        confirmButtonText: "Yes, Make Admin",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            axiosPublic.put(`make-admin?id=${_id}`, {newRole: 'admin'})
    .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0){
    
            swalWithBootstrapButtons.fire({
                title: "Admin!",
                text: "Make Admin Success!",
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
            text: "Your User Role Not Update :)",
            icon: "error"
          });
        }
      });
    
}

    return (
       <>
         {/* row 1 */}
      <tr>
        <th>{name}</th>
        <td>{email}</td>
        <td>{role === 'admin'? <button>Admin</button> : <button onClick={handleAdmin}>Make Admin</button>}</td>
        <td>{role}</td>
      </tr>
       </>
    );
};

export default ManageUsersTable;