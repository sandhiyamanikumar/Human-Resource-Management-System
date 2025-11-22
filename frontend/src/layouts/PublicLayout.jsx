import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbarr";

const PublicLayout = () => (
    <>
        <Navbar />
        <main>
            <Outlet />   {/* Renders nested public pages */}
        </main>
    </>
);

export default PublicLayout;
