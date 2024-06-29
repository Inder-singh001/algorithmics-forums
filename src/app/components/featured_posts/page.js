import { IconButton, Typography } from "@mui/material";
import Image from "next/image";
import CellIcon from "../../../../public/images/cell_icon.png";
import OptBadge from "../../../../public/images/opt_badge.png";
import ReplaceIcon from "../../../../public/images/replace_icon.png";
import TribeImage from "../../../../public/images/tribe_image.png";
import CloseIcon from "@mui/icons-material/Close";
import "../../../../public/sass/pages/featured_posts.scss";

const FeatuerdPosts = () => {
  return (
    <div className="featured_posts">
      <div className="post_header">
        <div className="header-icon">
          <Image src={CellIcon} alt="user_icon" width={15.66} height={20} />
        </div>
        <div className="header_title">
          <Typography variant="h6">Our Featuerd Posts</Typography>
        </div>
      </div>
      {/* <div className="post_content">
        <div className="post-icon">
          <Image src={CellIcon} alt="user_icon" width={40} height={40} />
        </div>
        <div className="post_title">
          <Typography variant="h6">Explore Blog</Typography>
        </div>
        <div className="post_body">
          <Typography variant="body2">
            The place for official announcements and other major news from our
            team
          </Typography>
        </div>
        <div className="post_delete">
          <IconButton edge="end" aria-label="delete">
            <CloseIcon />
          </IconButton>
        </div>
      </div> */}
      {/* <div className="post_content">
        <div className="post_image">
          <Image src={ReplaceIcon} alt="user_icon" width={40} height={40} />
        </div>
        <div className="post_title">
          <Typography variant="h6">The History of Rome</Typography>
        </div>
        <div className="post_body">
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur. Sit sed varius congue
            tortor.
          </Typography>
          <IconButton edge="end" aria-label="delete">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="post_content">
        <div className="post_image">
          <Image src={ReplaceIcon} alt="user_icon" width={40} height={40} />
        </div>
        <div className="post_title">
          <Typography variant="h6">The History of Rome</Typography>
        </div>
        <div className="post_body">
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur. Sit sed varius congue
            tortor.
          </Typography>
          <IconButton edge="end" aria-label="delete">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="post_content">
        <div className="post_image">
          <Image src={TribeImage} alt="user_icon" width={40} height={40} />
        </div>
        <div className="post_title">
          <Typography variant="h6">The History of Rome</Typography>
        </div>
        <div className="post_body">
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur. Sit sed varius congue
            tortor.
          </Typography>
          <IconButton edge="end" aria-label="delete">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="post_content">
        <div className="post_image">
          <Image src={TribeImage} alt="user_icon" width={40} height={40} />
        </div>
        <div className="post_title">
          <Typography variant="h6">The History of Rome</Typography>
        </div>
        <div className="post_body">
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur. Sit sed varius congue
            tortor.
          </Typography>
          <IconButton edge="end" aria-label="delete">
            <CloseIcon />
          </IconButton>
        </div>
      </div> */}
    </div>
  );
};

export default FeatuerdPosts;
