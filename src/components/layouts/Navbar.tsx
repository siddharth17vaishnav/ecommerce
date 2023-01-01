import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AdminPic from "../../assets/admin.jpeg";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  return (
    <div className=" bg-background w-full flex justify-around px-6 py-3 text-xl">
      <div className="cursor-pointer">{"<ECOM4U/>"}</div>
      <div>
        <ul className="md:flex gap-8 hidden ">
          <li className="cursor-pointer">HOME</li>
          <li className="cursor-pointer">PRODUCTS</li>
          <li className="cursor-pointer">REVIEW</li>
          <li className="cursor-pointer">CONTACT</li>
          <li className="cursor-pointer">
            <SearchIcon />
          </li>
          <li>
            <Image
              src={AdminPic}
              alt={"profile photo"}
              width={40}
              height={40}
              className={"rounded-full cursor-pointer"}
            />
          </li>
        </ul>
      </div>
      <div className="md:hidden">
        <ul className="flex gap-8  ">
          <li className="cursor-pointer">
            <SearchIcon />
          </li>
          <li>
            <Image
              src={AdminPic}
              alt={"profile photo"}
              width={40}
              height={40}
              className={"rounded-full cursor-pointer"}
            />
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
