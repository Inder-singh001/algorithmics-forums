"use client";
import Link from "next/link";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import { InputLabel, Input, InputAdornment, IconButton, Button ,FormHelperText} from "@mui/material";
import "../../../public/sass/pages/profileEdit.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AvatarPic from "../../../public/images/profile_pic.png";
import { validatorMake, foreach, postApi, getApi } from '../../helpers/General';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { tokenName, getToken } from "@/dataCenter/LocalStorage";
import { HelperText } from "./helpertext";
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
const ProfileEdit = () => {

  const [passBtn, setPassBtn] = useState(false);
  const handlepass = () => {
    setPassBtn(true)
  }

  const getData = async (token) => {
    try {
      let res = await getApi('/user/profile')
      return (res.data);

    }
    catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  let editData = {
    first_name: '',
    last_name: '',
    about_me: '',
    email: '',
  }
  const [formData, setFormData] = useState(editData);
  const [errors, setErrors] = useState(editData);

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
    })
    let coin = getToken(tokenName.LOGIN_TOKEN)
    let userData = await getData(coin.data)
    if (!validationRules.fails()) {
      console.log(formData, "formData")
      let resp = await postApi(`/user/update/${userData._id}`, formData)
      console.log(resp)
      if (resp.status) {
        toast.success(resp.message)
        setFormData({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          about_me: userData.about_me || '',
          email: userData.email || '',
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
  return (
    <div className="edit_section">
      {!passBtn ? (
        <form onSubmit={handleSubmit}>
          <IconButton
            aria-label="back"
            onClick={()=> router.back()}
            edge="start"
          >
            <ArrowBack />
          </IconButton>
          <div className="head_section">
            <div className="avatar_section">
              <Image src={AvatarPic} alt="Remy Sharp" />
              <EditIcon />
            </div>
            <div className="btn_section" >
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
              />
              <HelperText error={errors.email ? errors.email : ""} />
            </div>
            <div className="change_pass_area" onClick={handlepass}>
              <Button onClick={handlepass}>Change Password </Button>
            </div>
          </div>
        </form>
      ) : (
        <EditPassword />
      )
      }
    </div>
  );
}
export default ProfileEdit


export const EditPassword = () => {
  const [passBtn, setPassBtn] = useState(false);
  const handlepass = () => {
    setPassBtn(true)
  }

  let editData = {
    old_password: '',
    password: '',
    password_confirmation: ''
  }
  const [formData, setFormData] = useState(editData);
  const [errors, setErrors] = useState(editData);

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
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);


  // Prevent default mouse down behavior
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let handleConfirm = async (e) => {
    e.preventDefault()
    let validationRules = await validatorMake(formData, {
      old_password: "required",
      password: "required",
      password_confirmation: "required|same:password",
    })
    if (!validationRules.fails()) {
      let resp = await postApi('/user/edit-password', formData)
      if (resp.status) {
        toast.success(resp.message)
        setFormData(editData)
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

  return (
    <div className="edit_section">
      {!passBtn ? (<>
        <div className='header_editPassword'>
          <IconButton
            aria-label="back"
            onClick={handlepass}
            edge="start"
          >
            <ArrowBack />
          </IconButton>
          Change Password
        </div>
        <form onSubmit={handleConfirm}>
          <div className='body_section'>
            <div className="text_section">
              <InputLabel htmlFor="old_password">Old Password</InputLabel>
              <Input
                id="old_password"
                label="Enter your old password"
                placeholder="Enter your old password"
                name="old_password"
                value={formData.old_password}
                onChange={handleInputChange}
                type={showOldPassword ? 'text' : 'password'}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showOldPassword ? <Visibility /> : <VisibilityOff/>}
                    </IconButton>
                  </InputAdornment>
                }
                variant="standard"
              />
              <HelperText error={errors.old_password ? errors.old_password : ""} />
            </div>
            <div className="text_section">
              <InputLabel htmlFor="password">New Password</InputLabel>
              <Input
                id="password"
                placeholder="Enter New Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type={showPassword ? 'text' : 'password'}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff/>}
                    </IconButton>
                  </InputAdornment>
                }
                variant="standard"
              />
              <HelperText error={errors.password ? errors.password : ""} />
            </div>
            <div className="text_section">
              <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
              <Input
                id="password_confirmation"
                placeholder="Connfirm Password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                type={showConfirmPassword ? 'text' : 'password'}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff/>}
                    </IconButton>
                  </InputAdornment>
                }
                variant="standard"
              />
              <HelperText error={errors.password_confirmation ? errors.password_confirmation : ""} />
            </div>
            <div className="btn_area">
              <Button variant="contained" type="submit" >Confirm</Button>
            </div>
          </div>
        </form>
      </>
      ) : (<ProfileEdit />)
      }
    </div >
  )
} 