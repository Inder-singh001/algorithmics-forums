'use client'
import { useState } from "react";
import { Container, Grid, Typography, TextField } from "@mui/material";
import Image from "next/image";
import "../../../../../public/sass/pages/auth.scss"
import Logo from "../../../../../public//images/logo.png"
import Graphic from "../../../../../public/graphic.svg"
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



const ResetPassword = () => {


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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
                                        <Typography variant="h6">Please enter the email address you use when creating your account, We'll send you the instructions to reset your password.</Typography>
                                    </div>
                                    <div className="form_area changepass_area">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="New Password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your new password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="standard"
                                        />

                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Confirm Password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Enter your confirm password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="standard"
                                        />
                                    </div>
                                    <div className="btn_area passbtn_area">
                                        <Button variant="contained">Reset Password</Button>
                                    </div>
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
            </Container >
        </div >
    )
}
export default ResetPassword;