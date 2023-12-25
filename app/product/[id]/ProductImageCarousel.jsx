"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Import Styles
import "./styles.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductImageCarousel = ({ imgList }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="w-3/4 xsm:w-2/3 md:w-4/5 lg:w-3/5 z-0">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="SwiperDisplay mb-5"
      >
        {imgList?.map((img, i) => {
          return (
            <SwiperSlide className="w-full overflow-hidden" key={i}>
              <Image
                src={img}
                width={500}
                height={500}
                className="w-full rounded-lg"
                alt="Product Image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="SwiperPagin"
      >
        {imgList?.map((img, i) => {
          return (
            <SwiperSlide className="cursor-pointer" key={i}>
              <img src={img} />
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </div>
  );
};

export default ProductImageCarousel;
