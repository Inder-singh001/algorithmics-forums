import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import "../../../../public/sass/dashboard/explore.scss";
import ProfileEdit from "@/app/components/profileEdit";
import RightCard from "@/app/components/rightcard";
import { ProfileView } from "@/app/components/profile";

const Profile = () => {
    return (
        <div className="dashboard_section explore_section">
            <Navbar fixed="top" />

            <div className="inner_section">
                <div className="left_section">
                    <Sidebar />
                </div>
                <div className="right_section">
                    <div className="explore_area">
                        <ProfileView />
                    </div>
                    <div className="suggestion_area">
                        <RightCard />
                    </div>
                </div>

            </div>
        </div>
    );
};
export default Profile;
