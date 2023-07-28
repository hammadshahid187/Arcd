import { useState } from "react";

const NewsCard = ({ headingIconPath, heading, data }) => {
  const [currentSlide, setCurrrentSlide] = useState(1);

  const swiperButtonClickHandler = (value) => {
    setCurrrentSlide((c) => c + value);
  };

  return (
    <div className="relative min-w-[300px] transition-all p-4 rounded-md min-h-[280px] border-gray-300 border-2  ">
      <div className="flex gap-2 justify-between items-center w-full border-b pb-2">
        <div className="flex gap-2">
          {headingIconPath ? (
            <img src={headingIconPath} alt="text-icon" />
          ) : null}
          <span className="font-medium">{heading}</span>
          {data.length > 1 && <div className="absolute top-10 right-5 flex items-center gap-1">
            <button
              className={`swiper-button-prev flex items-center justify-center p-2 rounded-full bg-arca-blue disabled:cursor-not-allowed ${
                currentSlide == 1 ? "swiper-button-disabled" : ""
              }`}
              disabled=""
              onClick={swiperButtonClickHandler.bind(this, -1)}
            ></button>
            <button
              className={`swiper-button-next flex items-center justify-center p-2 rounded-full bg-arca-blue disabled:cursor-not-allowed ${
                currentSlide == data.length
                  ? "swiper-button-disabled"
                  : ""
              }`}
              disabled=""
              onClick={swiperButtonClickHandler.bind(this, 1)}
            ></button>
          </div>}
        </div>
      </div>
      <div className=" max-h-[300px] overflow-hidden">
        {data
          .filter((x) => x.id == currentSlide)
          .map((item) => (
            <div className="mt-4 text-sm md:text-sm lg:text-md w-full">
              <p className="text-gray-500">{item.text}</p>
            </div>
          ))}
      </div>
      <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets gap-2 mt-5 ">
        {data.map((item) => (
          <span
            className={`swiper-pagination-bullet ${
              currentSlide == item.id ? "swiper-pagination-bullet-active" : ""
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
