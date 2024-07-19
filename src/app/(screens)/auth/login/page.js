"use client"; // Ensures this component runs on the client side

import { useState } from "react"; // Importing useState hook from React
import { Container, Grid, Typography, TextField } from "@mui/material"; // Importing Material UI components
import InputAdornment from "@mui/material/InputAdornment"; // For adornments in input fields
import Image from "next/image"; // Next.js Image component for optimized images
import "../../../../../public/sass/pages/auth.scss"; // Importing custom styles
import Logo from "../../../../../public/images/logo.png"; // Importing images
import Graphic from "../../../../../public/graphic.svg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"; // Importing Material UI icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel"; // For form control labels
import Checkbox from "@mui/material/Checkbox"; // For checkboxes
import Button from "@mui/material/Button"; // For buttons
import IconButton from "@mui/material/IconButton"; // For icon buttons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link"; // Next.js Link component for client-side navigation
import { useRouter } from "next/navigation"; // Next.js hook for navigation
import { validatorMake, foreach, postApi } from "../../../../helpers/General"; // Importing custom helper functions
import { toast } from "react-toastify"; // For toast notifications
import { setToken, setValue, tokenName } from "@/dataCenter/LocalStorage"; // Importing functions for local storage operations

const Login = () => {
  const router = useRouter(); // Initializing the router

  // Default form values
  let defaultValue = {
    email: "",
    password: "",
  };

  let [formData, setFormData] = useState(defaultValue); // State for form data
  let [errors, setErrors] = useState(defaultValue); // State for form errors

  // Handle input change event
  let handleInputChange = (e) => {
    let { name, value } = e.target;
    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors for the current field
    setErrors((prevData) => ({
      ...prevData,
      [name]: null,
    }));
  };

  // Handle errors and update state
  let handleErrors = (errors) => {
    foreach(errors, (index, item) => {
      setErrors((prevData) => ({
        ...prevData,
        [index]: item[0],
      }));
    });
  };

  // Handle form submit event
  let handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    let validationRules = await validatorMake(formData, {
      email: "required|email",
      password: "required",
    });

    if (!validationRules.fails()) {
      try {
        // Submit form data to the server
        let resp = await postApi("/user/login", formData);
        if (resp.status)
        {
          setFormData(defaultValue); // Reset form data
          setToken(tokenName.LOGIN_TOKEN, resp.data.login_token); // Save token to local storage
          if (resp.data.email_verified !=null)
          {
            toast.success(resp.message); // Show success message
            setValue("preferenceCount", resp.preferenceCount) //preferenceCount to show modal
            router.push("/dashboard/explore"); // Redirect to dashboard if email is verified
          }
          else if (resp.data.email_verified == null)
          {
            toast.success(resp.message); // Show success message
            router.push("/auth/otp-verification"); // Redirect to dashboard if email is verified
          }
          else
          {
            toast.error(resp.message); // Show success message
          }
        } else {
          handleApiErrors(resp);
        }
      } catch (error) {
        console.error(error);
        toast.error("Check Your credentials and try again.");
      }
    } else {
      handleErrors(validationRules.errors.errors); // Handle validation errors
      console.log(validationRules.errors.errors);
    }
  };

  const handleApiErrors = (resp) => {
    if (typeof resp.message === "object") {
      handleErrors(resp.message.errors); // Handle validation errors from the server
    } else {
      toast.error(resp.message); // Show error message
    }
  };

  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevent default mouse down behavior
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
                  <Image src={Logo} alt="Logo" /> {/* Logo */}
                </div>
                <div className="left_Form">
                  <div className="form_text">
                    <Typography variant="h4">Login</Typography>{" "}
                    {/* Login title */}
                    <Typography variant="h6">
                      If you don't have a registered account, you can{" "}
                      <Link href="/auth/sign-up">Register here!</Link>{" "}
                      {/* Link to sign-up page */}
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
                        helperText={errors.email ? errors.email : ""}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlinedIcon /> {/* Email icon */}
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        name="password"
                        value={formData.password}
                        helperText={errors.password ? errors.password : ""}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon /> {/* Password icon */}
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
                                  <VisibilityOff /> /* Icon to show password */
                                ) : (
                                  <Visibility /> /* Icon to hide password */
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
                        label="Remember me" // Remember me checkbox
                      />
                      <Link href="/auth/change-password">
                        Forget password? {/* Link to forget password page */}
                      </Link>
                    </div>
                    <div className="btn_area">
                      <Button variant="contained" type="submit">
                        Login {/* Submit button */}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="right_Frame">
                <div className="graphic_area">
                  <Image src={Graphic} priority={true} alt="Graphic" />{" "}
                  {/* Graphic */}
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
