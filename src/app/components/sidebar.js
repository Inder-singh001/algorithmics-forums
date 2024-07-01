import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../public/sass/dashboard/dashboard.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
  return (
    <div className="inner_parent">
      <div className="sidebar">
        <div className="Menu">Sidebar</div>
        <div className="options">
          <button className="dashboard">
            <DashboardIcon />
            Dashboard
          </button>
          <button className="post">
            <AddCircleIcon />
            <div>Make a Post</div>
          </button>
          <button className="user">
            <AccountCircleIcon />
            <div>Profile</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
