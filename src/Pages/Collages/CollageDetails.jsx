import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";

const CollageDetails = () => {
    const { id } = useParams();
    console.log(id);
    const [axiosSecure] = useAxios();
    const { data: collagedetail = [], } = useQuery(['collagedetail'], async () => {
        const res = await axiosSecure.get(`/allcollage/${id}`)
        return res.data;
    })
    console.log(collagedetail);
    const { admissiondate, classImage, collagename, events, researchhistory, sports, _id } = collagedetail || {};

    return (
        <div className=" py-24 px-44 ">
            <div className="card card-side shadow-xl flex flex-col relative ">
                <div className="flex justify-center items-center bg-green-700  bg-[url(https://i.ibb.co/mJ4F48m/download-8-removebg-preview.png)] bg-center bg-contain">
                    <img className="w-[400px] rounded-full h-[400px] m-2 border-4 border-yellow-300" src={classImage} alt="Movie" />
                </div>
                <div className="card-actions absolute bottom-6 right-6">
                    <Link to={`/admissionfrom/${_id}`}><button className="btn btn-error">Admition</button></Link>
                </div>
                <div className="card-body">
                    <h2 className="card-title"><span className="font-bold">Collage Name: </span>{collagename}</h2>
                    <p><span className="font-bold">Addmission Date: </span>{admissiondate}</p>
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
            </div>
        </div>
    );
};

export default CollageDetails;