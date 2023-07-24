import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const VisualCollage = ({ admidcollage }) => {
    const [axiosSecure] = useAxios();
    const { classImage, collagename, events, researchhistory, sports, candidateName, candidateEmail, subject, phoneNumber, address, birthday } = admidcollage || {};
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const { collagereview, ratings } = data;
        const reviewdata = { collagereview, ratings, candidateName };
        axiosSecure.post('/reviews', reviewdata)
            .then(data => {
                reset();
                if (data.data?.insertedId){
                    Swal.fire(
                        'Your Review add succesfull',
                        'success'
                    )
                }
                console.log('after add a new data', data.data);
            })
    }
    return (
        <div>
            <div className="card card-side shadow-xl flex flex-col relative ">
                <div className="flex justify-center items-center bg-green-700  bg-[url(https://i.ibb.co/mJ4F48m/download-8-removebg-preview.png)] bg-center bg-contain">
                    <img className="w-[400px] rounded-full h-[400px] m-2 border-4 border-yellow-300" src={classImage} alt="Movie" />
                </div>
                {/* <div className="card-actions absolute bottom-6 right-6">
                    <Link to={`/admissionfrom/${_id}`}><button className="btn btn-error">Admition</button></Link>
                </div> */}
                <div className="flex justify-center items-center">
                    <div className="card-body">
                        <h2 className="card-title"><span className="font-bold">Collage Name: </span>{collagename}</h2>
                        <p><span className="font-bold">Events: </span>{events}</p>
                        <p><span className="font-bold">Research History: </span>{researchhistory}</p>
                        <p><span className="font-bold">Sports: </span>{sports}</p>
                        <p className="text-[18px] font-bold"> Ratings:
                            <Rating className=" ml-2"
                                placeholderRating={3.5}
                                emptySymbol={<FaStar className="text-[15px]  text-red-300"></FaStar>}
                                placeholderSymbol={<FaStar className="text-[15px]  text-green-300"></FaStar>}
                                fullSymbol={<FaStar className="text-[15px]  text-green-300"></FaStar>}
                            />
                        </p>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title"><span className="font-bold">Admid Student: </span>{candidateName}</h2>
                        <p><span className="font-bold">Email: </span>{candidateEmail}</p>
                        <p><span className="font-bold">Address: </span>{address}</p>
                        <p><span className="font-bold">Date of Birth: </span>{birthday}</p>
                        <p><span className="font-bold">Phone Number: </span>{phoneNumber}</p>
                        <p><span className="font-bold">Admid Subject: </span>{subject}</p>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full shadow-xl p-8 text-black">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Collage Review</span>
                            </label>
                            <textarea  {...register("collagereview", { required: true })} className="textarea h-24 textarea-accent" placeholder="type here"></textarea>
                            {errors.collagereview && <span className='text-purple-600 animate-pulse'>Collage Review is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Collage Ratings</span>
                            </label>
                            <input type="number"  {...register("ratings", { required: true })} placeholder="type here" className="input input-bordered" />
                            {errors.ratings && <span className='text-purple-600 animate-pulse'>Collage Review is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Submit" className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white" />
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
};
export default VisualCollage;