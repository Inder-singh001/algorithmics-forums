import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import "../../../../../public/sass/dashboard/explore.scss";
import { Container, Grid } from "@mui/material";
import { Posts } from "@/app/components/post";
import ProfileEdit from "@/app/components/profileEdit";

const Dashboard = () => {
  return (
    <div className="dashboard_section explore_section">
      <Navbar fixed="top" />

      <div className="inner_section">
        <div className="left_section">
          <Sidebar />
        </div>
        <div className="right_section">
          <div className="explore_area">
            <ProfileEdit />
          </div>
          <div className="suggestion_area">{/* <Posts /> */}</div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
