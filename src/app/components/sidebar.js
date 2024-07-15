'use client'
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../public/sass/dashboard/dashboard.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import { usePathname} from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, tokenName } from "@/dataCenter/LocalStorage";

const Sidebar = () => {
  const pathname = usePathname();
  
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if(getToken(tokenName.LOGIN_TOKEN))
    {
      setIsLogin(true);
    }
    else
    {
      setIsLogin(false);
    }
  })
  const SideList = [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      href: "/dashboard/explore",
    },
    {
      icon: <AddCircleIcon />,
      title: "Make a Post",
      href: isLogin ? "/add-a-post" : '/auth/login',
    },
    {
      icon: <AccountCircleIcon />,
      title: "Profile",
      href: isLogin ?  "/profile" : '/auth/login',
    },
  ]

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
