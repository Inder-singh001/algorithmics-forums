'use client'
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../public/sass/dashboard/dashboard.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeState, setActiveState] = useState(0)


  const SideList = [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      href: "/dashboard/explore",
    },
    {
      icon: <AddCircleIcon />,
      title: "Make a Post",
      href: "/add-a-post",
    },
    {
      icon: <AccountCircleIcon />,
      title: "Profile",
      href: "/profile",
    },
  ]

  const handleNavigation = (index, href) => {
    setActiveState(index)
    router.push(href)
  }

  return (
    <div className="inner_parent">
      <div className="sidebar">
        <div className="sidebar_text">
          <Typography>Sidebar</Typography>
        </div>
        <ul className="options">
          {SideList.map((item, index) => (
            <li key={index}
              className={pathname === `${item.href}` ? "active" : ""} >
              <Link href={item.href}>
                <div className="icon_area">
                  {item.icon}
                </div>
                <div className="text_area">
                  <Typography>{item.title}</Typography>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
