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
import { useRouter } from "next/navigation"; // Importing router for navigation from Next.js
import { validatorMake, foreach, postApi } from "../../../../helpers/General"; // Importing custom helper functions
import { toast } from "react-toastify"; // Importing toast for notifications
import { getToken, tokenName } from "@/dataCenter/LocalStorage"; // Importing functions for local storage operations

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

  let handleSubmit = async (e) => {
    e.preventDefault();
    let validationRules = await validatorMake(formData, {
      password: "required|confirmed",
      password_confirmation: "required",
    });

    if (!validationRules.fails()) {
      try {
        let resp = await postApi("/user/reset-password", formData);
        if (resp.status) {
          console.log(resp, "resp");
          toast.success(resp.message);
          setFormData(defaultValue);
          getToken(tokenName.OTP_TOKEN, resp.data.token);
          router.push("/auth/login");
        } else {
          if (typeof resp.message === "object") {
            handleErrors(resp.message.errors);
          } else {
            toast.error(resp.message || "An unexpected error occurred.");
          }
        }
      } catch (error) {
        console.error("Error during API call:", error);

        if (error.response) {
          // Server responded with a status other than 200 range
          toast.error(
            `Server Error: ${error.response.status} - ${
              error.response.data.message || error.response.statusText
            }`
          );
        } else if (error.request) {
          // No response was received
          toast.error(
            "Network Error: No response received from the server. Please check your internet connection."
          );
        } else {
          // Something happened in setting up the request
          toast.error(`Error: ${error.message}`);
        }
      }
    } else {
      handleErrors(validationRules.errors.errors);
      console.log(validationRules.errors.errors);
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
