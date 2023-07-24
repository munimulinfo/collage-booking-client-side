import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Providers/Authprovider";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    const [axiosSecure] = useAxios();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/allusers')
        return res.data;
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user?._id}`)
            .then(data => {
                refetch();
                if (data.data?.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure this user was delted?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed){
                axiosSecure.delete(`/allusers/${user?._id}`)
                  .then(data => {
                        if (data?.data?.deletedCount > 0) {
                            refetch();
                            logOut();
                            navigate('/');
                            Swal.fire(
                                'Deleted!',
                                ' user deletd succesfull',
                                'success'
                            )
                        }                      
                    })
            }
        })
    };

    return (
        <div className="w-full lg:w-4/6 mt-24 mb-24 mx-auto">
            <h3 className="text-3xl mt-16 mb-16 text-center font-semibold my-4">All users are available here<span className="text-purple-600">({users.length})</span></h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr className="text-transparent bg-clip-text  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-sm">
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? <button className="btn" disabled="disabled"><FaUserShield></FaUserShield></button> :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-purple-300  text-white"><FaUserShield></FaUserShield></button>
                                }</td>
                                <td>{user.role === 'admin' ? <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-300  text-white " disabled="disabled" ><FaTrashAlt></FaTrashAlt></button> : <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-rose-500  text-white"><FaTrashAlt></FaTrashAlt></button>}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;