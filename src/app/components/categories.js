'use client'
import { Container, Grid, Modal, Typography } from "@mui/material"
import "../../../public/sass/pages/categories.scss"
import Button from '@mui/material/Button';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";



const Categories = ({ open, handleClose, preferences }) => {
    //Modal Props
    const [localPreferences, setLocalPreferences] = useState(preferences);

    useEffect(() => {
        setLocalPreferences(preferences);
    }, [preferences]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLocalPreferences({
            ...localPreferences,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Update preferences here if needed
        handleClose();
    };

    // const router = useRouter()
    // const handleModal = () => {
    //     router.push('/dashboard/explore')
    // }

    const [selectedTags, setSelectedTags] = useState([]);

    const handleSelectTag = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((t) => t !== tag)
                : [...prevSelectedTags, tag]
        );
    };
    const tags = ["Technology", "Science", "Design", "Books", "Travel", "Health", "Career", "Food", "Cricket", "Engineering", "Movies", "Vacation", "Sports", "Mathematics", "Technology", "Science", "Design", "Books", "Travel", "Health", "Career", "Food", "Cricket", "Engineering", "Movies", "Vacation", "Sports", "Mathematics", "Technology", "Science", "Design", "Books", "Travel", "Health", "Career", "Food", "Cricket", "Engineering", "Movies", "Vacation", "Sports", "Mathematics", "Technology", "Science", "Design", "Books", "Travel", "Health", "Career", "Food", "Cricket", "Engineering", "Movies", "Vacation", "Sports", "Mathematics"];

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
                                onChange={handleChange}
                                value={localPreferences.preference || ''}
                            >
                                <Typography variant="subtitle1">{tag}</Typography>
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