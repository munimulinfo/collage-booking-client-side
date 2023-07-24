import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router-dom";

const Admission = () => {

    const [axiosSecure] = useAxios();
    const { data: collages = [] } = useQuery(['collages'], async () => {
        const res = await axiosSecure.get('/allcollage')
        return res.data
    })
    console.log(collages);
    return (
        <div className="grid grid-cols-2 gap-10 py-24 px-32 bg-purple-100">
            {
                collages?.map(collage => <div key={collage?._id} className="card bg-base-100 shadow-xl">

                    <div className="card-body items-center text-center">
                        <h2 className="card-title"><span className="font-bold">Collage Name: </span>{collage?.collagename}</h2>
                        <p><span className="font-bold">Addmission Date: </span>{collage?.admissiondate}</p>
                        <div className="card-actions justify-end mt-4">
                        <Link to={`/admissionfrom/${collage?._id}`}><button className="btn btn-info">Addmission Now</button></Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Admission;