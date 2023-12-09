import useUsers from "../../Api/useUsers";


const AllUser = () => {
    const {users} = useUsers()
    console.log(users);
    return (
        <div>
            {
                users.map(user => <p key={user.email}>{user.name}</p>)
            }
        </div>
    );
};

export default AllUser;