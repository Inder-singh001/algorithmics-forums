'use client'
import { Typography } from "@mui/material";
import Close from '@mui/icons-material/Close';
import '../../../public/sass/pages/card.scss';
import { KeyboardArrowRight, Pages } from '@mui/icons-material';
import { useState, useEffect} from "react";
import {getApi} from '@/helpers/General'
import { toast } from "react-toastify";


const RightCard = () => {
    const [cardContent, setCardContent] = useState([]);

    useEffect(() => {
        handleCardContent();
    }, []);

    const handleCardContent = async () => {
        try {
            let res = await getApi('/post/answer-post')
            const users = res.data;
            setCardContent(users);
        } catch (error) {
            toast.error("Failed to fetch featured posts", error);
        }
    };

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
