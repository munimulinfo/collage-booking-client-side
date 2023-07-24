import img1 from '../../../../assets/image/download (9).jpg';
import img2 from '../../../../assets/image/images (2).jpg';
import img3 from '../../../../assets/image/images (3).jpg';
import img4 from '../../../../assets/image/images (4).jpg';
import img5 from '../../../../assets/image/images (5).jpg';
import img6 from '../../../../assets/image/images (6).jpg';
import img7 from '../../../../assets/image/images (7).jpg';
import img8 from '../../../../assets/image/images (8).jpg';
import img9 from '../../../../assets/image/images (9).jpg';
const ImageGalery = () => {
    return (
        <div>
            <h1 className='text-center mb-20 font-sans font-bold text-3xl'>Graduates Group Pictures</h1>
            <div className='grid lg:grid-cols-3 justify-center items-center px-2 gap-5 lg:gap-10 lg:px-20 mb-24 '>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img1} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img2} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img3} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img4} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img5} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img6} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img7} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img8} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
                <div className="card bg-red-100 shadow-xl">
                    <figure className="px-5 py-5">
                        <img src={img9} alt="image" className="rounded-xl w-full h-56" />
                    </figure>
                </div>
            </div>
        </div>
    );
};

export default ImageGalery;