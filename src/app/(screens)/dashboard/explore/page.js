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

  // Define a state for search
  // get All Post Data
  const [page, setPage] = useState(1)
  const [allpostData, setAllPostData] = useState([]);

  const getAllPostData = async (nextPage = 1) => {
    // /post/index?search=bsdvfsgvgs
    console.log(nextPage, " nextPage ")
    let res = await getApi(`/post/index?page=${nextPage}&limit=5&search=`);
    const postdata = res.data;
    if (postdata) {
      setAllPostData((oldData) => {
        if(oldData.length > 0)
        {
          let newData = [
            ...oldData,
            ...postdata
          ] 
          return newData 
        }
        else
        {
          return postdata
        }
      });
    } else {
      toast.error("NO Post")
    }
  };

  //Modal Props
  const [preferences, setPreferences] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {    
    let handelScrollEnd = async () => {
      if (parseInt(window.innerHeight+window.scrollY+50) >= document.body.offsetHeight)
      {
          await setPage((prev) => {
            return prev+1
          })  
          getAllPostData(page+1)
      }
    }

    document.addEventListener('scrollend',handelScrollEnd)
    return () => window.removeEventListener("scrollend", handelScrollEnd);
  }, [page]);

  useEffect(()=>{
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
    
  },[])

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
                <ExplorePosts key={post._id} post={post} />
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
