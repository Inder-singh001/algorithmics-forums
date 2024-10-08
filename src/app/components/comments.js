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

    const [userComments, setUserComments] = useState(post.comments ? post.comments : []);
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [downvoteCount, setDownvoteCount] = useState(0);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    console.log(userComments,"userComments")
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

    return (
        <div className="comments_section">
            <InputComment 
                post={post}
                setUserComments={setUserComments} />
            {userComments.map((comment, index) => {
                let user = comment.user ? comment.user : (comment.user_id && typeof comment.user_id == 'object' ? comment.user_id : {} )
                return <div key={index} className="comment_user">
                        <div className='user_pic_area'>
                            <Image src={AvatarImg} alt={`${user.first_name}" "${user.last_name}`}/>
                        </div>
                        <div className='user_profile'>
                            <div className='user_area'>
                                <div className='user_name'>
                                    <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
                                </div>
                                <div className='time_commented' >
                                    <Typography >
                                        8mo
                                    </Typography>
                                </div>
                            </div>
                            <div className='subcomment_area'>
                                <Typography>{comment.description}</Typography>
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
                                {/* <div className='reply_btn'>
                                    <Typography>Reply</Typography>
                                </div> */}
                            </div>
                        </div>
                    </div>
            })}
        </div >
    )
}
export default Comments

export const InputComment = ({ post, setUserComments }) => {
    let postData = {
        post_id: post._id,
        description: ''
    }

    const [commentData, setCommentData] = useState(postData);
    const [errors, setErrors] = useState(postData)

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
                setUserComments((oldData) => {
                    return [
                        ...oldData,
                        postComment.data
                    ]
                })
                console.log(postComment.data,"postComment")
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
    )
}