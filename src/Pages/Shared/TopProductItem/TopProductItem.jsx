import React from 'react';

const TopProductItem = ({ product }) => {
    const { name, image, price, description } = product;
    return (
        <div>
           
            <div class="card m-auto ">
                <div class="content ">
                    <div class="back">
                        <div class="back-content">
                            <svg stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="50px" width="50px" fill="#ffffff">

                                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>

                                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>

                                <g id="SVGRepo_iconCarrier">

                                 <img src={image} alt="" />
                                </g>

                            </svg>
                            <strong>Hover Me</strong>
                        </div>
                    </div>
                    <div class="front">

                        <div class="img">
                            <div class="circle">
                            </div>
                            <div class="circle" id="right">
                            </div>
                            <div class="circle" id="bottom">
                            </div>
                        </div>
                        

                        <div class="front-content">
                            <small class="badge">{price}</small>
                            <p>{description}</p>
                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>{name}</strong>
                                    </p>
                                    
                                    <svg fill-rule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g  text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg>

                                </div>
                                <button className='rounded-full bg-transparent  mt-5 w-full description hover:bg-red-900'>Check Details</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default TopProductItem;