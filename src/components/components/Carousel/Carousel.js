import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';


import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './Carousel.css';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);


const CarouselComponent = ({ data }) => {
    const containerStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '75%',
        height: '75%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0.517956) 54.91%, rgba(0, 0, 0, 0.368981) 72.75%, rgba(0, 0, 0, 0) 100%)'

    }

    return (
        <div>

            <Swiper spaceBetween={50}
                onSlideChange={
                    () => console.log('slide change')
                }
                onSwiper={
                    (swiper) => console.log(swiper)
                }
                navigation={true}
                pagination={
                    true
                }
                mousewheel={true}
                keyboard={true}
                className='mySwiper'
                cssMode={true}>
                {
                    !data ? <></> : (data.length ? data.map((news, key) => {
                        return (

                            <SwiperSlide style={
                                { height: '432px' }
                            } key={key}>
                                <img src={
                                    news.image_url
                                } />
                                <div className='container flex p-10'
                                    style={containerStyle}>
                                    <div className='w-full'>
                                        <h1 className='font-bold text-white text-2xl md:text-4xl lg:text-4xl font-sourceSansPro'>
                                            {
                                                news.title
                                            } </h1>

                                        <div className='cursor-pointer float-right pt-14'
                                            onClick={
                                                () => {
                                                    window.open(news.article_url)
                                                }
                                            }>
                                            <p className='text-white text-sm tracking-wide md:text-xl'>READ MORE</p>
                                            <div className="w-full h-px bg-white"></div>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                        :
                        [...Array(1)].map((key) => {
                            return (
                                <SwiperSlide key={key} style={{ height: '432px' }}>
                                    <div className="rounded-md w-ful h-full mx-auto">
                                        <div className="animate-pulse w-full h-full space-x-4">
                                            <div className="bg-gray-300 w-full h-full mb-2 rounded"></div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }))

                } </Swiper>
        </div>


    )

}

export default CarouselComponent;
