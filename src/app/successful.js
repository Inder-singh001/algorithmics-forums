"use client";
import { Container, Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import SuccessImage from "../../public/images/error.png";
import "../../public/sass/pages/util.scss";

const Successful = () => {
  return (
    <div className="handling_section">
      <Container>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <div class="handling_area">
              <div className="image_area">
                <Image src={SuccessImage} alt="Successful Image" />
              </div>
              <div className="inner_content">
                <div className="heading">
                  <Typography variant="h4">Successful</Typography>
                </div>
                <div className="paragraph">
                  <Typography variant="body1" className="paraText">
                    Lorem ipsum dolor sit amet consectetur. Leo nunc semper
                    pellentesque libero fusce quis elit pulvinar.
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Successful;
