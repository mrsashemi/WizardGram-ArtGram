import { Outlet } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { InstaUserBody } from "../../components/insta-body/instabody";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/instagallery.css'

export function InstaGallery() {
    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <Outlet />
            </div>
        </div>
    )
}