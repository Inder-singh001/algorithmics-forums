'use client'
import { useState } from 'react';
import { validatorMake, foreach, postApi } from '@/helpers/General'
import Image from "next/image";
import { Button, IconButton, Input, InputAdornment, Typography } from "@mui/material";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import AvatarImg from "../../../public/images/avatar.png"
import Comment from "../../../public/images/comments.png"
import NotVoted from "../../../public/images/unselect.png"
import Voted from "../../../public/images/select.png"
import "../../../public/sass/dashboard/comment.scss"

const Comments = ({ post }) => {

    let postData = {
        post_id: post._id,
        description: ''
    }

    const [upvoteCount, setUpvoteCount] = useState(0);
    const [downvoteCount, setDownvoteCount] = useState(0);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [commentData, setCommentData] = useState(postData);
    const [errors, setErrors] = useState(postData)

    const handleUpvote = () => {
        if (upvoted) {
            setUpvoteCount(upvoteCount - 1);
            setUpvoted(false);
        } else {
            setUpvoteCount(upvoteCount + 1);
            setUpvoted(true);
            if (downvoted) {
                setDownvoteCount(downvoteCount - 1);
                setDownvoted(false);
            }
        }
    };

    const handleDownvote = () => {
        if (downvoted) {
            setDownvoteCount(downvoteCount - 1);
            setDownvoted(false); //true for continuous voting
        } else {
            setDownvoteCount(downvoteCount + 1);
            setDownvoted(true);
            if (upvoted) {
                setUpvoteCount(upvoteCount - 1);
                setUpvoted(false);
            }
        }
    };

    //Comments Api
    const handleComment = async (e) => {
        e.preventDefault()
        let validationRules = await validatorMake(commentData, {
            "post_id": "required",
            "description": "required"
        })

        if (!validationRules.fails()) {
            let postComment = await postApi('/post-comments/add-comments', commentData)
            if (postComment.status) {
                setCommentData(postData);
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

    let handleInputChange = (e) => {
        let { name, value } = e.target
        setCommentData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })

        setErrors((prevData) => {
            return {
                ...prevData,
                [name]: null
            }
        })
    }

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


    return (
        <div className="comments_section">
            <form onSubmit={handleComment}>
                <div className="comment_input">
                    <Input
                        id="standard-adornment-password"
                        placeholder="Comment Here...."
                        name="description"
                        value={commentData.description}
                        onChange={handleInputChange}
                        multiline
                        startAdornment={
                            <InputAdornment position="start">
                                <Image src={Comment} alt='comment icon' />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton type='Submit'>
                                    <ArrowDownwardRoundedIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
            </form>
            <div className="comment_user">
                <div className='user_pic_area'>
                    <Image alt="Pablo Graces" src={AvatarImg} />
                </div>
                <div className='user_profile'>
                    <div className='user_area'>
                        <div className='user_name'>
                            <Typography>Pablo Graces</Typography>
                        </div>
                        <div className='time_commented' >
                            <Typography >
                                8mo
                            </Typography>
                        </div>
                    </div>
                    <div className='subcomment_area'>
                        <Typography>Lorem ipsum dolor sit amet</Typography>
                    </div>
                    <div className='vote_section'>
                        <div className='vote_icons'>
                            <div className='vote_area dashed'>
                                <div className={`vote_icon ${!upvoted ? "unselected" : ""}`} onClick={handleUpvote}>
                                    <Image src={upvoted ? Voted : NotVoted} alt='upvote' />
                                </div>
                                <div className={`vote_num ${upvoted ? "selected" : ""}`} >
                                    <Typography>{upvoteCount}</Typography>
                                </div>
                            </div>
                            <div className='vote_area'>
                                <div className={`vote_icon ${downvoted ? "selected" : ""}`} onClick={handleDownvote}>
                                    <Image src={downvoted ? Voted : NotVoted} alt='upvote' />
                                </div>
                                <div className={`vote_num ${downvoted ? "selected" : ""}`}>
                                    <Typography>{downvoteCount}</Typography>
                                </div>
                            </div>
                        </div>
                        <div className='reply_btn'>
                            <Typography>Reply</Typography>
                        </div>
                    </div>
                    <div className="comment_user">
                        <div className='user_pic_area'>
                            <Image alt="Pablo Graces" src={AvatarImg} />
                        </div>
                        <div className='user_profile'>
                            <div className='user_area'>
                                <div className='user_name'>
                                    <Typography>Pablo Graces</Typography>
                                </div>
                                <div className='time_commented' >
                                    <Typography >
                                        8mo
                                    </Typography>
                                </div>
                            </div>
                            <div className='subcomment_area'>
                                <Typography>Lorem ipsum dolor sit amet</Typography>
                            </div>
                            <div className='vote_section'>
                                <div className='vote_icons'>
                                    <div className='vote_area dashed'>
                                        <div className={`vote_icon ${!upvoted ? "unselected" : ""}`} onClick={handleUpvote}>
                                            <Image src={upvoted ? Voted : NotVoted} alt='upvote' />
                                        </div>
                                        <div className={`vote_num ${upvoted ? "selected" : ""}`} >
                                            <Typography>{upvoteCount}</Typography>
                                        </div>
                                    </div>
                                    <div className='vote_area'>
                                        <div className={`vote_icon ${downvoted ? "selected" : ""}`} onClick={handleDownvote}>
                                            <Image src={downvoted ? Voted : NotVoted} alt='upvote' />
                                        </div>
                                        <div className={`vote_num ${downvoted ? "selected" : ""}`}>
                                            <Typography>{downvoteCount}</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className='reply_btn'>
                                    <Typography>Reply</Typography>
                                </div>
                            </div>
                            <div className='reply_ques'>
                                <Typography>Lorem ipsum dolor sit amet consectetur. Eget pulvinar dictum eget nunc enim auctor.</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="comment_user">
                        <div className='user_pic_area'>
                            <Image alt="Pablo Graces" src={AvatarImg} />
                        </div>
                        <div className='user_profile'>
                            <div className='user_area'>
                                <div className='user_name'>
                                    <Typography>Pablo Graces</Typography>
                                </div>
                                <div className='time_commented' >
                                    <Typography >
                                        8mo
                                    </Typography>
                                </div>
                            </div>
                            <div className='subcomment_area'>
                                <Typography>Lorem ipsum dolor sit amet</Typography>
                            </div>
                            <div className='vote_section'>
                                <div className='vote_icons'>
                                    <div className='vote_area dashed'>
                                        <div className={`vote_icon ${!upvoted ? "unselected" : ""}`} onClick={handleUpvote}>
                                            <Image src={upvoted ? Voted : NotVoted} alt='upvote' />
                                        </div>
                                        <div className={`vote_num ${upvoted ? "selected" : ""}`} >
                                            <Typography>{upvoteCount}</Typography>
                                        </div>
                                    </div>
                                    <div className='vote_area'>
                                        <div className={`vote_icon ${downvoted ? "selected" : ""}`} onClick={handleDownvote}>
                                            <Image src={downvoted ? Voted : NotVoted} alt='upvote' />
                                        </div>
                                        <div className={`vote_num ${downvoted ? "selected" : ""}`}>
                                            <Typography>{downvoteCount}</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className='reply_btn'>
                                    <Typography>Reply</Typography>
                                </div>
                            </div>
                            <div className='reply_ques'>
                                <Typography>Lorem ipsum dolor sit amet consectetur. Eget pulvinar dictum eget nunc enim auctor.</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='more_replies'>
                <Typography>View More replies</Typography>
            </div>

        </div>
    )
}
export default Comments