import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import banner4 from "../../assets/banner/banner4.png";
import Image from "next/image";

export const banners = [
  {
    id: 1,
    url: banner1,
  },
  {
    id: 2,
    url: banner2,
  },
  {
    id: 3,
    url: banner3,
  },
  {
    id: 4,
    url: banner4,
  },
];

const index = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <Image src={banner1} alt={"banner"} className="w-full" />
        </div>
        <div>
          <Image src={banner2} alt={"banner"} className="w-full" />
        </div>
        <div>
          <Image src={banner3} alt={"banner"} className="w-full" />
        </div>
        <div>
          <Image src={banner4} alt={"banner"} className="w-full" />
        </div>
      </Slider>
    </div>
  );
};

export default index;
