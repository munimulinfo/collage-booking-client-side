import { Outlet } from "react-router-dom";
import NavMenu from "../DashboardPages/NavMenu";

const Dashboard = () => {
    return (
        <>
           <NavMenu></NavMenu>
           <Outlet></Outlet>
        </>
    );
};

export default Dashboard;