const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Admissionfrom = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxios();
    const  navigate = useNavigate();
    const location = useLocation();
    const { data: meadmidcollage = [], } = useQuery(['meadmidcollage'], async () => {
        const res = await axiosSecure.get(`/allcollage/${id}`)
        return res.data;
    })

    const { admissiondate, classImage, collagename, events, researchhistory, sports, } = meadmidcollage || {};

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
        if(user && user?.email){
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                console.log(imageResponse);
                if (imageResponse.success) {
                    const imgURL = imageResponse.data.display_url;
                    const { candidateName, candidateEmail, subject, phoneNumber, address, birthday } = data;
                    const postItem = { candidateName, candidateEmail, subject, phoneNumber, address, birthday, candidateImage: imgURL, admissiondate, classImage, collagename, events, researchhistory, sports };
                    axiosSecure.post('/admitCollage', postItem)
                        .then(data => {
                            reset();
                            if (data.data?.insertedId) {
                                Swal.fire(
                                    'Good job!',
                                    'Your Collage Admid succesfull',
                                    'success'
                                )
                            }
                            console.log('after add a new data', data.data);
                        })
                }
            })
        }else{
            Swal.fire({
                title: 'Please login and  try ',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signin', { state: { from: location } })
                }
            })
        }  
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 w-full mx-auto  mt-24  shadow-xl mb-16 p-8 border border-purple-500 bg-white rounded-lg text-black">
                <h3 className='text-[25px] text-center font-semibold mb-5 text-transparent bg-clip-text  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Provide Candidate information</h3>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Candidate Name</span>
                    </label>
                    <input type="text"  {...register("candidateName", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.candidateName && <span className='text-purple-600 animate-pulse'>candidateName is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Candidate Image</span>
                    </label>
                    <input type="file" {...register("image")} className="file-input file-input-primary file-input-bordered w-full" />
                    {errors.image && <span className='text-purple-600 animate-pulse'>Candidate Image is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Candidate Email</span>
                    </label>
                    <input type="text" defaultValue={user?.email} {...register("candidateEmail", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.candidateEmail && <span className='text-purple-600 animate-pulse'>Candidate Email is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Subject</span>
                    </label>
                    <select  {...register("subject", { required: true })} className="select input input-bordered w-full">
                        <option disabled selected>Pick your favorite Subject</option>
                        <option>Economics</option>
                        <option>Psychology</option>
                        <option>Biology</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Mathematics</option>
                    </select>
                    {/* <input type="text"  {...register("subject", { required: true })} placeholder="type here" className="input input-bordered" /> */}
                    {errors.subject && <span className='text-purple-600 animate-pulse'>Subject is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Candidate Phone number</span>
                    </label>
                    <input type="number"  {...register("phoneNumber", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.phoneNumber && <span className='text-purple-600 animate-pulse'>Phone number is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input type="text"  {...register("address", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.address && <span className='text-purple-600 animate-pulse'>Address is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date of birth</span>
                    </label>
                    <input type="text"  {...register("birthday", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.birthday && <span className='text-purple-600 animate-pulse'>Date of birth is required</span>}
                </div>
                <div className="form-control mt-6">
                    <input type="submit" value="Submit" className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white" />
                </div>
            </form>
        </div>
    );
};

export default Admissionfrom;