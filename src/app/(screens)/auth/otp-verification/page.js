'use client'
import { useEffect, useState } from "react";
import { Container, Grid, Typography, TextField } from "@mui/material";
import Image from "next/image";
import "../../../../../public/sass/pages/auth.scss"
import Logo from "../../../../../public//images/logo.png"
import Graphic from "../../../../../public/graphic.svg"
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import OtpInput from 'react-otp-input';
import { validatorMake, postApi, getData, getmail } from '../../../../helpers/General'
import { toast } from "react-toastify";



const OTPverify = () => {
    useEffect(() => {
        const getToken = async () => {
            let token = await getData(getmail);
            console.log(token.token)
            if (token) {
                setToken(token.token)
            }
        }
        getToken()
    }, [])

    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [token, setToken] = useState('');
    let [errors, setErrors] = useState({ otp, token })

    const getToken = async () => {
        let token = await getData(getmail);
        console.log(token.token)
        if (token) {
            setToken(token.token)
        }
    }

    const handleOTPRequest = async (e) => {
        e.preventDefault()
        let validationRules = await validatorMake(otp, {
            "token": "reqired",
            "otp": "reqired",

        })

        if (!validationRules.fails()) {
            console.log({ otp, token }, "otp")
            let resp = await postApi('/user/verify-otp', { otp, token })

            if (resp.status) {
                toast.success(resp.message)
                setOtp(otp);
                setToken(token)
                router.push('/auth/login')
            }
            else {
                if (typeof resp.message == 'object') {
                    handleErrors(resp.message.errors)
                }
                else {
                    toast.error(resp.message)
                }
            }
            console.log(resp.message.errors, "resp")
        }
        else {
            handleErrors(validationRules.errors.errors)
            console.log(validationRules.errors.errors)
        }
    }

    const handleOTPChange = (otp) => {
        setOtp(otp)

        setErrors((prevData) => {
            return {
                ...prevData,
                otps: null
            }
        })
    }

    let handleErrors = (errors) => {
        setErrors(errors)
    }
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
                                <div className="left_Form otp_area">
                                    <div className="form_text changepass_text otp_text">
                                        <Typography variant="h4">One-Time-Password</Typography>
                                        <Typography variant="h6">Please enter the One-Time Password (OTP) to verify your email.</Typography>
                                    </div>
                                    <form onSubmit={handleOTPRequest}>
                                        <div className="form_area changepass_area otp_input">
                                            <OtpInput
                                                value={otp}
                                                onChange={handleOTPChange}
                                                numInputs={6}
                                                renderInput={(props) => <input {...props} />}
                                            />
                                        </div>
                                        <div className="btn_area passbtn_area">
                                            <Button type="Submit" variant="contained">Submit</Button>
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
export default OTPverify;