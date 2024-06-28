"use client";
import { Container, Grid, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";;
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../../../../public/sass/pages/navbar.scss";
import { useState } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header-section----start */}
      <div className="outer_section">
        <Container>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <div className="navbar_section">
                <div className="navbar_left_container">
                  <div className="navbar_logo">
                    <Image
                      src="/images/brand_logo.png"
                      alt="brand_logo"
                      height={30}
                      width={114}
                      priority
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
                    onClick={() => setOpen(!open)}
                  >
                    <AccountCircleIcon />
                  </div>

                  {open ? (
                    <div className="profile_menu_list">
                      <div className="profile_close"  onClick={() => setOpen(false)}>
                          <CloseIcon/>
                      </div>
                      <div className="profile_menu_list_item">
                      <ul>
                        <li >
                          
                          <Link href="/profile">Profile</Link>
                        </li>
                        <li >
                          
                          <Link href="/settings">Settings</Link>
                        </li>
                        <li >
                         
                          <Link href="/logout">Logout</Link>
                        </li>
                      </ul>
                      </div>
                    </div>
                  ) : null}

                  <div className="utilities_login_button">
                    <button className="login_button">Login</button>
                  </div>
                  <div
                    className="responsive_menu_icon"
                    onClick={() => setShow(true)}
                  >
                    <MenuIcon />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* Header-section----start */}

      {/* Responsive-Header-section----start */}
      {show ? (
        <div className="responsive_header">
          <div className="hello">
            <div className="hello_contents">
              <div className="navbar_logo_resposive">
                <Image
                  src="/images/brand_logo.png"
                  alt="brand_logo"
                  height={30}
                  width={114}
                  priority
                />
              </div>
              <ul>
              <li>
                  <Link href="/Dashboard">Search</Link>
                </li>
                <li>
                  <Link href="/Dashboard">Home</Link>
                </li>
                <li>
                  <Link href="/Dashboard">Make a Post</Link>
                </li>
                <li>
                  <Link href="/Dashboard">My Profile</Link>
                </li>
              </ul>
            </div>
            <div className="close_icon" onClick={() => setShow(false)}>
              {" "}
              <CloseIcon />
            </div>
          </div>
        </div>
      ) : null}
      {/* Responsive-Header-section----start */}
    </>
  );
}
