import useReport from "../../../Api/useReport";
import ReportTable from "./ReportTable";



const ReportedComments = () => {
    const {reports} = useReport()
    
    return (
        <div>
        <div className="overflow-x-auto">
          <h2 className="text-center text-slate-900 font-semibold text-xl mt-10">My All Comment Report</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
      <th>Comment</th>
      <th>Report</th>
      <th>Action</th>
     
          </tr>
        </thead>
        <tbody>
       {reports?.length ? reports?.map(repo => <ReportTable key={repo._id} repo={repo}> </ReportTable>) : <p>No Report</p>}
        </tbody>
      </table>
    </div>
      </div>
    );
};

export default ReportedComments;