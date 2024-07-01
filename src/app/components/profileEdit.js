"use client";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, InputBase, InputLabel, TextField } from "@mui/material";
import "../../../public/sass/pages/profile.scss";
import { useState } from "react";

export default function ProfileEdit() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="outer_container">
      <div className="upper_area">
        <div className="save_changes">
          <Link href="Javascript:;">Save Changes</Link>
        </div>
        <div className="profile_picture">
          <Avatar
            alt="Remy Sharp"
            src="/images/profile.jpg"
            sx={{ width: 162, height: 162 }}
          />

          <div className="profile_picture_edit">
            <Link href="Javascript:;">
              <EditIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="lower_area">
        <div className="name_box">
          <InputLabel>Name</InputLabel>
          <InputBase placeholder="Name" type="text" />
        </div>
        <div className="description_box">
          <InputLabel>Description</InputLabel>
          <TextField
            placeholder="Lorem ipsum dolor sit amet consectetur. Aenean ornare facilisis potenti amet consectetur nibh. Venenatis ut sed faucibus vitae sed cras faucibus risus habitasse. Diam facilisi porttitor et congue. Id hendrerit massa nascetur vivamus orci dignissim amet odio"
            type="text"
            fullWidth
            multiline
          />
        </div>
        <div className="email_box">
          <InputLabel>Email</InputLabel>
          <InputBase placeholder="E-mail" />
        </div>
        <div className="Password_box">
          <InputLabel>Password</InputLabel>
          {showPassword ? <InputBase placeholder="Password" /> : null}
          <div className="show_password_button">
            <Link
              href="Javascript:;"
              className="show_password"
              onClick={toggleShowPassword}
            >
              Show Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
