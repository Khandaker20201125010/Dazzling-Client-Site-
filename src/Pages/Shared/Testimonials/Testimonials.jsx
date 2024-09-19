import SectionTitle from '../../../Componenets/SectionTitle/SectionTitle';
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
// import required modules
import { Navigation } from 'swiper/modules';

const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data =>
                setReviews(data))
    }, [])

    return (
        <div className='my-20 mt-40'>
            <SectionTitle subHeading="What's our Client say"
                heading={'Testimonials'}>

            </SectionTitle>
            <div className='mt-20 mx-20 '>
                <Swiper navigation={true} modules={[Navigation]} className="m-auto text-center w-3/4">

                    {
                        reviews.map(reviews => <SwiperSlide
                            key={reviews._id} >
                            <div className='items-center flex flex-col my-16 mx-24'>
                           
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={reviews.rating}
                                    readOnly
                                />
                                 <span class="loadero mt-5"></span>
                                <p className='py-8'>{reviews.details}</p>
                                <h3 className='text-2xl text-orange-400'>{reviews.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

        </div>
    );
};

export default Testimonials;