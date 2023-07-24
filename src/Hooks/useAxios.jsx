import axios from 'axios';
const useAxios = () => {
    const axiosSecure = axios.create({
        baseURL: 'https://collage-booking.vercel.app', 
      });
      return [axiosSecure];  
};
export default useAxios;