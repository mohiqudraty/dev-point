
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxios/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth/useAuth";




const MakeAnnouncement = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const postedTime = new Date();


  const handleMakeAnnouncement = (e) => {
    e.preventDefault();
   
    const form = e.target;
    const authorName = form.authorName.value;
    const postTitle = form.postTitle.value;
    const authorImage = form.authorImage.value;
    const postDescription = form.postDescription.value;
 

    const announcement = {
      authorImage,
      authorName,
      title: postTitle,
      description: postDescription,
      postedTime,
 
    };
    console.log(announcement);
    axiosPublic.post("announcements", announcement).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Announcement Published");
        form.reset();
      }
    });
  };

  return (
    <div className="pt-10">
      <h2 className="text-3xl font-semibold text-center my-10">Create Announcement</h2>
      <form onSubmit={handleMakeAnnouncement} className="max-w-[90%] p-3 mx-auto">
        {/* author name and email  */}
        <div className="flex flex-col md:flex-row md:gap-8 justify-center">
          {/* name  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              defaultValue={user && user.displayName}
              readOnly
              name="authorName"
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
          {/* email  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              defaultValue={user && user.email}
              readOnly
              name="authorEmail"
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
        </div>
        {/* title author image  */}
        <div className="flex flex-col md:flex-row md:gap-8 justify-center">
          {/* title  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              name="postTitle"
              type="text"
              id="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
          {/* image  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              defaultValue={user && user.photoURL}
              readOnly
              name="authorImage"
              type="text"
              id="image"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
        </div>
        {/* description and tag  */}
        <div className="flex flex-col md:flex-row md:gap-8 justify-center">
          {/* description  */}
          <div className="mb-5 w-full">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              name="postDescription"
              type="text"
              id="description"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:gray-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-600 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
         
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="text-white w-full bg-slate-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-gary-700 dark:focus:ring-slate-800"
          >
            Create Announcement
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
