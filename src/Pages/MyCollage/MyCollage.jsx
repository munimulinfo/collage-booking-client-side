import { useContext } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import VisualCollage from "./VisualCollage";

const MyCollage = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxios();
    const { data: mycolage = [] } = useQuery(['mycolage'], async () => {
        const res = await axiosSecure.get(`/admitCollage/${user?.email}`)
        return res.data;
    })
    return (
        <div className="lg:px-44 lg:py-28">
            {
                mycolage?.map(admidcollage => <VisualCollage
                admidcollage={admidcollage}
                key={admidcollage._id}
                ></VisualCollage>)
            }      
        </div>
    );
};

export default MyCollage;