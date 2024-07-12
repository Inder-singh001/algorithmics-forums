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
import { useRouter } from "next/navigation";
import { validatorMake, foreach, postApi } from '../../../../helpers/General'
import { toast } from "react-toastify";


const SignUp = () => {
    const router = useRouter();
    let defaultValue = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    let [formData, setFormData] = useState(defaultValue)
    let [errors, setErrors] = useState(defaultValue)

    let handleInputChange = (e) => {

        let { name, value } = e.target
        // setPreferences({
        //     ...preferences,
        //     [name]: value
        // });
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
            "email": "required|email",
            "password": "required|confirmed",
            "password_confirmation": "required"
        })


        if (!validationRules.fails()) {
            console.log(formData, "formData")
            let resp = await postApi('/user/sign-up', formData)

            if (resp.status) {
                let set = localStorage.setItem('userEmail', formData.email); //save to localStorgae
                toast.success(resp.message)
                setFormData(defaultValue);
                router.push('/auth/otp-verification')
                console.log(set)
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
    //Modal Props
    // const router = useRouter();
    // const [preferences, setPreferences] = useState({});

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setPreferences({
    //         ...preferences,
    //         [name]: value
    //     });
    // };

    // const handleRegister = () => {
    //     localStorage.setItem('preferences', JSON.stringify(preferences));
    //     // router.push('/dashboard/explore');
    // };

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
                                <div className="left_Form" >
                                    <div className="form_text signup_form_text">
                                        <Typography variant="h4">Sign-Up</Typography>
                                        <Typography variant="h6">If you already have an account register. You can
                                            <Link href="/auth/login">Login here !</Link>
                                        </Typography>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="name_area">
                                            <div className="left_name">
                                                <TextField
                                                    id="input-with-icon-textfield"
                                                    label="First Name"
                                                    placeholder="Enter your first name"
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleInputChange}
                                                    helperText={errors.first_name ? errors.first_name : ''}
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
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    helperText={errors.last_name ? errors.last_name : ''}
                                                    onChange={handleInputChange}
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
                                                name="email"
                                                helperText={errors.email ? errors.email : ''}
                                                onChange={handleInputChange}
                                                value={formData.email}
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
                                                name="password"
                                                value={formData.password}
                                                helperText={errors.password ? errors.password : ''}
                                                onChange={handleInputChange}
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
                                                                {!showPassword ? <VisibilityOff /> : <Visibility />}
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
                                                name="password_confirmation"
                                                value={formData.password_confirmation}
                                                helperText={errors.password_confirmation ? errors.password_confirmation : ''}
                                                placeholder="Confirm your Password"
                                                onChange={handleInputChange}
                                                type={showConfirmPassword ? 'text' : 'password'}
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
                                                                {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                variant="standard"
                                            />
                                        </div>
                                        <div className="btn_area">
                                            <Button variant="contained" type="submit" >Register</Button>
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
            </Container >
        </div >
    )
}
export default SignUp;