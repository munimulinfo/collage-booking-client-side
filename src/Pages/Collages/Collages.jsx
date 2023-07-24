import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import SingleCollage from "./SingleCollage";

const Collages = () => {

    const [axiosSecure] = useAxios();
    const { data: collages = [] } = useQuery(['collages'], async () => {
        const res = await axiosSecure.get('/allcollage')
        return res.data
    })
    console.log(collages);
    return (
        <div>
            <h1 className="text-center font-bold text-3xl font-sans mt-16">All Collages Are Here({collages?.length})</h1>
            <div className="grid grid-cols-2  gap-16 px-16 mt-24 mb-24 " >
                {
                    collages?.map(collage => <SingleCollage
                        collage={collage}
                        key={collage?._id}
                    ></SingleCollage>)

                }
            </div>
        </div>
    );
};

export default Collages;