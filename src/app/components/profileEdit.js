"use client";
import Link from "next/link";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import { InputLabel, Input, InputAdornment, IconButton, Typography, Button } from "@mui/material";
import "../../../public/sass/pages/profileEdit.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AvatarPic from "../../../public/images/profile_pic.png";
import { validatorMake, foreach, postApi, getApi } from '../../helpers/General';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { tokenName, getToken } from "@/dataCenter/LocalStorage";
import { HelperText } from "./helpertext";

const ProfileEdit = () => {

  const getData = async (token) => {
    try {
      let res = await getApi('/user/profile')
      console.log(res)
      return (res.data);

    }
    catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  // let defaultValue = {
  //   first_name: '',
  //   last_name: '',
  //   about_me: '',
  //   email: '',
  //   // password:'',
  // }

  // let [formData, setFormData] = useState(defaultValue)
  // let [errors, setErrors] = useState(defaultValue)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    about_me: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    about_me: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken(tokenName.LOGIN_TOKEN);
        const userData = await getData(token.data);
        if (userData) {
          setFormData({
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            about_me: userData.about_me || '',
            email: userData.email || '',
            password: userData.password || '',
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

      }
    };

    fetchData();
  }, []);

  let handleInputChange = (e) => {
    let { name, value } = e.target
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })

    setErrors((prevData) => {
      return {
        ...prevData,
        [name]: null
      }
    })
  }

  let handleErrors = (errors) => {

    foreach(errors, (index, item) => {
      setErrors((prevData) => {
        return {
          ...prevData,
          [index]: item[0]
        }
      })
    })
  }


  let handleSubmit = async (e) => {
    e.preventDefault()
    let validationRules = await validatorMake(formData, {
      "first_name": "required",
      "last_name": "required",
      "about_me": "required",
      "email": "required|email",
      "password":"required",

    })
    let coin = getToken(tokenName.LOGIN_TOKEN)
    let userData = await getData(coin.data)
    if (!validationRules.fails()) {
      console.log(formData, "formData")
      let resp = await postApi(`/user/update/${userData._id}`, formData)
      console.log(resp)
      if (resp.status) {
        // otp screen
        toast.success(resp.message)
        setFormData({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          about_me: userData.about_me || '',
          email: userData.email || '',
          password: userData.password || '',
        });
        router.push('/profile')
      }
      else {
        if (typeof resp.message == 'object') {
          handleErrors(resp.message.errors)
        }
        else {
          toast.error(resp.message)
        }
      }
      console.log(resp, "resp")
    }
    else {
      handleErrors(validationRules.errors.errors)
      console.log(validationRules.errors.errors)
    }
  }
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (


    <div className="edit_section">
      <form onSubmit={handleSubmit}>
        <div className="head_section">
          <div className="avatar_section">
            <Image src={AvatarPic} alt="Remy Sharp" />
            <EditIcon />
          </div>
          <div className="btn_section" >
            {/* <Typography type="submit" >Save changes</Typography> */}
            <Button type="submit">
              Save changes
            </Button>
          </div>
        </div>
        <div className="body_section">
          <div className="text_section">
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <Input
              id="First_name"
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              // error={!!errors.first_name}
            // helperText={errors.first_name || ''}
            />
            <HelperText error={errors.first_name ? errors.first_name : ""} />
          </div>
          <div className="text_section">
            <InputLabel htmlFor="lat_name">Last Name</InputLabel>
            <Input
              id="last_name"
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              // error={!!errors.last_name}
              // helperText={errors.last_name || ''}
            />
             <HelperText error={errors.last_name ? errors.last_name : ""} />
          </div>
          <div className="text_section">
            <InputLabel htmlFor="about_me">About</InputLabel>
            <Input
              id="standard-multiline-flexible"
              placeholder="Write something about yourself!"
              name="about_me"
              value={formData.about_me}
              onChange={handleInputChange}
              // error={!!errors.about_me}
              // // helperText={errors.about_me || ''}
              // helperText={errors.about_me ? errors.about_me : ""}
              // rows={6}
              multiline
            />
            <HelperText error={errors.about_me ? errors.about_me : ""} />
          </div>
          <div className="text_section">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              // error={!!errors.email}
              // helperText={errors.email || ''}
            />
             <HelperText error={errors.email ? errors.email: ""} />
          </div>
          <div className="text_section">
            <div className="label_section">
              <div className="pass_area">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
              </div>
              <div className="change_pass_area">
                <Link href="/auth/change-password">Change Password </Link>
              </div>
            </div>
            <Input
              id="standard-adornment-password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              helperText={errors.password ? errors.password : ""}
              type={showPassword ? "text" : "password"}
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
             <HelperText error={errors.password ? errors.password: ""} />
          </div>

        </div>
      </form>
    </div>

  );
}
export default ProfileEdit