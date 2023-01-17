import React from 'react'
import { IoColorPalette } from "react-icons/io5";
import { BsBrushFill } from "react-icons/bs";

function Sidebar() {
  return (
    <section className="w-32 shadow-md border-r flex flex-col justify-center h-screen items-center">
      <div className="text-3xl flex flex-col gap-5">
        <div className="hover:cursor-pointer">
          <IoColorPalette color="#6b6b6b" />
        </div>
        <div className="hover:cursor-pointer">
          <BsBrushFill />
        </div>
      </div>
    </section>
  )
}

export default Sidebar