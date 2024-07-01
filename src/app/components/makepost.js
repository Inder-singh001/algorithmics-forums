"use client";
import { Avatar, Button, Input, InputLabel, TextField } from "@mui/material";
import "../../.././public/sass/pages/makepost.scss";
import { useState, useEffect } from "react";
import UploadIcon from "@mui/icons-material/UploadFile";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LockPersonIcon from '@mui/icons-material/LockPerson';
const DropSelect = () => {
  const [selectedOption, setSelectedOption] = useState("Public");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // This effect runs when selectedOption changes
    console.log(`Selected option: ${selectedOption}`);
  }, [selectedOption]);

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <span>{selectedOption}</span>
        <ArrowDropDownIcon className="dropdown-arrow" />
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div onClick={() => handleOptionClick("Public")}><PeopleAltIcon/>Public</div>
          <div onClick={() => handleOptionClick("Private")}><Diversity3Icon/>Private</div>
          <div onClick={() => handleOptionClick("Personal")}><LockPersonIcon/>Personal</div>
        </div>
      )}
    </div>
  );
};

export default function MakeAPost() {
  return (
    <div className="outer_container">
      <div className="add_question_heading">
        <h2>Add Question</h2>
      </div>
      <div className="profile">
        <div className="profile_picture">
          <Avatar alt="Remy Sharp" src="/images/profile.jpg" />
        </div>
        <div className="profile_name">
          <p>John Doe</p>
        </div>
        <DropSelect />
      </div>
      <div className="makepost_detail">
        <div className="makepost_title">
          <InputLabel>Title</InputLabel>
          <Input placeholder="Title" className="makepost_title" type="text" />
        </div>
        <div className="makepost_description">
          <InputLabel>Description</InputLabel>
          <TextField
            placeholder="Description"
            fullWidth
            multiline
            type="text"
          />
        </div>
      </div>
      <div className="attachment_container">
        <InputLabel>Attachment</InputLabel>
      </div>

      <div className="file_input_container">
        <div className="file_input_other_container ">
          <input
            type="file"
            multiple
            className="file_input"
          />
          <div className="file_input_icon">
            <UploadIcon className="mui_icon"/>
            <p>Drag and drop files here</p>
          </div>
        </div>
      </div>
      <div className="submit_button">
        <button className="make_post">Make a post</button>
      </div>
    </div>
  );
}
