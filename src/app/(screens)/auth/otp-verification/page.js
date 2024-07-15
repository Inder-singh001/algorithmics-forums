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
import Link from "next/link";
import { validatorMake, postApi, getData, getmail } from '../../../../helpers/General'
import { toast } from "react-toastify";
import { getToken, tokenName, setToken } from "@/dataCenter/LocalStorage";


const OTPverify = () => {

    const router = useRouter();
    const [otp, setOtp] = useState('');
    let [errors, setErrors] = useState({ otp, token: "" })
    const [resendCount, setResendCount] = useState(0);
    const MAX_RESEND_ATTEMPTS = 5;

    const handleOTPRequest = async (e) => {
        e.preventDefault()
        let token = getToken(tokenName.OTP_TOKEN)

        let formData = {
            otp,
            token
        }
        console.log(formData, "formData")
        let validationRules = await validatorMake(formData, {
            "token": "required",
            "otp": "required",
        })

        if (!validationRules.fails()) {
            let resp = await postApi('/user/verify-otp', formData)
            if (resp.status) {
                toast.success(resp.message)
                setOtp("");
                setToken(tokenName.OTP_TOKEN, null)
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

    const handleResendOTP = async (e) => {
        console.log("clicked")
        e.preventDefault()

        if (resendCount < MAX_RESEND_ATTEMPTS) {
            let token = getToken(tokenName.OTP_TOKEN)
            let formData = {
                token
            }
            let validationRules = await validatorMake(formData, {
                "token": "required",
            })

            if (!validationRules.fails()) {
                let res = await postApi('/user/resend-otp', formData)
                if (res.status) {
                    setResendCount(resendCount + 1)
                    toast.success("OTP has been sent to your email.")
                }
                else {
                    toast.success("Failed to send OTP.")
                }
            }
        }
        else {
            toast.error("Maximum OTP resend attempts reached. Please check your registered email.");
        }
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
                                        <div className="btn_area passbtn_area otp_btn">
                                            <Button type="Submit" variant="contained">Submit</Button>
                                        </div>
                                    </form>
                                    <div className="resend_otp_section">
                                        <Typography variant="h6">Didn't get an OTP?
                                            <span onClick={handleResendOTP} >Resend OTP</span>
                                        </Typography>
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
export default OTPverify;