'use client'
import { useState } from "react";
import { Container, Grid, Typography, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Image from "next/image";
import "../../../../../public/sass/pages/auth.scss"
import Logo from "../../../../../public/images/logo.png"
import User from "../../../../../public/images/user.png"
import Graphic from "../../../../../public/graphic.svg"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from "next/link";

const SignUp = () => {
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
                            <div className="logo_section">
                                <Image src={Logo} alt="Logo" />
                            </div>
                            <div className="left_Form">
                                <div className="form_text signup_form_text">
                                    <Typography variant="h4">Sign-Up</Typography>
                                    <Typography variant="h6">If you already have an account register. You can
                                        <Link href="#">Login here !</Link>
                                    </Typography>
                                </div>

                                <div className="name_area">
                                    <div className="left_name">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="First Name"
                                            placeholder="Enter your first name"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Image src={User} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                        />
                                    </div>
                                    <div className="right_name">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Last Name"
                                            placeholder="Enter your last name"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Image src={User} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                        />
                                    </div>
                                </div>
                                <div className="form_area signup_formarea">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Email"
                                        placeholder="Enter your email address"
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
                                <div className="form_area signup_formarea">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
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
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        variant="standard"
                                    />
                                </div>
                                <div className="form_area signup_formarea">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Confirm Password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm your Password"
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
                                <div className="btn_area">
                                    <Button variant="contained">Register</Button>
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
export default SignUp;