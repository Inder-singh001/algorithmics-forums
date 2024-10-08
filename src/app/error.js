"use client";
import { Container, Typography, Grid } from "@mui/material";
import Image from "next/image";
import ResultImage from "../../public/images/notFound.png";
import "../../public/sass/pages/util.scss";

const Result = () => {
  return (
    <div className="handling_section">
      <Container>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <div class="handling_area">
              <div className="image_area notfound_image">
                <Image
                  src={ResultImage}
                  alt="No Result Found Image"
                  width={643}
                  height={558}
                />
              </div>
              <div className="inner_content">
                <div className="heading">
                  <Typography variant="h4">No Result Found</Typography>
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

export default Result;
