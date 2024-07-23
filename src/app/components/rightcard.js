'use client'
import { Grid, Container, Card, CardContent, Typography } from "@mui/material";
import Close from '@mui/icons-material/Close';
import '../../../public/sass/pages/card.scss';
import { KeyboardArrowRight, Pages } from '@mui/icons-material';
import { useState, useEffect} from "react";
import {getApi} from '@/helpers/General'


const RightCard = () => {
    const [cardContent, setCardContent] = useState([]);

    useEffect(() => {
        handleCardContent();
    }, []);

    const handleCardContent = async () => {
        try {
            let res = await getApi('/post/answer-post')
            const users = res.data;
            console.log(users, "answer");
            setCardContent(users);
        } catch (error) {
            console.error("Failed to fetch featured posts", error);
        }
    };

    // const cardContent = [
    //     {
    //         title: "Lorem ipsum dolor sit amet",
    //         icon: <Pages />,
    //         content: "Your answers and posts",
    //         description: "Lorem ipsum dolor sit amet consectetur. Turpis tortor"
    //     },
    //     {
    //         title: "Lorem ipsum dolor sit amet",
    //         icon: <Pages />,
    //         content: "Your answers and posts",
    //         description: "Lorem ipsum dolor sit amet consectetur. Turpis tortor"
    //     },
    // ]

    return (

        <div className="inner_parent">

            {cardContent && cardContent.length >= 0 ? (
            cardContent.map((text, index) => (
                <div className='carder' key={index}>
                    <div className='head'>
                        <Typography>
                            {text.post_id ? text.post_id.title : "Answer"}
                        </Typography>
                        <div className='icon'>
                            <Close />
                        </div>
                    </div>
                    <div className='description'>
                        <div className='des_left'>
                            {/* <div className='des_top'>
                                <div className="icon_area">
                                    {text.icon}
                                </div>
                                <Typography>{text.content}
                                </Typography>
                            </div> */}
                            <div className='des_bottom'>
                                <Typography>
                                    {text.post_id ? text.post_id.description : "Description"}
                                </Typography>
                            </div>
                        </div>
                        <div className='des_right'>
                            <KeyboardArrowRight />
                        </div>
                    </div>
                </div>
            ))):(
            <></>
            )}
        </div>
    );
};

export default RightCard;
