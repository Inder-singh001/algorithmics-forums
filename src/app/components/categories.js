'use client'
import { Modal, Typography } from "@mui/material"
import "../../../public/sass/pages/categories.scss"
import Button from '@mui/material/Button';
import { useState, useEffect } from "react"
import { validatorMake, foreach, postApi, getApi } from '@/helpers/General'
import { toast } from "react-toastify";


const Categories = ({ open, handleClose, preferences }) => {

    //GetCategory Data
    const [categoryData, setCategoryData] = useState([])
    let getCategoryData = async () => {
        let res = await getApi('/post-category')
        if (res) {
            setCategoryData(res.data)
        }
        else {
            console.error("No data found");
        }
    }

    //Modal Props
    const [localPreferences, setLocalPreferences] = useState(preferences);
    useEffect(() => {
            setLocalPreferences(preferences),
                getCategoryData()
    }, [preferences, handleClose]);

    //Validations 
    let handleSubmit = async (e) => {
        e.preventDefault()
        const cat_id = selectedTags
        console.log("Selected Tags (cat_id):", cat_id);

        if (cat_id.length < 5) toast.error("Select minimum 5 topics of your interests.")

        let validationRules = await validatorMake({ cat_id }, {
            "cat_id": "required|array|min:5"
        })

        if (!validationRules.fails()) {
            let resp = await postApi('/user-category/add', { cat_id })

            if (resp.status) {
                toast.success(resp.message)
                setSelectedTags([])
                handleClose();
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

    //handling errors
    let [errors, setErrors] = useState()    
    let handleErrors = (errors) => {
        foreach(errors, (index, item) => {
            setErrors((prevData) => {
                return {
                    ...prevData,
                    [index]: item[0]
                }
            })
        })
    }

    //tags mapped
    const [selectedTags, setSelectedTags] = useState([]);
    const handleSelectTag = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag._id)
                ? prevSelectedTags.filter((t) => t !== tag._id)
                : [...prevSelectedTags, tag._id]
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
                    <form onSubmit={handleSubmit}>
                        {categoryData ? (
                            <ul className="tags_list">
                                {categoryData.map((tag) => (
                                    <li
                                        key={tag._id}
                                        className={`tags ${selectedTags.includes(tag._id) ? "selected" : ""}`}
                                        onClick={() => handleSelectTag(tag)}

                                    >
                                        <Typography variant="subtitle1">{tag.title}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (<></>)}
                        {selectedTags.length > 0 && (
                            <div className="btn_area">
                                <Button variant="contained" type="Submit">Submit</Button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </Modal >

    )
}
export default Categories