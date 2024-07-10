"use client";
import { Avatar, Button, Input, InputLabel, TextField, Typography } from "@mui/material";
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
          <div onClick={() => handleOptionClick("Public")}><PeopleAltIcon />Public</div>
          <div onClick={() => handleOptionClick("Private")}><Diversity3Icon />Private</div>
          <div onClick={() => handleOptionClick("Personal")}><LockPersonIcon />Personal</div>
        </div>
      )}
    </div>
  );
};

export default function MakeAPost() {
  return (
    <div className="outer_container">
      <div className="add_question_heading">
        <Typography>Add Question</Typography>
      </div>
      <div className="profile">
        <div className="profile_picture">
          <Avatar alt="Remy Sharp" src="/images/profile.jpg" />
        </div>
        <div className="profile_name">
          <Typography>John Doe</Typography>
        </div>
        <DropSelect />
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
          <InputLabel htmlFor="standard-description" required>Title</InputLabel>
          <Input
            id="standard-multiline-flexible"
            placeholder="Start your question with “What”, “How”, “Why”, etc."
          />
        </div>
        <div className="ques_area">
          <InputLabel htmlFor="standard-description" required>Description</InputLabel>
          <Input
            id="standard-multiline-flexible"
            placeholder="Start your question with “What”, “How”, “Why”, etc."
            // rows={6}
            multiline
          />
        </div>
      </div>
      <div className="attachment_container">
        <Typography>Attachment</Typography>
      </div>

      <div className="file_input_container">
        <div className="file_input_other_container ">
          <input
            type="file"
            multiple
            className="file_input"
          />
          <div className="file_input_icon">
            <UploadIcon />
            <Typography>Click to Upload or drag and drop
            </Typography>
            <Typography variant="body">
              SVG, PNG, JPG or GIF (max. 3MB)</Typography>
          </div>
        </div>
      </div>
      <div className="submit_button">
        <Button variant="contained">Post Question</Button>
      </div>
    </div>
  );
}
