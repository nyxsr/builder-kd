import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { ImRedo2, ImUndo2 } from "react-icons/im";
import { HiOutlineEye } from "react-icons/hi";
import { TbWorldUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();
  return (
    <nav className="flex py-3 px-5 items-center bg-[#1c1c1c] text-white">
      <div className="flex items-center hover:cursor-pointer gap-2 py-2 px-2 rounded-full bg-white/50">
        <FiChevronLeft size={30} />
      </div>
      <div className="mx-5">
        <p className="text-xl font-bold">My Project</p>
        <small className="text-sm">klik.deals/my-project</small>
      </div>
      <div className="mx-auto flex justify-between gap-4 items-center text-2xl">
        {props.preview ? (
          <p className="text-lg">Preview Mode</p>
        ) : (
          <>
            <button>
              <ImUndo2 />
            </button>
            <button>
              <ImRedo2 />
            </button>
          </>
        )}
      </div>
      {!props.preview && (
        <div className="w-fit flex items-center">
          <div className="flex gap-4 items-center">
            <button
              className="flex border items-center gap-2 px-2 py-2 border-[#fd8703] rounded-lg"
              onClick={() => navigate("/preview")}
            >
              <HiOutlineEye />
              Preview
            </button>
            <button className="flex text-white items-center gap-2 px-2 py-2 bg-[#fd8703] rounded-lg">
              <TbWorldUpload />
              Publish
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
