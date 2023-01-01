import React from "react";
import Navbar from "../../src/components/layouts/Navbar";
import Hero from "../../src/components/Hero/index";
import Slider from "../../src/components/slider/index";
const index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Slider />
    </div>
  );
};

export default index;
