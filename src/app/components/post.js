'use client'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AvatarImg from "../../../public/images/avatar.png"
import Badge from '@mui/material/Badge';
import AvatarGroup from '@mui/material/AvatarGroup';
import "../../../public/sass/dashboard/post.scss";
import Image from "next/image";
import PostImage from "../../../public/images/Image.png"
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import NotVoted from "../../../public/images/unselect.png"
import Voted from "../../../public/images/select.png"
import Comment from "../../../public/images/comments.png"
import Share from "../../../public/images/share.png"
import Options from "../../../public/images/threedots.png"
import Comments from './comments';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export const Posts = () => {
    const [expanded, setExpanded] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [downvoteCount, setDownvoteCount] = useState(0);
    const [commentCount, setCommentCount] = useState('');
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [follow, setFollow] = useState(false);

    const handleFollowing = () => {
        if (follow) {
            setFollow(false)
        }
        else setFollow(true)
    }

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#2e69ff',
            color: '#ffffff',
            // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                // top: 0,
                // left: 0,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <div className="postshow_section">
            <Card>
                <div className='cardHeader'>
                    <div className='avatar_area'>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Pablo Graces" src={AvatarImg} />

                        </StyledBadge>
                    </div>
                    <div className='profile_text'>
                        <div className='title_area'>
                            <div className='title_text'>
                                <Typography>Pablo Graces</Typography>
                            </div>
                            <div className='btn_text' >
                                <Typography onClick={handleFollowing} >
                                    {follow ? "Following" : "Follow"}
                                </Typography>
                            </div>
                        </div>
                        <div className='subtext_area'>
                            <div className='sub_text'>
                                <Typography>Product Designer at XYZ</Typography>
                            </div>
                            <div className='time_update'>
                                <Typography>Uppdated yesterday</Typography>
                            </div>
                        </div>

                    </div>
                </div>
                <CardContent>
                    <div className='post_content'>
                        <Typography variant='h4'>This is a question or post title, what do you want to ask?</Typography>
                        <Typography variant="body2">
                            Lorem ipsum dolor sit amet consectetur. Odio ultricies ac orci scelerisque elementum id id enim malesuada. Urna augue sit vitae viverra mattis nunc quis sed leo. Tempor pulvinar posuere enim id. Non lobortis vulputate tortor mattis sit.
                        </Typography>
                    </div>
                </CardContent>
                <div className='media_content'>
                    <Image src={PostImage} alt="ques image" />
                </div>
                <CardActions disableSpacing>
                    <div className='reaction_section'>
                        <div className='avatars_area'>
                            <AvatarGroup max={3}>
                                <Avatar alt="Remy Sharp" src="/static/images/user.png" />
                                <Avatar alt="Travis Howard" src="/static/images/user.png" />
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        </div>
                        <div className='user_area'>
                            <Typography>Pablo Garces and Pete Lada upvoted this</Typography>
                        </div>
                        <div className='time_area'>
                            <Typography>2h ago</Typography>
                        </div>
                    </div>
                    <div className="footer_area">
                        <div className="left_side_icon">
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
                            <div className='inApp_share_icon'>
                                <SyncOutlinedIcon />
                            </div>
                            <div className='comment_icon'>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <Image src={Comment} alt='comment icon' />
                                    <Typography>{commentCount}</Typography>
                                </ExpandMore>
                            </div>

                        </div>
                        <div className="right_side_icon">
                            <div className='external_share_icon'>
                                <Image src={Share} alt='share icon' />
                            </div>
                            <div className='dots_icon'>
                                <Image src={Options} alt='more options' />
                            </div>
                        </div>
                    </div>
                </CardActions >
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Comments />
                    </CardContent>
                </Collapse>
            </Card >
        </div>
    )
}

