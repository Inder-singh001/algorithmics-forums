import { IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { getApi } from "@/helpers/General";
import CellIcon from "../../../public/images/cell_icon.png";
import OptBadge from "../../../public/images/opt_badge.png";
import ReplaceIcon from "../../../public/images/replace_icon.png";
import TribeImage from "../../../public/images/tribe_image.png";
import CloseIcon from "@mui/icons-material/Close";
import "../../../public/sass/pages/featured_posts.scss";
import { useState, useEffect } from "react";

const FeatuerdPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    handleFeaturedPost();
  }, []);

  const handleFeaturedPost = async () => {
    try {
      const res = await getApi("/post/featured-post");
      const users = res.data;
      console.log(users);
      setFeaturedPosts(users);
    } catch (error) {
      console.error("Failed to fetch featured posts", error);
    }
  };

  return (
    <div className="featured_posts">
      <div className="post_header">
        <div className="header_icon">
          <Image src={OptBadge} alt="user_icon" />
        </div>
        <div className="header_title">
          <Typography variant="h6">Our Featuerd Posts</Typography>
        </div>
      </div>
      {featuredPosts && featuredPosts.length >= 0 ? (
        featuredPosts.map((post, index) => (
          <div className="post_content" key={index}>
            <div className="post_icon">
              <Image src={CellIcon} alt="user_icon" />
            </div>
            <div className="content">
              <div className="post_title">
                <Typography>
                  {post.first_name} {post.last_name}
                </Typography>
              </div>
              <div className="post_inner_content">
                <div className="post_followers">
                  <Typography variant="body2">
                    {post.follower ? post.follower.total : 0} followers .{" "}
                    {post.posts && post.posts.meta && post.posts.meta.total
                      ? post.posts.meta.total
                      : 0}{" "}
                    posts in the last month
                  </Typography>
                </div>
              </div>
              <div className="post_body">
                <Typography variant="body2">
                  {post.posts && post.posts.data && post.posts.data.title
                    ? post.posts.data.title
                    : "Questions"}
                </Typography>
              </div>
            </div>
            <div className="post_delete">
              <IconButton edge="end" aria-label="delete">
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeatuerdPosts;
