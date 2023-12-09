import { Button } from "@mui/material";
import usePost from "../../Api/usePost";
import Banner from "./Banner/Banner";
import Post from "./Post/Post";

import useAxiosPublic from "../../Hooks/useAxios/useAxiosPublic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAnnouncement from "../../Api/useAnnouncement";
import Announcement from "./Announcement";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [searchedPost, setSearchedPost] = useState([]);
  const [sortedPost, setSortedPost] = useState([]);
  const { posts } = usePost();
  const {announcement} = useAnnouncement()

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [allPosts, setAllPosts] = useState([]);

  // pagination --
  useEffect(() => {
    axiosPublic.get(`all-post`).then((res) => {
      setAllPosts(res.data);
      setTotalPages(Math.ceil(res.data.length / postsPerPage));
    });
  }, [axiosPublic, postsPerPage]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // search with tag  -------------
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const tag = form.tag.value;
    axiosPublic.get(`/all-post?tag=${tag}`).then((res) => {
      setSearchedPost(res.data);
      setSortedPost([]);
    });
  };

  // sorted post by popularity -----------
  const handleSortedPost = () => {
    axiosPublic.get("/sorted-posts").then((res) => {
      setSortedPost(res.data);
      setSearchedPost([]);
      toast.success("Post Sorted By Popularity!");
    });
  };

  return (
    <div>
      {/*  Banner and Search Input */}
      <Banner  handleSearch={handleSearch} />

      {/* Sort Button */}
      <div className="text-center">
        <button onClick={handleSortedPost} className="btn btn-outline mt-6">
          Sort by Popularity
        </button>
      </div>

      {/* Display Posts */}
      <div>
        {sortedPost.length || searchedPost.length
          ? sortedPost.length
            ? sortedPost.map((post) => <Post key={post._id} post={post} />)
            : searchedPost.map((post) => <Post key={post._id} post={post} />)
          : currentPosts.map((post) => <Post key={post._id} post={post} />)}
      </div>
 {/* Pagination buttons */}
 <div className="flex justify-center mt-4 space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-md ${
              currentPage === number ? 'bg-slate-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-slate-600 hover:text-white`}
          >
            {number}
          </button>
        ))}
      </div>


      {/* Display Unique Tags */}
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="my-6 font-bold">All Tags</h3>
        {posts.map((post) => post?.tag).map((tag, index) => (
          <Button key={index}>#{tag}</Button>
        ))}
      </div>

      {/* Announcement Section */}
      {
        announcement.length && <div className="max-w-3xl mx-auto text-center mt-8">
        <h3 className="text-3xl font-semibold">All Announcement</h3>
       
{
  announcement?.map(ann => <Announcement key={ann._id} ann={ann}></Announcement> )
}
       
      </div>
      }
    </div>
  );
};

export default Home;
