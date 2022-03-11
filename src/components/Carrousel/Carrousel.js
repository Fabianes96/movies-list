import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carrousel.css";
import CarrouselItem from "./CarrouselItem/CarrouselItem";
import React from "react";

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

const Carrousel = (props) => {
  const {
    items,
    conf,
    effect,
    loop,
    path,
    autoplay,
    className,
    cover,
    pagination,
    classNameSwiper,
    title,
  } = props;

  const slides = [];
  if (items) {
    items.forEach((item) => {
      slides.push(
        <SwiperSlide key={item.id} className={className}>
          <CarrouselItem
            item={item}
            imagePath={conf.base_url + conf.logo_sizes[6] + item[path]}
            cover={cover}
            className={item?.name ? "img-cast" : "img-popular"}
            conf={conf}
          />
        </SwiperSlide>
      );
    });
  }
  return (
    <React.Fragment>
      <div className="carousel_container">
        <h2 className="title">{title}</h2>
        {items && (
          <Swiper
            navigation={true}
            effect={effect}
            centeredSlides={false}
            slidesPerView={"auto"}
            loop={loop}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={pagination}
            autoplay={autoplay}
            className={classNameSwiper}
          >
            {slides}
          </Swiper>
        )}
      </div>
    </React.Fragment>
  );
};

Carrousel.propTypes = {
  items: PropTypes.array,
  conf: PropTypes.object,
};

export default Carrousel;
