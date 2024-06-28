const { Grid, Container, Card, CardContent ,Typography} = require("@mui/material");
import '../../../../public/sass/variable.scss';
import '../../../../public/sass/pages/card.scss';


const RightCard = () => {
    return (
        <div className="card_container">
            <Container>
                <Grid container>
                    <Grid item>
                        <div className="inner_parent">
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="$primarytext" gutterBottom>
                                        Lorem ipsum dollor sit amet 
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default RightCard;