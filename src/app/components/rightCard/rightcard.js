const { Grid, Container, Card, CardContent ,Typography} = require("@mui/material");
import '../../../../public/sass/pages/card.scss';


const RightCard = () => {
    return (
        <div className="card_container">
            <Container>
                <Grid container>
                    <Grid item>
                        <div className="inner_parent">
                            <div className=' carder'>
                                <div className='head'>
                                    Loren ipsum dollor amet
                                </div>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default RightCard;