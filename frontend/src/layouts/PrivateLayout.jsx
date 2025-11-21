import { Outlet } from "react-router-dom";

const PrivateLayout = () => (
    <main>
        <Outlet />   {/*  Renders nested private pages */}
    </main>
);

export default PrivateLayout;
