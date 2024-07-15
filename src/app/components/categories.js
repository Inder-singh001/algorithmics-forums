'use client'
import { Modal, Typography } from "@mui/material"
import "../../../public/sass/pages/categories.scss"
import Button from '@mui/material/Button';
import { useState, useEffect } from "react"
import { tags } from "@/helpers/catgory";



const Categories = ({ open, handleClose, preferences }) => {
    //Modal Props
    const [localPreferences, setLocalPreferences] = useState(preferences);
    useEffect(() => {
        setLocalPreferences(preferences);
    }, [preferences]);

    //Validations 
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

    let handleSubmit = async (e) => {
        let formData
        e.preventDefault()
        let validationRules = await validatorMake(formData, {
            "user_id": "required",
            "cat_id": "required",
        })


        if (!validationRules.fails()) {
            let resp = await postApi('/user-category/add', formData)
            if (resp.status) {
                toast.success(resp.message)
                setFormData(defaultValue);
                handleClose();
                // setToken(tokenName.OTP_TOKEN, resp.data.token)
                // setValue("preference", getHash(64))
                // router.push('/auth/otp-verification')
            }
            else {
                if (typeof resp.message == 'object') {
                    handleErrors(resp.message.errors)
                }
                else {
                    toast.error(resp.message)
                }
            }
        }
        else {
            handleErrors(validationRules.errors.errors)
            console.log(validationRules.errors.errors)
        }
    }




    //tags mapped
    const [selectedTags, setSelectedTags] = useState([]);
    const handleSelectTag = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((t) => t !== tag)
                : [...prevSelectedTags, tag]
        );
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className="categories_area">
                <div className="tags_section">
                    <Typography>Select the Topics you would like to see in your feed.</Typography>
                    <div className="tags_list">
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className={`tags ${selectedTags.includes(tag) ? "selected" : ""}`}
                                onClick={() => handleSelectTag(tag)}

                            >
                                <Typography variant="subtitle1">{tag.title}</Typography>
                            </div>
                        ))}
                    </div>
                    <div className="btn_area">
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </Modal >

    )
}
export default Categories