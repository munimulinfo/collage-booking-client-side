import { useState } from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';
import useAxios from '../../../../Hooks/useAxios';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
const SearchCollage = () => {
    const [searchText, setSearchText] = useState("");
    const [searchCollage, setSearchCollage] = useState([]);
    console.log(searchCollage);
    const [axiosSecure] = useAxios();
    const handleSearch = () => {
        axiosSecure.get(`/searchcollage/${searchText}`)
            .then(data => {
                setSearchCollage(data?.data.slice(0,1));
            })
    };
    return (
        <div className='flex flex-col justify-center items-center mb-24'>
            <h1 className="text-center text-3xl font-bold mt-12">Search Your Favorite Collage</h1>
            <div className="form-control mt-12">
                <div className="input-group">
                    <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search…" className="input input-bordered lg:w-[500px]" />
                    <button onClick={handleSearch} className="btn btn-square w-20 bg-info">
                        <FaSearch className='text-3xl text-red-200'></FaSearch>
                    </button>
                </div>
            </div>
            <div>
                {
                    searchCollage.map(collage => <div key={collage._id} className="mt-16">
                        <div className="card w-full card-side bg-base-100 shadow-xl flex flex-col relative">
                            <div className="flex justify-center items-center bg-purple-100 py-2">
                                <img className="w-44 rounded-full h-44" src={collage?.classImage} alt="Movie" />
                            </div>
                            <div className="card-actions absolute p-2 bottom-0 right-0">
                                <Link to={`/toydetails/${collage?._id}`}><button className="btn btn-sm text-white btn-info">View Details</button></Link>
                            </div>
                            <div className="card-body">
                                <h2 className="card-title"><span className="font-bold">Collage Name: </span>{collage?.collagename}</h2>
                                <p><span className="font-bold">Addmission Date: </span>{collage?.admissiondate}</p>
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
                    </div>)
                }
            </div>
        </div>
    );
};

export default SearchCollage;