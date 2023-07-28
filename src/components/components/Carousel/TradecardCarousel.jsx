import { Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./TradeCardCarousel.css";

SwiperCore.use([Pagination]);

const TradeCardCarousel = ({ children }) => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                initialSlide={0}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                className="customSwiper"
                direction="horizontal"
                mousewheel={{
                    eventsTarget: "container",
                    forceToAxis: true,
                }}
            >
                {children}
            </Swiper>
        </>
    );
};

export default TradeCardCarousel;
