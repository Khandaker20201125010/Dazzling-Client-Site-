import { Link } from "react-router-dom";

const Allitem = ({ product }) => {
    // Set different background images based on gender
    const backgroundImage = product.gender === "Men"
        ? "url('https://i.ibb.co.com/Gxb8yfX/b6fc6b32352cde54fb279c3d0f57e6b4-removebg-preview.png')" // Men's background
        : "url('https://i.ibb.co.com/y8Y8VZ1/1000-F-373923425-l-PNd-O9i4s366-Egk-PDAw-Xt-Lx-SRSVLSDd4.jpg')"; // Women's background (replace with actual image URL)

    return (
        <div data-aos="zoom-in-up" className=''> 
            <div
                className="relative w-[18rem] rounded-2xl p-3 hover:shadow-yellow-600 transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
                style={{ backgroundImage: backgroundImage }} // Apply dynamic background
            >
                {/* Image Container */}
                <div className="w-full rounded-[0.7rem] rounded-tr-[6rem] mb-4 overflow-hidden ">
                    <img className='w-full h-[18rem] rounded-[0.7rem] rounded-tr-[6rem] mb-4 border-red-900' src={product.image} alt={product.name} />
                    <span className="absolute right-5 bottom-[8rem] bg-black hover:shadow-sm hover:shadow-yellow-300 text-yellow-400 font-bold text-sm p-2 rounded-tl-[1rem] rounded-tr-[1rem] rounded-bl-[2rem] rounded-br-[2rem] shadow-lg">
                        ${product.price}
                    </span>
                </div>

                {/* Product Info */}
                <div className="px-3 mb-4">
                    <h3 className="text-white font-bold">{product.brand}</h3>
                    <p className="text-white font-semibold text-xs mb-2">{product.name}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                   <Link to={`/details/${product?._id}`}> <button className="border-0 border-b-4 border-s-2 border-yellow-300 w-44 bg-black text-white font-bold rounded-tl-3xl rounded-br-xl rounded-tr-3xl rounded-bl-xl p-2 transition-colors duration-200 hover:bg-orange-400">
                        Check Out
                    </button></Link>
                </div>
            </div>
        </div>
    );
};

export default Allitem;
