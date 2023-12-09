import { Chart } from "react-google-charts";

  
const PieChart = ({users, comments, posts}) => {
    const data = [
        ["Pie Chart", "Web Analytics"],
        ["Users", users],
        ["comments", comments],
        ["posts", posts],
       
      ];
      
      const options = {
        title: "Web Analytics",
      };
    return (
        <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    );
};

export default PieChart;