import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../../../../public/sass/dashboard/blogpost.scss";
const Dashboard = () => {
  return (
    <div className="dashboard_section blogpost_section">
      <Navbar fixed="top" />
      <div className="inner_section">
        <div className="left_section">
          <Sidebar />
        </div>
        <div className="right_section"></div>
      </div>
    </div>
  );
};
export default Dashboard;
