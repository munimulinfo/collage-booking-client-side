import { useContext } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxios()

    const { data: allusers = [], } = useQuery(['allusers'], async () => {
        const res = await axiosSecure.get(`/allusers/${user?.email}`)
        return res.data;
    });
    return (
        <div className="flex justify-center items-center mt-14 mb-12 lg:px-[450px]">
            {
                allusers?.map(singleuser => <div key={singleuser?._id} className="card w-full card-side bg-base-100 shadow-xl flex flex-col relative">
                        <div className="flex justify-center items-center bg-purple-100 py-2">
                            <img className="w-44 rounded-full h-44" src={singleuser?.image} alt="Movie" />
                        </div>
                        <div className="card-actions absolute right-0">
                            <Link to='/updateprofile'><button className="btn btn-xs btn-info">Edit Profile</button></Link>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title"><span className="font-bold">Name: </span>{singleuser?.name}</h2>
                            <p><span className="font-bold">Email: </span>{singleuser?.email}</p>
                            {
                                singleuser?.birthdate && <p><span className="font-bold">Birth-Date: </span>{singleuser?.birthdate}</p>
                            }
                            {
                                singleuser?.university && <p><span className="font-bold">University: </span>{singleuser?.university}</p>
                            }
                            {
                                singleuser?.address &&  <p><span className="font-bold">Address: </span>{singleuser?.address}</p>
                            }
                        </div>
                    </div>)
            }

        </div>
    );
};

export default UserProfile;