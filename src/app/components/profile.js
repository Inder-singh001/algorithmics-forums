"use client";
import { useState, useEffect } from "react";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import Image from "next/image";

import PropTypes from "prop-types";
import Profile from "../../../public/images/profile_pic.png";
import FollowerIcon from "../../../public/images/FollowIcon.png";
import "../../../public/sass/pages/profile.scss";
import "../../../public/sass/pages/profile.scss";
import { Posts } from "./post";
import { useRouter } from "next/navigation";
import { validatorMake, foreach, getApi, getHash } from "../../helpers/General";
import { toast } from "react-toastify";
import { setToken, setValue, tokenName } from "@/dataCenter/LocalStorage";
import AccordionExpand from "./user_comments";

const CustomTabPanel = ({ children, value, index, ...other }) => (
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ProfileView = () => {
  useEffect(() => {
    handleProfile(),
      handleFriend(),
      getPostData()
  }, []);

  const [value, setValue] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [friendData, setfriendData] = useState({});
  const router = useRouter();

  // get User Post Data
  const [postData, setPostData] = useState([]);

  const getPostData = async () => {
    let res = await getApi("/user/post");
    const postdata = res.data;
    if (postdata) {
      setPostData(postdata);
    } else {
      console.log([]);
    }
  };

  const handleFriend = async () => {
    try {
      const friend = await getApi("/user/profile");
      // Map the response data to the frontend
      const { followers, following } = friend;
      setfriendData({
        followers,
        following,
      });
    } catch (error) {
      toast.error("Failed to fetch profile data");
    }
  };

  const handleProfile = async () => {
    try {
      const response = await getApi("/user/profile");
      // Map the response data to the frontend
      const { first_name, last_name, email, about_me } = response.data;
      setProfileData({
        first_name,
        last_name,
        email,
        about_me,
      });
    } catch (error) {
      toast.error("Failed to fetch profile data");
    }
  };

  const handleEditChanges = () => {
    router.push("/profile/edit");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="profileview_section">
      <div className="profile_header">
        <div className="details_section">
          <div className="image_section">
            <Image src={Profile} alt="profile" />
          </div>
          <div className="name_section">
            <div className="name_area">
              <Typography>
                {profileData.first_name + " " + profileData.last_name}
              </Typography>
            </div>
            <div className="email_area">
              <Typography>{profileData.email}</Typography>
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
                  <Typography>{`${friendData.followers}`}</Typography>
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
                  <Typography>{friendData.following}</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="edit_btn" onClick={handleEditChanges}>
          <Typography>Edit</Typography>
        </div>
        <div className="desc_section">
          <Typography>About</Typography>
          <div className="about_area">
            <Typography>{profileData.about_me}</Typography>
          </div>
        </div>
      </div>
      <div className="userview_section">
        <div className="tab_section">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label={`${8} Answers`} {...a11yProps(1)} />
            <Tab label={`${6} Questions`} {...a11yProps(2)} />
            <Tab label={`${6} Shares`} {...a11yProps(3)} />
            <Tab label="Activity" {...a11yProps(4)} />
          </Tabs>
        </div>
        <CustomTabPanel value={value} index={0}>
          {postData ? (
            postData.map((post) => (
              <Posts post={post} key={post._id} />
            ))
          ) : (
            <div>Haven't Posted a Question</div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Answers
          <AccordionExpand />
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
    </div>
  );
};
