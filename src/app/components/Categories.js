'use client'
import { Container, Grid, Typography } from "@mui/material"
import "../../../public/sass/pages/categories.scss"
import Button from '@mui/material/Button';
import { useState } from "react"



const Categories = () => {
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSelectTag = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((t) => t !== tag)
                : [...prevSelectedTags, tag]
        );
    };
    const tags = ["Technology", "Science", "Design", "Books", "Travel", "Health", "Career", "Food", "Cricket", "Engineering", "Movies", "Vacation", "Sports", "Mathematics"];

    return (
        <div className="categories_section">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                                            <Typography variant="subtitle1">{tag}</Typography>
                                        </div>
                                    ))}
                                </div>
                                <div className="btn_area">
                                    <Button variant="contained">Submit</Button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default Categories