"use client";
import {
  Avatar,
  Button,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import "../../.././public/sass/pages/makepost.scss";
import { useState, useEffect } from "react";
import UploadIcon from "@mui/icons-material/UploadFile";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Description } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useRouter } from "next/navigation";
import axios from "axios";
import { validatorMake, foreach, postApi } from "../../helpers/General";
import { toast } from "react-toastify";

// const DropSelect = ({ selectedOption, setSelectedOption }) => {
//   // const [selectedOption, setSelectedOption] = useState("Public");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setIsDropdownOpen(false);
//   };

//   useEffect(() => {
//     // This effect runs when selectedOption changes
//     console.log(`Selected option: ${selectedOption}`);
//   }, [selectedOption]);

//   return (
//     <div className="dropdown-container">
//       <button className="dropdown-button" onClick={toggleDropdown}>
//         <span>{selectedOption}</span>
//         <ArrowDropDownIcon className="dropdown-arrow" />
//       </button>
//       {isDropdownOpen && (
//         <div className="dropdown-menu">
//           <div onClick={() => handleOptionClick("Public")}>
//             <PeopleAltIcon />
//             Public
//           </div>
//           <div onClick={() => handleOptionClick("Private")}>
//             <Diversity3Icon />
//             Private
//           </div>
//           <div onClick={() => handleOptionClick("Personal")}>
//             <LockPersonIcon />
//             Personal
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const CategoryDropSelect = ({ selectedCategory, setSelectedCategory }) => {
//   // const [selectedCategory, setSelectedCategory] = useState("Technology");
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
//   };

//   const handleCategoryOptionClick = (category) => {
//     setSelectedCategory(category);
//     setIsCategoryDropdownOpen(false);
//   };

//   useEffect(() => {
//     // This effect runs when selectedOption changes
//     console.log(`Selected category: ${selectedCategory}`);
//   }, [selectedCategory]);

// const postCategory = [
//   {
//     key: 1,
//     name: "Technology",
//     title: "Technology",
//   },
//   {
//     key: 2,
//     name: "Science",
//     title: "Science",
//   },
//   {
//     key: 3,
//     name: "Design",
//     title: "Design",
//   },
//   {
//     key: 4,
//     name: "Books",
//     title: "Books",
//   },
//   {
//     key: 5,
//     name: "Travel",
//     title: "Travel",
//   },
//   {
//     key: 6,
//     name: "Health",
//     title: "Health",
//   },
//   {
//     key: 7,
//     name: "Career",
//     title: "Career",
//   },
//   {
//     key: 8,
//     name: "Food",
//     title: "Food",
//   },
//   {
//     key: 9,
//     name: "Cricket",
//     title: "Cricket",
//   },
//   {
//     key: 10,
//     name: "Hobbies",
//     title: "Hobbies",
//   },
//   {
//     key: 11,
//     name: "Movies",
//     title: "Movies",
//   },
//   {
//     key: 12,
//     name: "Vacations",
//     title: "Vacations",
//   },
//   {
//     key: 13,
//     name: "Sports",
//     title: "Sports",
//   },
//   {
//     key: 14,
//     name: "IT",
//     title: "IT",
//   },
//   {
//     key: 15,
//     name: "Shopping",
//     title: "Shopping",
//   },
// ];
// console.log(postCategory.title);
//   return (
//     <div className="dropdown-container">
//       <button className="dropdown-button" onClick={toggleCategoryDropdown}>
//         <span>{selectedCategory}</span>
//         <ArrowDropDownIcon className="dropdown-arrow" />
//       </button>
//       {isCategoryDropdownOpen && (
//         <div className="dropdown-menu">
//           {postCategory.map((category) => (
//             <div
//               key={category.key}
//               onClick={() => handleCategoryOptionClick(`${category.title}`)}
//             >
//               {category.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export default function MakeAPost() {
  const router = useRouter();
  let defaultValue = {
    title: "",
    description: "",
    // type: "",
    // cat_id: "",
  };

  const postCategory = [
    {
      key: 1,
      name: "Technology",
      title: "Technology",
    },
    {
      key: 2,
      name: "Science",
      title: "Science",
    },
    {
      key: 3,
      name: "Design",
      title: "Design",
    },
    {
      key: 4,
      name: "Books",
      title: "Books",
    },
    {
      key: 5,
      name: "Travel",
      title: "Travel",
    },
    {
      key: 6,
      name: "Health",
      title: "Health",
    },
    {
      key: 7,
      name: "Career",
      title: "Career",
    },
    {
      key: 8,
      name: "Food",
      title: "Food",
    },
    {
      key: 9,
      name: "Cricket",
      title: "Cricket",
    },
    {
      key: 10,
      name: "Hobbies",
      title: "Hobbies",
    },
    {
      key: 11,
      name: "Movies",
      title: "Movies",
    },
    {
      key: 12,
      name: "Vacations",
      title: "Vacations",
    },
    {
      key: 13,
      name: "Sports",
      title: "Sports",
    },
    {
      key: 14,
      name: "IT",
      title: "IT",
    },
    {
      key: 15,
      name: "Shopping",
      title: "Shopping",
    },
  ];
  console.log(postCategory.title);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let [formData, setFormData] = useState(defaultValue);
  let [errors, setErrors] = useState(defaultValue);


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
      // type: "required",
      // cat_id: "required",
    });

    if (!validationRules.fails()) {
      console.log(formData, "formData");
      let resp = await postApi("/post/add", formData);

      if (resp.status) {
        // otp screen
        toast.success(resp.message);
        setFormData(defaultValue);
        // getToken(tokenName.LOGIN_TOKEN, resp.data.login_token);
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
              <Typography>John Doe</Typography>
            </div>

            <div class="type">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <PeopleAltIcon fontSize="small" />
                Public
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuList>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PeopleAltIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Public</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Diversity3Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Private</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <LockPersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Personal</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>

          <div className="post_category">
            <div className="post_category_heading">
              <Typography>Post Category</Typography>
            </div>
            <select
              className="category"
              value={formData.category}
              onChange={handleInputChange}
              helperText={errors.type ? errors.type : ""}
            >
              {postCategory.map((category) => (
                <option
                  key={category.key}
                  value={formData.category}
                  onChange={() => handleInputChange(`${category.title}`)}
                  helperText={errors.type ? errors.type : ""}
                >
                  {category.name}
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
              helperText={errors.title ? errors.title : ""}
            />
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
              helperText={errors.description ? errors.description : ""}
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
