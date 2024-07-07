'use client'
import { useState } from "react";
import { Typography, Grid } from "@mui/material"
import Image from "next/image";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

import Profile from "../../../public/images/profile_pic.png";
import FollowerIcon from "../../../public/images/FollowIcon.png";
import "../../../public/sass/pages/profile.scss";
import { Posts } from "./post";
import { useRouter } from "next/navigation";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const ProfileView = () => {
    const [value, setValue] = useState(0);
    const router = useRouter();

    const handleEditChanges = () => {
        router.push('/profile/edit')
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="profileview_section">
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div className="profile_header">
                        <div className="details_section">
                            <Grid container spacing={2}>
                                <Grid item xl={4} lg={3} md={3} sm={3} xs={12}>
                                    <div className="image_section">
                                        <Image src={Profile} alt="profile" />
                                    </div>
                                </Grid>
                                <Grid item xl={4} lg={8} md={12} sm={12} xs={12}>
                                    <div className="name_section">
                                        <div className="name_area">
                                            <Typography>David Winton</Typography>
                                        </div>
                                        <div className="email_area">
                                            <Typography>davidwinton234@gmail.com</Typography>
                                        </div>
                                        <div className="follow_area">
                                            <div className="follower_section">
                                                <div className="follow_icon">
                                                    <Image src={FollowerIcon} alt="Icon" />
                                                </div>
                                                <div className="follower_text">
                                                    <Typography>Followers</Typography>
                                                </div>
                                                <div className="follower_num">
                                                    <Typography>3458</Typography>
                                                </div>
                                            </div>
                                            <div className="follower_section">
                                                <div className="follow_icon">
                                                    <Image src={FollowerIcon} alt="Icon" />
                                                </div>
                                                <div className="follower_text">
                                                    <Typography>Following</Typography>
                                                </div>
                                                <div className="follower_num">
                                                    <Typography>73</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xl={1} lg={1} md={1} sm={1} xs={6}>
                                    <div className="edit_btn" onClick={handleEditChanges}>
                                        <Typography>Edit</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="desc_section">
                            <Typography>About</Typography>
                            <div className="about_area">
                                <Typography>Lorem ipsum dolor sit amet consectetur. Aenean ornare facilisis potenti amet consectetur nibh. Venenatis ut sed faucibus vitae sed cras faucibus risus habitasse. Diam facilisi porttitor et congue. Id hendrerit massa nascetur vivamus orci dignissim amet odio.</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="userview_section">
                        <div className="tab_section">
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="Profile" {...a11yProps(0)} />
                                <Tab label={`${8} Answers`} {...a11yProps(1)} />
                                <Tab label={`${6} Questions`} {...a11yProps(2)} />
                                <Tab label={`${6} Shares`} {...a11yProps(3)} />
                                <Tab label="Activity" {...a11yProps(4)} />
                            </Tabs>
                        </div>
                        <CustomTabPanel value={value} index={0}>
                            <Posts />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            Answers
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            Questions
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            Shares
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            Activities
                        </CustomTabPanel>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}