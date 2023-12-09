import useMyPost from "../../Api/useMyPost";
import MyAllPostCard from "./MyAllPostCard";

const MyPosts = () => {
  const {myPost} = useMyPost()
  return <div>
    <div className="overflow-x-auto">
      <h2 className="text-center text-slate-900 font-semibold text-xl mt-10">My All Post</h2>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Post Title</th>
        <th>Number of votes</th>
        <th>Comment Button</th>
        <th>Delete Button</th>
      </tr>
    </thead>
    <tbody>
    {
      myPost.map(post => <MyAllPostCard key={post._id} post={post}></MyAllPostCard>)
    }
    </tbody>
  </table>
</div>
  </div>;
};

export default MyPosts;
