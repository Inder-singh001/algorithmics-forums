"use client";
import Link from "next/link";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import { InputLabel, Input, InputAdornment, IconButton, Typography } from "@mui/material";
import "../../../public/sass/pages/profileEdit.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AvatarPic from "../../../public/images/profile_pic.png"

export default function ProfileEdit() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSaveChanges = () => {
    router.push('/profile')
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="edit_section">
      <div className="head_section">
        <div className="avatar_section">
          <Image src={AvatarPic} alt="Remy Sharp" />
          <EditIcon />
        </div>
        <div className="btn_section" onClick={handleSaveChanges}>
          <Typography>Save Changes</Typography>
        </div>
      </div>
      <div className="body_section">
        <div className="text_section">
          <InputLabel htmlFor="standard-name">Name</InputLabel>
          <Input
            id="standard-basic"
            placeholder="Name"
          />
        </div>
        <div className="text_section">
          <InputLabel htmlFor="standard-description">About</InputLabel>
          <Input
            id="standard-multiline-flexible"
            placeholder="Write something about yourself!"
            // rows={6}
            multiline
          />
        </div>
        <div className="text_section">
          <InputLabel htmlFor="standard-email">Email</InputLabel>
          <Input
            id="standard-basic"
            placeholder="Email"
          />
        </div>
        <div className="text_section">
          <div className="label_section">
            <div className="pass_area">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            </div><div className="change_pass_area">
              <Link href="/auth/change-password">Change Password </Link>
            </div>
          </div>
          <Input
            id="standard-adornment-password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          // inputProps={{
          //   'aria-label': 'weight',
          // }}
          />
        </div>
      </div>
    </div>

  );
}
