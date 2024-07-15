'use client'
import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import "../../../../../public/sass/dashboard/explore.scss";
import { Posts } from "@/app/components/post";
import FeatuerdPosts from "@/app/components/featured_posts";
import Categories from "@/app/components/categories";
import { getValue } from "@/dataCenter/LocalStorage";

const Dashboard = () => {

  //Modal Props
  const [preferences, setPreferences] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedPreferences = getValue("preference")

    if (storedPreferences) {
      setPreferences(JSON.stringify(storedPreferences));
      setShowModal(true);
    }
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
            <Posts />
            <Posts />
            <Posts />
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
