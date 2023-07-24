
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";


const Reviews = () => {

    const [axiosSecure] = useAxios();
    const { data: reviews = [] } = useQuery(['reviews'], async () => {
        const res = await axiosSecure.get('/reviews')
        return res.data;
    })

    return (
        <section className="mb-24 lg:px-10 ">
                <h1 className="text-center mb-16 font-bold text-3xl font-sans">Students Reviews</h1>
            <div className="bg-purple-50 rounded-lg py-20">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews?.map(review => <SwiperSlide
                            key={review._id}
                        >
                            <div className="flex flex-col justify-center items-center mx-16 lg:mx-24">
                                <h3 className="lg:text-4xl text-2xl mb-4 text-orange-400">{review?.candidateName}</h3>
                                <Rating className="mb-4"
                                    placeholderRating={review?.ratings}
                                    emptySymbol={<FaStar className="lg:text-[25px]  text-[15px]  text-red-300"></FaStar>}
                                    placeholderSymbol={<FaStar className="lg:text-[25px] text-[15px]  text-green-300"></FaStar>}
                                    fullSymbol={<FaStar className="lg:text-[25px] text-[15px]  text-green-300"></FaStar>}
                                />
                                <p className=" text-center">{review?.collagereview}</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};
export default Reviews;