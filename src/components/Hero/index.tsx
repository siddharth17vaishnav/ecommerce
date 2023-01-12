import { Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Background from "../../assets/hero/heroBackground.png";
import One from "../../assets/hero/one.png";
import Two from "../../assets/hero/two.png";
import Border from "../../assets/hero/border.png";
import Head from "next/head";

const index = () => {
  return (
    <div>
      <Image
        src={Background}
        alt="Background Image"
        className="h-[60vh] absolute"
      />
      <div className="relative flex  justify-around ">
        <div className="m-auto">
          <Image
            src={Border}
            alt="border line for text"
            className=" my-auto absolute "
          />
          <Typography
            sx={{
              my: "auto",
              fontSize: "64px",
              fontWeight: 600,
              fontFamily: "Oswald",
            }}
          >
            SUMMER SALE
          </Typography>
          <Typography
            sx={{
              zIndex: 999,
              my: "auto",
              fontSize: "64px",
              fontWeight: 600,
              fontFamily: "Oswald",
              color: "transparent",
              "-webkit-text-stroke-width": "1px",
              "-webkit-text-stroke-color": "black",
            }}
          >
            GET 30% OFF
          </Typography>
          <Typography
            sx={{
              my: "auto",
              fontSize: "64px",
              fontWeight: 600,
              fontFamily: "Oswald",
            }}
          >
            ON ALL DRESS.
          </Typography>
          <button className="border border-1 border-black px-8 py-2 ml-3 hover:bg-black hover:text-white hover:border-white ]">
            SHOP
          </button>
        </div>
        <div className="flex mt-5 mx-auto">
          <Image
            src={Two}
            alt="girl in black"
            className="w-[300px] mr-[-42px] h-[80%] object-cover my-auto"
          />
          <Image src={One} alt="girl in Red" className="w-[300px] my-auto" />
        </div>
      </div>
    </div>
  );
};

export default index;
