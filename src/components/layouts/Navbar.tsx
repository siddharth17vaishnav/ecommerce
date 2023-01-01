import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <div className=" bg-background w-full flex justify-around px-6 py-3 text-xl">
      <div className="cursor-pointer">{"<ECOM4U/>"}</div>
      <div>
        <ul className="flex gap-8">
          <li className="cursor-pointer">HOME</li>
          <li className="cursor-pointer">PRODUCTS</li>
          <li className="cursor-pointer">REVIEW</li>
          <li className="cursor-pointer">CONTACT</li>
          <li className="cursor-pointer">
            <SearchIcon />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
