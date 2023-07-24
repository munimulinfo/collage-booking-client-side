import { useContext } from "react";
import { AuthContext } from "../Providers/Authprovider";
import { Link, useNavigate } from "react-router-dom";

const NavMenu = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error));
    }
    return (
        <div className="navbar bg-purple-200 px-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/dashboard/manageclass'>ManageUsers</Link> </li>
                        <li><Link to='/addclass'>Add Class</Link> </li>
                        <li><Link to='/'>Home</Link> </li>
                    </ul>
                </div>
                <h1 className="normal-case text-xl">MH-Collage</h1>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-8">
                    <li><Link to='/dashboard/manageclass'>ManageUsers</Link> </li>
                    <li><Link to='/dashboard/addclass'>Add Class</Link> </li>
                    <li><Link to='/'>Home</Link> </li>
                </ul>
            </div>
            <div className="navbar-end">
                {user ? <button onClick={handleLogOut} className="btn btn-md btn-info">Logout</button> : <Link to='/signin'><button className="btn btn-md btn-info">Sign In</button></Link>}
                {user && <Link to='/userprofiel'><img className='w-14 h-14 ml-4 rounded-full' src={user?.photoURL} alt="user" /></Link>}

            </div>
        </div>
    );

};

export default NavMenu;