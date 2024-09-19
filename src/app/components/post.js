"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { validatorMake, postApi } from '@/helpers/General'
import AvatarImg from "../../../public/images/avatar.png";
import Badge from "@mui/material/Badge";
import AvatarGroup from "@mui/material/AvatarGroup";
import "../../../public/sass/dashboard/post.scss";
import Image from "next/image";
import PostImage from "../../../public/images/Image.png";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import NotVoted from "../../../public/images/unselect.png";
import Voted from "../../../public/images/select.png";
import Comment from "../../../public/images/comments.png";
import Share from "../../../public/images/share.png";
import Options from "../../../public/images/threedots.png";
import Comments from "./comments";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const Posts = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(post.up_votes_count >=0 ? (post.up_votes ? post.up_votes.count : 0) : 0);
    const [downvoteCount, setDownvoteCount] = useState(post.down_votes_count >=0 ? (post.down_votes ? post.down_votes.count : 0) : 0);
    const [commentCount, setCommentCount] = useState("");
    const [upvoted, setUpvoted] = useState(post.user_vote  && post.user_vote.type ? true : false);
    const [downvoted, setDownvoted] = useState(post.user_vote  && post.user_vote.type == 0 ? true : false);
    const [follow, setFollow] = useState(false);



    let name = post.user.first_name + " " + post.user.last_name;

    const handleVote = async (type) => {

        let voteData = {
            post_id: post._id,
            type: type,
        };
        
        let validationRules = await validatorMake(voteData, {
            post_id: "required",
            type: "required",
        });

        if (!validationRules.fails()) {
            try
            {
                let resp = await postApi("/post-vote/insert", voteData);
                if (resp) 
                {
                    console.log(resp.userAction)
                    // Update local state based on the vote type
                    setUpvoteCount(resp.count.upCount);
                    setDownvoteCount(resp.count.downCount);
                    setUpvoted(resp.userAction.isUserUpVote ? true : false);
                    setDownvoted(resp.userAction.isUserDownVote ? true : false);
                } 
                else
                {
                    if (typeof resp.message === "object")
                    {
                        handleErrors(resp.message.errors);
                    }
                    else
                    {
                        toast.error(resp.message || "An unexpected error occurred.");
                    }
                }
            } catch (error)
            {
                console.error("Error during API call:", error);

                //     if (error.response) {
                //       // Server responded with a status other than 200 range
                //       toast.error(
                //         `Server Error: ${error.response.status} - ${
                //           error.response.data.message || error.response.statusText
                //         }`
                //       );
                //     } else if (error.request) {
                //       // No response was received
                //       toast.error(
                //         "Network Error: No response received from the server. Please check your internet connection."
                //       );
                //     } else {
                //       // Something happened in setting up the request
                //       toast.error(`Error: ${error.message}`);
                //     }
            }
        }
        else{
            handleErrors(validationRules.errors.errors);
            console.log(validationRules.errors.errors);
        }
    };

    const handleUpvote = () => {
        handleVote(1);
    };

    const handleDownvote = () => {
        handleVote(0);
    };
    
    const handleFollowing = () => {
        if (follow) {
            setFollow(false);
        } else setFollow(true);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            backgroundColor: "#2e69ff",
            color: "#ffffff",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            "&::after": {
                position: "absolute",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                animation: "ripple 1.2s infinite ease-in-out",
                border: "1px solid currentColor",
                content: '""',
            },
        },
        "@keyframes ripple": {
            "0%": {
                transform: "scale(.8)",
                opacity: 1,
            },
            "100%": {
                transform: "scale(2.4)",
                opacity: 0,
            },
        },
    }));

    return (
        <div className="postshow_section">
            <Card>
                <div className="cardHeader">
                    <div className="avatar_area">
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar alt={`${name}`} src={AvatarImg} />
                        </StyledBadge>
                    </div>
                    <div className="profile_text">
                        <div className="title_area">
                            <div className="title_text">
                                <Typography>{`${name}`}</Typography>
                            </div>
                            <div className="btn_text">
                                <Typography onClick={handleFollowing}>
                                    {follow ? "Following" : "Follow"}
                                </Typography>
                            </div>
                        </div>
                        <div className="subtext_area">
                            <div className="sub_text">
                                <Typography>Product Designer at XYZ</Typography>
                            </div>
                            <div className="time_update">
                                <Typography>Uppdated yesterday</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <CardContent>
                    <div className="post_content">
                        <Typography variant="h4">{post.title}</Typography>
                        <Typography variant="body2">{post.description}</Typography>
                    </div>
                </CardContent>
                <div className="media_content">
                    <Image src={PostImage} alt="ques image" />
                </div>
                <CardActions disableSpacing>
                    <div className="reaction_section">
                        <div className="avatars_area">
                            <AvatarGroup max={3}>
                                <Avatar alt="Remy Sharp" src="/static/images/user.png" />
                                <Avatar alt="Travis Howard" src="/static/images/user.png" />
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar
                                    alt="Trevor Henderson"
                                    src="/static/images/avatar/5.jpg"
                                />
                            </AvatarGroup>
                        </div>
                        <div className="user_area">
                            <Typography>Pablo Garces and Pete Lada upvoted this</Typography>
                        </div>
                        <div className="time_area">
                            <Typography>2h ago</Typography>
                        </div>
                    </div>
                    <div className="footer_area">
                        <div className="left_side_icon">
                            <div className="vote_icons">
                                <div className="vote_area dashed">
                                    <div
                                        className={`vote_icon ${!upvoted ? "unselected" : ""}`}
                                        onClick={handleUpvote}
                                    >
                                        <Image src={upvoted ? Voted : NotVoted} alt="upvote" />
                                    </div>
                                    <div className={`vote_num ${upvoted ? "selected" : ""}`}>
                                        <Typography>{upvoteCount}</Typography>
                                    </div>
                                </div>
                                <div className="vote_area">
                                    <div
                                        className={`vote_icon ${downvoted ? "selected" : ""}`}
                                        onClick={handleDownvote}
                                    >
                                        <Image src={downvoted ? Voted : NotVoted} alt="upvote" />
                                    </div>
                                    <div className={`vote_num ${downvoted ? "selected" : ""}`}>
                                        <Typography>{downvoteCount}</Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="inApp_share_icon">
                                <SyncOutlinedIcon />
                            </div>
                            <div className="comment_icon">
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <Image src={Comment} alt="comment icon" />
                                    <Typography>{commentCount}</Typography>
                                </ExpandMore>
                            </div>
                        </div>
                        <div className="right_side_icon">
                            <div className="external_share_icon">
                                <Image src={Share} alt="share icon" />
                            </div>
                            <div className="dots_icon">
                                <Image src={Options} alt="more options" />
                            </div>
                        </div>
                    </div>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Comments post={post} />
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
};
