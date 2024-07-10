import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import "../../../../public/sass/dashboard/explore.scss";
import MakeAPost from "@/app/components/makepost";
const AddPost = () => {
    return (
        <div className="dashboard_section explore_section">
            <Navbar fixed="top" />

            <div className="inner_section">
                <div className="left_section">
                    <Sidebar />
                </div>
                <div className="right_section post_section">
                    <MakeAPost />
                </div>
            </div>
        </div>
    );
};
export default AddPost;
