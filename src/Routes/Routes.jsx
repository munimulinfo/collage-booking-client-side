import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Authentication/Signup/Signup";
import Login from "../Pages/Authentication/SignIn/Signin";
import UserProfile from "../Pages/UserProfile/UserProfile";
import UpdateProfile from "../Pages/UserProfile/UpdateProfile";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../DashboardPages/ManageUsers";
import AddClass from "../DashboardPages/AddClass";
import Collages from "../Pages/Collages/Collages";
import MyCollage from "../Pages/MyCollage/MyCollage";
import Admission from "../Pages/Admission/Admission";
import CollageDetails from "../Pages/Collages/CollageDetails";
import Admissionfrom from "../Pages/Admission/Admissionfrom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: 'signup',
                element: <Signup></Signup>
            },
            {
                path: 'signin',
                element: <Login></Login>
            },
            {
                path: 'userprofiel',
                element:<PrivateRoute><UserProfile></UserProfile></PrivateRoute>,
            },
            {
                path: 'updateprofile',
                element:<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>,
            },
            {
                path: 'collages',
                element: <Collages></Collages>
            },
            {
                path: 'addmission',
                element: <Admission></Admission>
            },
            {
                path: 'admissionfrom/:id',
                element:<Admissionfrom></Admissionfrom>,
            },
            {
                path: 'mycollage',
                element: <PrivateRoute> <MyCollage></MyCollage></PrivateRoute>,
            },
            {
                path: 'toydetails/:id',
                element: <PrivateRoute><CollageDetails></CollageDetails></PrivateRoute> ,
            }

        ]
    },
    {
        path: 'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'manageclass',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
            },
            {
                path: 'addclass',
                element:<AdminRoute><AddClass></AddClass></AdminRoute>,
            }
        ]
    }
]);

export default router;