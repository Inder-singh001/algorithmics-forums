import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../public/sass/dashboard/dashboard.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";

const Sidebar = () => {

  const SideList = [
    {
      icon: <DashboardIcon />,
      title: "Dashboard"
    },
    {
      icon: <AddCircleIcon />,
      title: "Make a Post"
    },
    {
      icon: <AccountCircleIcon />,
      title: "Profile"
    },
  ]

  return (
    <div className="inner_parent">
      <div className="sidebar">
        <div className="sidebar_text">
          <Typography>Sidebar</Typography>
        </div>

        {SideList.map((text, index) => (
          <ul key={index} className="options">
            <li >
              <div className="icon_area">
                {text.icon}
              </div>
              <div className="text_area">
                <Typography>{text.title}</Typography>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
