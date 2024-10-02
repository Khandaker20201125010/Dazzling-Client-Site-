import React from 'react';

const TopProductItem = ({ product }) => {
    const { name, image, price, description } = product;
    return (
        <div>

            <div className="card m-auto ">
                <div className="content ">
                    <div className="back">
                        <div className="back-content">

                            <strong><img classNameName='w-[282px] h-[385px] rounded-[.1rem_2rem] ' src={image} alt="" /></strong>
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

                                    <svg fill-rule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg>

                                </div>
                                <button classNameName='rounded-full bg-transparent mt-5 w-full description border-2 border-red-800 hover:bg-red-900'>
                                    Check Details
                                </button>



                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default TopProductItem;