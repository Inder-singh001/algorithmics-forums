"use client";
import { useState } from "react";
import { Container, Grid, Typography, TextField } from "@mui/material";
import Image from "next/image";
import "../../../../../public/sass/pages/auth.scss";
import Logo from "../../../../../public//images/logo.png";
import Graphic from "../../../../../public/graphic.svg";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation"; 
import { validatorMake, foreach, postApi } from "../../../../helpers/General"; 
import { toast } from "react-toastify"; 
import { getToken, tokenName } from "@/dataCenter/LocalStorage"; 

const ResetPassword = () => {
  const router = useRouter();
  let defaultValue = {
    password: "",
    password_confirmation: "",
  };

  let [formData, setFormData] = useState(defaultValue);
  let [errors, setErrors] = useState(defaultValue);

  let handleInputChange = (e) => {
    let { name, value } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = getToken(tokenName.OTP_TOKEN);

    const formPayload = {
      token,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
    };

    const validationRules = await validatorMake(formPayload, {
      token: "required",
      password: "required",
      password_confirmation: "required",
    });

    if (!validationRules.fails()) {
      let resp = await postApi('/user/reset-password', formPayload);
      if (resp.status) 
      {
        toast.success(resp.message);
        router.push('/auth/login');
      } 
      else {
        toast.error(resp.message);
        handleErrors(resp.errors);
      }
    } else {
      handleErrors(validationRules.errors.errors);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

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
                <div className="left_Form leftpass_form">
                  <div className="form_text changepass_text">
                    <Typography variant="h4">Reset Password</Typography>
                    <Typography variant="h6">
                      Please enter your new password and confirm it below.
                    </Typography>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form_area changepass_area">
                      <TextField
                        id="input-with-icon-textfield"
                        label="New Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        name="password"
                        value={formData.password}
                        helperText={errors.password ? errors.password : ""}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />

                      <TextField
                        id="input-with-icon-textfield"
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter your confirm password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        helperText={
                          errors.password_confirmation
                            ? errors.password_confirmation
                            : ""
                        }
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                    </div>
                    <div className="btn_area passbtn_area">
                      <Button variant="contained" type="submit">
                        Reset Password
                      </Button>
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
export default ResetPassword;
