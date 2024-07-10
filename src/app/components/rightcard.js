
import { Grid, Container, Card, CardContent, Typography } from "@mui/material";
import Close from '@mui/icons-material/Close';
import '../../../public/sass/pages/card.scss';
import { KeyboardArrowRight, Pages } from '@mui/icons-material';


const RightCard = () => {

    const cardContent = [
        {
            title: "Lorem ipsum dolor sit amet",
            icon: <Pages />,
            content: "Your answers and posts",
            description: "Lorem ipsum dolor sit amet consectetur. Turpis tortor"
        },
        {
            title: "Lorem ipsum dolor sit amet",
            icon: <Pages />,
            content: "Your answers and posts",
            description: "Lorem ipsum dolor sit amet consectetur. Turpis tortor"
        },
    ]

    return (

        <div className="inner_parent">
            {cardContent.map((text, index) => (
                <div className='carder'>
                    <div className='head'>
                        <Typography>
                            {text.title}
                        </Typography>
                        <div className='icon'>
                            <Close />
                        </div>
                    </div>
                    <div className='description'>
                        <div className='des_left'>
                            <div className='des_top'>
                                <div className="icon_area">
                                    {text.icon}
                                </div>
                                <Typography>{text.content}
                                </Typography>
                            </div>
                            <div className='des_bottom'>
                                <Typography>
                                    {text.description}
                                </Typography>
                            </div>
                        </div>
                        <div className='des_right'>
                            <KeyboardArrowRight />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default RightCard;
