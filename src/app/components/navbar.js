"use client";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";;
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../../../public/sass/pages/navbar.scss";
import { useState } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../../../public/images/logo.png"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const [show, setShow] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Menu Drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setShow(open);
  };
  const NavList = [
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {NavList.map((text, index) => (
          <ListItem key={index}  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
      {/* Header-section----start */}
      <div className="outer_section">
        <div className="navbar_section">
          <div className="navbar_left_container">
            <div className="navbar_logo">
              <Image
                src={Logo}
                alt="brand_logo"
                priority={true}
              />
            </div>
          </div>
          <div className="search_bar_container">
            <div className="search_bar_icon">
              <SearchIcon />
            </div>
            <div className="search_bar_input">
              <InputBase
                placeholder="Search here..."
                className="search_input"
              />
            </div>
          </div>
          <div className="navbar_right_container">
            <div className="utilities_notification_icon">
              <NotificationsIcon />
            </div>

            <div

              className="utilities_profile_icon"
            >

              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <PersonIcon />

              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>


            <div className="utilities_login_button">
              <Button>Login</Button>
            </div>
            <div
              className="responsive_menu_icon"
              onClick={() => setShow(true)}
            >
              <MenuIcon />
            </div>
          </div>
        </div>
      </div>
      {/* Header-section----start */}

      {/* Responsive-Header-section----start */}
      {show ? (
        <div className="responsive_header">
          <Drawer anchor="right" open={show} onClose={toggleDrawer(false)}>
            {list("right")}
          </Drawer>

        </div>


        //   <div className="hello">
        //     <div className="hello_contents">
        //       <div className="navbar_logo_resposive">
        //         <Image
        //           src="/images/brand_logo.png"
        //           alt="brand_logo"
        //           height={30}
        //           width={114}
        //           priority
        //         />
        //       </div>
        //       <ul>
        //         <li>
        //           <Link href="/Dashboard">Search</Link>
        //         </li>
        //         <li>
        //           <Link href="/Dashboard">Home</Link>
        //         </li>
        //         <li>
        //           <Link href="/Dashboard">Make a Post</Link>
        //         </li>
        //         <li>
        //           <Link href="/Dashboard">My Profile</Link>
        //         </li>
        //       </ul>
        //     </div>
        //     <div className="close_icon" onClick={() => setShow(false)}>
        //       <CloseIcon />
        //     </div>
        //   </div>
      ) : null}
      {/* Responsive-Header-section----start */}
    </>
  );
}
