import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AdminPic from "../../assets/admin.jpeg";
import Image from "next/image";
import Logo from "../../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="bg-black text-white ">
      <div className=" flex justify-between py-4 max-w-[1600px] mx-auto">
        <Image src={Logo} alt="Crisp" />
        <div className="flex">
          <ul className="flex gap-6 items-center">
            <li>HOME</li>
            <li>SHOP</li>
            <li>SALE</li>
            <li>CONTACT US</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
