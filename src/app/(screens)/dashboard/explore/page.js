'use client'
import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import "../../../../../public/sass/dashboard/explore.scss";
import { ExplorePosts } from "@/app/components/explorePost";
import FeatuerdPosts from "@/app/components/featured_posts";
import Categories from "@/app/components/categories";
import { getValue } from "@/dataCenter/LocalStorage";
import { getApi } from "@/helpers/General"
import { toast } from "react-toastify";

const Dashboard = () => {

  // get All Post Data
  const [allpostData, setAllPostData] = useState([]);
  const getAllPostData = async () => {
    let res = await getApi("/post/index");
    const postdata = res.data;
    if (postdata) {
      setAllPostData(postdata);
    } else {
      toast.error("NO Post")
    }
  };

  //Modal Props
  const [preferences, setPreferences] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getPreference = () => {
      let storedPreferences = getValue("preferenceCount") 

      if (storedPreferences && storedPreferences === "0") {
        setPreferences(JSON.stringify(storedPreferences));
        setShowModal(true);
      }
      else setShowModal(false)
    }
    getAllPostData()
    getPreference()
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className="dashboard_section explore_section">
      <Navbar fixed="top" />

      <div className="inner_section">
        <div className="left_section">
          <Sidebar />
        </div>
        <div className="right_section">

          <div className="explore_area">
            {allpostData ? (
              allpostData.map((post) => (
                <ExplorePosts post={post} />
              ))
            ) : (
              <div>Haven't Posted a Question</div>
            )}
          </div>
          <div className="suggestion_area">
            <FeatuerdPosts />
          </div>
        </div>
        {preferences && (
          <Categories open={showModal} handleClose={handleCloseModal} preferences={preferences} />
        )}
      </div>
    </div>
  );

};
export default Dashboard;
