'use client'
import { Container, Grid, Typography, TextField } from "@mui/material";
import Image from "next/image";
import "../../../../../public/sass/pages/change_password.scss"
import Logo from "../../../../../public//images/logo.png"
import Graphic from "../../../../../public/graphic.svg"
import Button from '@mui/material/Button';


const ChangePassword = () => {

    return (
        <div className="pass_section">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="pass_area">
                            <div className="logo_section">
                                <Image src={Logo} alt="Logo" />
                            </div>
                            <div className="left_Form">
                                <div className="form_text">
                                    <Typography variant="h4">Change Password</Typography>
                                    <Typography variant="h6">Please enter the email address you use when creating your account, We'll send you the instructions to reset your password</Typography>
                                </div>
                                <div className="form_btn">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Email Address"
                                        placeholder="Enter your email address"
                                        variant="standard"
                                    />
                                </div>
                                <div className="btn_area">
                                    <Button variant="contained">Submit</Button>
                                </div>
                            </div>
                            <div className="right_Frame">
                                <div className="graphic_area">
                                    <Image src={Graphic} width={647} height={647} alt="Graphic"></Image>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container >
        </div >
    )
}
export default ChangePassword;