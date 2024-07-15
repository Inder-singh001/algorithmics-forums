"use client";
import { Avatar, Button, Input, InputLabel, Typography } from "@mui/material";
import "../../.././public/sass/pages/makepost.scss";
import { useState } from "react";
import UploadIcon from "@mui/icons-material/UploadFile";
import { useRouter } from "next/navigation"; // Next.js hook for navigation
import { validatorMake, foreach, postApi } from "../../helpers/General"; // Importing custom helper functions
import { toast } from "react-toastify"; // For toast notifications
import { getToken, tokenName } from "@/dataCenter/LocalStorage"; // Importing functions for local storage operations

// Reusable error message component
const ErrorMessage = ({ message }) => (
  <Typography color="error" variant="body2">
    {message}
  </Typography>
);

export default function MakeAPost() {
  const router = useRouter(); // Initializing the router

  // Default form values
  const defaultValue = {
    title: "",
    description: "",
    type: "",
    // category_id: "",
  };

  // State for form data
  const [formData, setFormData] = useState(defaultValue);

  // State for form errors
  const [errors, setErrors] = useState(defaultValue);

  // Handle input change event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors for the current field
    setErrors((prevData) => ({
      ...prevData,
      [name]: null,
    }));
  };

  // Handle errors and update state
  const handleErrors = (errors) => {
    foreach(errors, (index, item) => {
      setErrors((prevData) => ({
        ...prevData,
        [index]: item[0],
      }));
    });
  };

  // Handle form submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    const validationRules = await validatorMake(formData, {
      title: "required",
      description: "required",
      type: "required",
      // category_id: "required",
    });

    if (!validationRules.fails()) {
      try {
        // Submit form data to the server
        const resp = await postApi("/post/add", formData);
        if (resp.status) {
          toast.success(resp.message); // Show success message
          setFormData(defaultValue); // Reset form data
          getToken(tokenName.LOGIN_TOKEN, resp.data.login_token); // Save token to local storage
          router.push("/dashboard/explore");
        } else {
          toast.error("Failed to Post"); // Show error message
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } else {
      handleErrors(validationRules.errors.errors); // Handle validation errors
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
          <div className="profile_picture">
            <Avatar alt="Remy Sharp" src="/images/profile.jpg" />
          </div>
          <div className="profile_name">
            <Typography>John Doe</Typography>
          </div>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select type
            </option>
            <option
              name="type"
              value={formData.Volvo}
              onChange={handleInputChange}
            >
              Volvo
            </option>
            <option
              name="type"
              value={formData.Saab}
              onChange={handleInputChange}
            >
              Saab
            </option>
            <option
              name="type"
              value={formData.Opel}
              onChange={handleInputChange}
            >
              Opel
            </option>
            <option
              name="type"
              value={formData.Audi}
              onChange={handleInputChange}
            >
              Audi
            </option>
          </select>
          {errors.type && <ErrorMessage message={errors.type} />}
        </div>

        <div className="ques_section">
          <div className="ques_area">
            <InputLabel htmlFor="title" required>
              Title
            </InputLabel>
            <Input
              id="title"
              placeholder="Start your question with “What”, “How”, “Why”, etc."
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errors.title && <ErrorMessage message={errors.title} />}
          </div>
          <div className="ques_area">
            <InputLabel htmlFor="description" required>
              Description
            </InputLabel>
            <Input
              id="description"
              placeholder="Provide a detailed description of your question."
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
            />
            {errors.description && (
              <ErrorMessage message={errors.description} />
            )}
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
