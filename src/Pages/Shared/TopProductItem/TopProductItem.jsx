import React from 'react';
import { Link } from 'react-router-dom';

const TopProductItem = ({ product }) => {
    const { name, image, price, description } = product;
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll animation
      });
    return (
        <div data-aos="zoom-in-up">

            <div className="cardo m-auto ">
                <div className="content ">
                    <div className="back">
                        <div className="back-content">

                            <strong><img className='w-[282px] h-[385px] rounded-[.1rem_2rem]' src={image} alt="" /></strong>
                        </div>
                    </div>
                    <div className="front">

                        <div className="img">
                            <div className="circle">
                            </div>
                            <div className="circle" id="right">
                            </div>
                            <div className="circle" id="bottom">
                            </div>
                        </div>


                        <div className="front-content">
                            <small className="badge">{price}</small>
                            <p>{description}</p>
                            <div className="description">
                                <div className="title">
                                    <p className="title">
                                        <strong>{name}</strong>
                                    </p>

                                    <svg fillRule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g textAnchor="none" fontSize="none" fontWeight="none" fontFamily="none" strokeDashoffset="0" strokeDasharray="" strokeMiterlimit="10" strokeLinejoin="miter" strokeLinecap="butt" strokeWidth="1" stroke="none" fillRule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg>

                                </div>
                               <Link to={`/details/${product?._id}`}> <button onClick={() => window.scrollTo(0, 0)} className='rounded-full bg-transparent mt-5 w-full description border-2 border-red-800 hover:bg-red-900'>
                                    Check Details
                                </button></Link>



                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default TopProductItem;