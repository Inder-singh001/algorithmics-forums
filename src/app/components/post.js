'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvatarImg from "../../../public/images/avatar.png"
import Badge from '@mui/material/Badge';
import AvatarGroup from '@mui/material/AvatarGroup';
import "../../../public/sass/dashboard/post.scss";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export const Posts = () => {
    const [expanded, setExpanded] = React.useState(false);

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
        <div className="post_section">
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
                            <div className='btn_text'>
                                <Typography>Follow</Typography>
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
                <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                />

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
                    <div footer_area>
                        {/* <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore> */}
                    </div>

                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                            aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and
                            peppers, and cook without stirring, until most of the liquid is absorbed,
                            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                            mussels, tucking them down into the rice, and cook again without
                            stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don&apos;t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card >
        </div >



    )
}
