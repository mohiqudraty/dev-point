
import useUsers from "../../../Api/useUsers";
import ManageUsersTable from "./ManageUsersTable";

const ManageUsers = () => {
    const {users} = useUsers()
    
   


    return (
        <div className="overflow-x-auto">
            <h2 className="text-center font-semibold text-2xl mt-8">All User List</h2>
  <table className="table table-zebra">
    {/* head */}

    <thead>
      <tr>
      
        <th>User name</th>
        <th>User email</th>
        <th>Make admin</th>
        <th>Membership</th>
      </tr>
    </thead>
    <tbody>
        {
            users.map(user => <ManageUsersTable key={user._id} user={user}></ManageUsersTable>)
        }
    
    </tbody>
  </table>
</div>
    );
};

export default ManageUsers;