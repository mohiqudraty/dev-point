

const Announcement = ({ ann }) => {
 


  return (
    <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className=" py-4 border-y-2 bg-slate-300">
      <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {ann.title}
              </h2>
              <p className="text-sm text-gray-600">
                {ann.description}
              </p>
            </div>
      
      </div>
    </div>
  );
};

export default Announcement;
