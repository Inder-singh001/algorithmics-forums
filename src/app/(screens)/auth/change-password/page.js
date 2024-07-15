"use client"; // Indicates this is a client-side component

import { Container, Grid, Typography, TextField } from "@mui/material"; // Importing necessary components from Material-UI
import Image from "next/image"; // Importing Image component from Next.js
import { useState } from "react"; // Importing useState hook from React
import "../../../../../public/sass/pages/auth.scss"; // Importing custom Sass styles
import Logo from "../../../../../public/images/logo.png"; // Importing the logo image
import Graphic from "../../../../../public/graphic.svg"; // Importing a graphic image
import Button from "@mui/material/Button"; // Importing Button component from Material-UI
import { useRouter } from "next/navigation"; // Importing router for navigation from Next.js
import { validatorMake, foreach, postApi } from "../../../../helpers/General"; // Importing custom helper functions
import { toast } from "react-toastify"; // Importing toast for notifications
import { setToken, tokenName } from "@/dataCenter/LocalStorage"; // Importing functions for local storage operations

const ChangePassword = () => {
  const router = useRouter(); // Initializing the router

  // Default form values
  let defaultValue = {
    email: "",
  };

  // State for form data
  let [formData, setFormData] = useState(defaultValue);

  // State for form errors
  let [errors, setErrors] = useState(defaultValue);

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
    });

    if (!validationRules.fails()) {
      try {
        // Submit form data to the server
        let resp = await postApi("/user/change-password", formData);
        if (resp.status) {
          toast.success(resp.message); // Show success message
          setFormData(defaultValue); // Reset form data
          if (resp.data.email_verified != null) {
            setToken(tokenName.OTP_TOKEN, resp.data.token); // Save token to local storage
            router.push("/auth/otp-verification"); // Redirect to dashboard if email is verified
          } else {
            setToken(tokenName.OTP_TOKEN, resp.data.token); // Save token to local storage
            router.push("/auth/login"); // Redirect to verify email page if email is not verified
          }
        } else {
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } else {
      handleErrors(validationRules.errors.errors); // Handle validation errors
      console.log(validationRules.errors.errors);
    }
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
                    <Typography variant="h4">Change Password</Typography>
                    <Typography variant="h6">
                      Please enter the email address you use when creating your
                      account, We'll send you the instructions to reset your
                      password
                    </Typography>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form_area changepass_area">
                      <TextField
                        id="input-with-icon-textfield"
                        label="Email Address"
                        placeholder="Enter your email address"
                        name="email"
                        value={formData.email}
                        helperText={errors.email ? errors.email : ""}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    </div>
                    <div className="btn_area passbtn_area">
                      <Button variant="contained" type="submit">
                        Submit
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

export default ChangePassword; // Exporting the ChangePassword component
