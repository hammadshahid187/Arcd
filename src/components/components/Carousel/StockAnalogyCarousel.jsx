import { Swiper } from "swiper/react";
import SwiperCore, { Pagination, Thumbs } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./StockAnalogyCarousel.css";

SwiperCore.use([Pagination, Thumbs]);

const StockAnalogyCarousel = ({ children }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      };
    return (
        <>
            <Swiper
                modules={[Thumbs, Pagination]}
                slidesPerView={3}
                initialSlide={0}
                pagination={{
                    clickable: true,
                }}
                className="stockAnalogy"
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

export default StockAnalogyCarousel;
