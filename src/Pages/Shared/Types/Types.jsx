import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import autoplay styles
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import SectionTitle from '../../../Componenets/SectionTitle/SectionTitle';

const Types = () => {
    return (
        <div className='mt-40'>
            <div>
               <SectionTitle 
               subHeading={"From 09.00am to 11.00pm"}
               heading ={"Displaying"}
               >
               
               </SectionTitle>
            </div>
            <div><Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={0}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                autoplay={{
                    delay: 2500, // Slide change delay in ms
                    disableOnInteraction: false, // Keep autoplay active when interacting with the slider
                }}
                loop={true} // Enables infinite loop
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper mt-16"
            >
                <SwiperSlide>
                    <img className="auto-scroll  ing" src="https://i.ibb.co/4Mn9tdk/james-ree-Zme-Ftu11-Hpc-unsplash.jpg" />
                    <div className="overlay-text">Gucci Beg</div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="auto-scroll  ing" src="https://i.ibb.co/LkpbbBt/1.jpg" />
                    <div className="overlay-text">Shirt</div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="auto-scroll  ing" src="https://i.ibb.co/2d9Q7qG/B3-83806580-9a02-4d7d-9dc0-0d25ffabb0f2.png" />
                    <div className="overlay-text">Ray-ban Sunglass</div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="auto-scroll  ing" src="https://i.ibb.co/kD3n9w4/free-ved186-fashionved-unstitched-original-imag6z44pdn9xegm.jpg" />
                    <div className="overlay-text">Laxmitex Silk Saree</div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="auto-scroll  ing" src="https://i.ibb.co/86qSzSC/6bkwt-400.webp" />
                    <div className="overlay-text">Ethnic Top Skirt</div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="auto-scroll  ing" src="https://i.ibb.co/mNXSXyY/nike-sneakers-hero.jpg" />
                    <div className="overlay-text">Nike Sneakers</div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="auto-scroll  ing" src="https://i.ibb.co/7v577mV/s-l400.jpg" />
                    <div className="overlay-text">Salwar kameez</div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="auto-scroll  ing" src="https://i.ibb.co/FsTTP8T/d6cfe3573956-O-black-80760-1605751261.jpg" />
                    <div className="overlay-text">Turtle Neck Tank Top</div>
                </SwiperSlide>
            </Swiper></div>
        </div>
    );
};

export default Types;
