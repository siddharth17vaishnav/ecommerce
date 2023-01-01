import Image from "next/image";
import React from "react";
import HeroPoster from "../../assets/heroPoster.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const index = () => {
  return (
    <div className="bg-background rounded-bl-[200px]">
      <div className="flex max-w-[1600px] justify-around mx-auto py-[52px] px-6">
        <div className="my-auto">
          <h2 className="text-4xl font-semibold">
            Fashion that <br />
            reflects what your <br />
            identity is...
          </h2>
          <p className="max-w-md py-4">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here, content
            here, making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text,
          </p>
          <button className="border border-[#003E3C] text-[#003E3C] px-4 py-2">
            Explore Now <ArrowForwardIcon />
          </button>
        </div>
        <div>
          <Image src={HeroPoster} alt={"Hero Poster"} />
        </div>
      </div>
    </div>
  );
};

export default index;
