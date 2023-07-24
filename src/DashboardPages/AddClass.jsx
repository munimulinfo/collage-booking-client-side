import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
    const [axiosSecure] = useAxios();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {

        console.log(data);
        
        const formData = new FormData();
        formData.append('image', data.collageimage[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                console.log(imageResponse);
                if (imageResponse.success) {
                    const imgURL = imageResponse.data.display_url;
                    const { collagename, researchhistory, admissiondate, sports, events, } = data;
                    const postItem = { collagename, classImage: imgURL, researchhistory, admissiondate, sports, events};
                    axiosSecure.post('/allcollage', postItem)
                        .then(data => {
                            reset();
                            if (data.data?.insertedId) {
                                Swal.fire(
                                    'Good job!',
                                    'Your Class add succesfull',
                                    'success'
                                )
                            }
                            console.log('after add a new data', data.data);
                        })
                }
            })
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 w-full mx-auto  mt-24  shadow-xl mb-16 p-8 border border-purple-500 bg-white rounded-lg text-black">
                <h3 className='text-[25px] text-center font-semibold mb-5 text-transparent bg-clip-text  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Add Collage information</h3>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Collage Name</span>
                    </label>
                    <input type="text"  {...register("collagename", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.collagename && <span className='text-purple-600 animate-pulse'>Collage Name is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Collage Image</span>
                    </label>
                    <input type="file" {...register("collageimage")} className="file-input file-input-primary file-input-bordered w-full" />
                    {errors.collageimage && <span className='text-purple-600 animate-pulse'> is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Admission Date</span>
                    </label>
                    <input type="text" {...register("admissiondate", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.admissiondate && <span className='text-purple-600 animate-pulse'>Admission Date is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Events</span>
                    </label>
                    <input type="text"  {...register("events", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.events && <span className='text-purple-600 animate-pulse'>Events is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Research History</span>
                    </label>
                    <input type="text"  {...register("researchhistory", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.researchhistory && <span className='text-purple-600 animate-pulse'>Research History is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Sports</span>
                    </label>
                    <input type="text"  {...register("sports", { required: true })} placeholder="type here" className="input input-bordered" />
                    {errors.sports && <span className='text-purple-600 animate-pulse'>Sprots is required</span>}
                </div>
                <div className="form-control mt-6">
                    <input type="submit" value="Add Now" className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white" />
                </div>
            </form>
        </div>
    );
};

export default AddClass;