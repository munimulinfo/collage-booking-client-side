import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const SingleCollage = ({ collage }) => {
    console.log(collage);
    const { collagename, classImage, admissiondate,_id } = collage || {};
    return (
        <div className="card card-side bg-base-100 shadow-xl flex flex-col relative">
            <div className="flex justify-center items-center bg-purple-100">
                <img className="w-full h-64" src={classImage} alt="Movie" />
            </div>
            <div className="card-actions absolute bottom-2 right-2">
                <Link to={`/toydetails/${_id}`}><button className="btn btn-sm btn-info">View Details</button></Link>
            </div>
            <div className="card-body">
                <h2 className="card-title"><span className="font-bold">Collage Name: </span>{collagename}</h2>
                <p><span className="font-bold">Addmission Date: </span>{admissiondate}</p>
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
    );
};

export default SingleCollage;