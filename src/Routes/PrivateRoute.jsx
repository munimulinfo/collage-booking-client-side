import { useContext } from "react";
import { AuthContext } from "../Providers/Authprovider";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading){
        return <div>
            <progress className="progress w-56 progress-warning h-8"></progress>
        </div>
    }
    if (user){
        return children;
    }
    return <Navigate to="/signin" state={{ from: location}} replace></Navigate>
};

export default PrivateRoute;
