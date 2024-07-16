"use client";
import { Avatar, Button, Input, InputLabel, Typography } from "@mui/material";
import * as React from "react";
import "../../.././public/sass/pages/makepost.scss";
import { useState, useEffect } from "react";
import UploadIcon from "@mui/icons-material/UploadFile";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useRouter } from "next/navigation";
import axios from "axios";
import { validatorMake, foreach, postApi, getApi } from "../../helpers/General";
import { toast } from "react-toastify";

export const HelperText = ({ error }) => {
  return (
    <div
      className="helper_
    text_field"
    >
      <Typography>{error}</Typography>
    </div>
  );
};

export default function MakeAPost() {
  const [profileData, setprofileData] = useState({});

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const response = await getApi("/user/profile");
        console.log(response, "response");
        const { _id, first_name, last_name } = response.data;
        setprofileData({
          _id,
          first_name,
          last_name,
        });
        setFormData((prevData) => {
          return {
            ...prevData,
            user_id: _id,
          };
        });
      } catch (error) {
        console.log(error);
        toast.error("failed to get User Data");
      }
    };
    handleProfile();
  }, []);

  const router = useRouter();
  let defaultValue = {
    title: "",
    description: "",
    user_id: "",
    cat_id: "",
  };

  let [formData, setFormData] = useState(defaultValue);
  let [errors, setErrors] = useState(defaultValue);
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    postCategory();
  }, []);

  const postCategory = async () => {
    let res = await getApi("/post-category");
    setCategories(res.data); // Assume the API response has data in res.data
    console.log(res);
  };

  let handleInputChange = (e) => {
    let { name, value } = e.target;
    // setPreferences({
    //     ...preferences,
    //     [name]: value
    // });
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

    setErrors((prevData) => {
      return {
        ...prevData,
        [name]: null,
      };
    });
  };

  let handleErrors = (errors) => {
    foreach(errors, (index, item) => {
      setErrors((prevData) => {
        return {
          ...prevData,
          [index]: item[0],
        };
      });
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let validationRules = await validatorMake(formData, {
      title: "required",
      description: "required",
      user_id: "required",
      cat_id: "required",
    });

    if (!validationRules.fails()) {
      console.log(formData, "formData");
      let resp = await postApi("/post/add", formData);
      console.log(resp, "resp");
      if (resp.status) {
        // otp screen
        toast.success(resp.message);
        setFormData(defaultValue);

        router.push("/dashboard/explore");
      } else {
        if (typeof resp.message == "object") {
          handleErrors(resp.message.errors);
        } else {
          toast.error(resp.message);
        }
      }
      console.log(resp, "resp");
    } else {
      handleErrors(validationRules.errors.errors);
      console.log(validationRules.errors.errors);
    }
  };

  return (
    <div className="outer_container">
      <div className="add_question_heading">
        <Typography>Add Question</Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="profile">
          <div className="profile_section">
            <div className="profile_picture">
              <Avatar alt="Remy Sharp" src="/images/profile.jpg" />
            </div>
            <div className="profile_name">
              <Typography>
                {profileData.first_name + " " + profileData.last_name}
              </Typography>
            </div>
            <select
              className="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option
                name="type"
                value={formData.Public}
                onChange={handleInputChange}
              >
                Public
              </option>
              <option
                name="type"
                value={formData.Private}
                onChange={handleInputChange}
              >
                Private
              </option>
              <option
                name="type"
                value={formData.Personal}
                onChange={handleInputChange}
              >
                Personal
              </option>
            </select>
          </div>

          <div className="post_category">
            <div className="post_category_heading">
              <Typography>Post Category</Typography>
            </div>
            <select
              className="category"
              name="cat_id"
              value={formData.category}
              onChange={handleInputChange}
              // helperText={errors.type ? errors.type : ""}
            >
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  selected={formData.category == category._id ? true : false}
                  helperText={errors.type ? errors.type : ""}
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="ques_section">
          {/* <TextField
            required
            id="standard-required"
            label="Title"
            placeholder="Start your question with “What”, “How”, “Why”, etc."
            variant="standard"
          />
          <TextField
            required
            id="standard-required"
            label="Description"
            variant="standard"
            multiline
          /> */}
          <div className="ques_area">
            <InputLabel htmlFor="standard-description" required>
              Title
            </InputLabel>
            <Input
              id="standard-multiline-flexible"
              placeholder="Start your question with “What”, “How”, “Why”, etc."
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <HelperText error={errors.title ? errors.title : ""} />
          </div>
          <div className="ques_area">
            <InputLabel htmlFor="standard-description" required>
              Description
            </InputLabel>
            <Input
              id="standard-multiline-flexible"
              placeholder="Start your question with “What”, “How”, “Why”, etc."
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              // rows={6}
              multiline
            />
            <HelperText error={errors.description ? errors.description : ""} />
          </div>
        </div>
        <div className="attachment_container">
          <Typography>Attachment</Typography>
        </div>

        <div className="file_input_container">
          <div className="file_input_other_container ">
            <input type="file" multiple className="file_input" />
            <div className="file_input_icon">
              <UploadIcon />
              <Typography>Click to Upload or drag and drop</Typography>
              <Typography variant="body">
                SVG, PNG, JPG or GIF (max. 3MB)
              </Typography>
            </div>
          </div>
        </div>
        <div className="submit_button">
          <Button variant="contained" type="submit">
            Post Question
          </Button>
        </div>
      </form>
    </div>
  );
}
