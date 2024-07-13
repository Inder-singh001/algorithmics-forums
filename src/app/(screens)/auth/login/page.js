"use client";
import { useState } from "react";
import { Container, Grid, Typography, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import "../../../../../public/sass/pages/auth.scss";
import Logo from "../../../../../public//images/logo.png";
import Graphic from "../../../../../public/graphic.svg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validatorMake, foreach, postApi } from '../../../../helpers/General'
import { toast } from "react-toastify";
import { setToken, tokenName } from "@/dataCenter/LocalStorage";

const Login = () => {
  const router = useRouter();
  let defaultValue = {
    
    email: "",
    password: "",
  };

  let [formData, setFormData] = useState(defaultValue);
  let [errors, setErrors] = useState(defaultValue);

  let handleInputChange = (e) => {
    let { name, value } = e.target;
    // setPreferences({
    //     ...preferences,
    //     [name]: value
    // });
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

    setErrors((prevData) => {
      return {
        ...prevData,
        [name]: null,
      };
    });
  };

  let handleErrors = (errors) => {
    foreach(errors, (index, item) => {
      setErrors((prevData) => {
        return {
          ...prevData,
          [index]: item[0],
        };
      });
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let validationRules = await validatorMake(formData, {
      email: "required|email",
      password: "required",
    });

    if (!validationRules.fails()) {
      let resp = await postApi("/user/login", formData);
    if (resp.status) {
      toast.success(resp.message);
      setFormData(defaultValue);
      setToken(tokenName.OTP_TOKEN, resp.data.token);
      if (resp.data.user_verified) {
        router.push("/dashboard/explore");
      } else {
        router.push("/auth/otp-verification");
      }
    } else {
      if (typeof resp.message == "object") {
        handleErrors(resp.message.errors);
      } else {
        toast.error(resp.message);
      }
    }
    } else {
      handleErrors(validationRules.errors.errors);
      console.log(validationRules.errors.errors);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth_section">
      <Container>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <div className="auth_area">
              <div className="left_section">
                <div className="logo_section">
                  <Image src={Logo} alt="Logo" />
                </div>
                <div className="left_Form">
                  <div className="form_text">
                    <Typography variant="h4">Login</Typography>
                    <Typography variant="h6">
                      If you don't have a registered account. You can
                      <Link href="/auth/sign-up">Register here !</Link>
                    </Typography>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form_area">
                      <TextField
                        id="input-with-icon-textfield"
                        label="Email"
                        placeholder="Enter your email address"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        helperText={errors.email ? errors.email : ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                    </div>
                    <div className="form_area">
                      <TextField
                        id="input-with-icon-textfield"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        helperText={errors.password ? errors.password : ""}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {!showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                    </div>
                    <div className="forget_passSection">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                      />
                      <Link href="/auth/change-password">
                        Forget password ?
                      </Link>
                    </div>
                    <div className="btn_area">
                      <Button variant="contained" type="submit">Login</Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="right_Frame">
                <div className="graphic_area">
                  <Image src={Graphic} priority={true} alt="Graphic"></Image>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Login;
