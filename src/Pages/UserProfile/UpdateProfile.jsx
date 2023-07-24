import { useContext } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateProfile = () => {

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxios();

    const { data: allusers = [], refetch } = useQuery(['allusers'], async () => {
        const res = await axiosSecure.get(`/allusers/${user?.email}`)
        return res.data;
    });
    const singleuser = allusers[0];
    const { image, name, university, address, birthdate, _id } = singleuser;

   console.log(_id)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { address, birthdate, image, name, university } = data;
        const updateItem = {address, birthdate, image, name, university};
        axiosSecure.put(`/allusers/${_id}`, updateItem)
            .then(data => {
                reset();
                refetch();
                if (data.data?.modifiedCount) {
                    Swal.fire(
                        'Good job!',
                        'Your Class add succesfull',
                        'success'
                    )
                }
                console.log('after add a new data', data.data);
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 w-full mx-auto  mt-24  shadow-xl mb-10 p-8 border border-purple-500 bg-white rounded-lg text-black">
                <h3 className='text-[25px] text-center font-semibold mb-5 text-transparent bg-clip-text  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Update Profile information</h3>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" defaultValue={name} {...register("name", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.name && <span className='text-purple-600 animate-pulse'>Class Name is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input type="text" defaultValue={image} {...register("image")} placeholder='pasete imgbb link' className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">University</span>
                    </label>
                    <input type="text" defaultValue={university} {...register("university", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.university && <span className='text-purple-600 animate-pulse'>university is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input type="text" defaultValue={address} {...register("address", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.address && <span className='text-purple-600 animate-pulse'>Address is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Birth-Date</span>
                    </label>
                    <input type="text" defaultValue={birthdate} {...register("birthdate", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.birthdate && <span className='text-purple-600 animate-pulse'>Address is required</span>}
                </div>
                <div className="form-control mt-6">
                    <input type="submit" value="Update Now" className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white" />
                </div>
            </form>

        </div>
    );
};

export default UpdateProfile;