import { Container, Grid } from "@mui/material"
import "../../../../public/sass/pages/categories.scss"

const Categories = () => {
    return (
        <div className="categories_section">
            <Container>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="categories_area">
                            <div className="tags_section">

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default Categories;