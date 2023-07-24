import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const IntroduceCollage = () => {
    const [axiosSecure] = useAxios();
    const { data: introcollage = [], } = useQuery(['introcollage'], async () => {
        const res = await axiosSecure('/allcollage')
        return res.data;
    })

    const collageintro = introcollage.slice(0, 3);
    return (
        <div className="mt-24">
            <h1 className="text-center font-bold font-sans text-3xl">Top Collages</h1>
            <div className="grid lg:grid-cols-3 justify-center items-center gap-5 px-2 lg:px-5 py-20">
                {
                    collageintro?.map(collage => <div key={collage?._id} className="card w-full lg:h-[600px] card-side bg-purple-50 shadow-xl rounded-lg flex flex-col relative">

                        <div className="flex justify-center items-center bg-purple-100">
                            <img className="w-full rounded h-64" src={collage?.classImage} alt="Movie" />
                        </div>
                        <div className="card-actions absolute bottom-2 right-2">
                            <Link to={`/toydetails/${collage?._id}`}><button className="btn btn-sm text-white btn-info">View Details</button></Link>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title"><span className="font-bold">Collage Name: </span>{collage?.collagename}</h2>
                            <p><span className="font-bold">Addmission Date: </span>{collage?.admissiondate}</p>
                            <p><span className="font-bold">Research History: </span>{collage?.researchhistory}</p>
                            <p><span className="font-bold">Events: </span>{collage?.events}</p>
                            <p><span className="font-bold">Sports: </span>{collage?.sports}</p>
                            <p className="text-[18px] font-bold"> Ratings:
                                <Rating className=" ml-2"
                                    placeholderRating={3.5}
                                    emptySymbol={<FaStar className="text-[15px]  text-red-300"></FaStar>}
                                    placeholderSymbol={<FaStar className="text-[15px]  text-green-300"></FaStar>}
                                    fullSymbol={<FaStar className="text-[15px]  text-green-300"></FaStar>}
                                />
                            </p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default IntroduceCollage;