'use client'
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../public/sass/dashboard/dashboard.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {

  const router = useRouter();
  const [activeState, setActiveState] = useState(null)


  const SideList = [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      route: "/dashboard/explore",
      },
      {
      icon: <AddCircleIcon />,
      title: "Make a Post",
      route: "/dashboard/add-a-post",
    },
    {
      icon: <AccountCircleIcon />,
      title: "Profile",
      route: "/dashboard/profile",
    },
  ]

  const handleNavigation = (index, route) => {
    setActiveState(index)
    router.push(route)
  }

  return (
    <div className="inner_parent">
      <div className="sidebar">
        <div className="sidebar_text">
          <Typography>Sidebar</Typography>
        </div>
        <ul className="options">
          {SideList.map((item, index) => (
            <li key={index} onClick={() => handleNavigation(index, item.route)}
              className={activeState === index ? "active" : ""} >
              <div className="icon_area">
                {item.icon}
              </div>
              <div className="text_area">
                <Typography>{item.title}</Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
