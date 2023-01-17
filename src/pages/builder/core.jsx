import React from 'react'
import Builder from '../../components/builder/builder'
import Navbar from '../../components/navbar/navbar'
import Sidebar from '../../components/sidebar/sidebar'

function Core() {
  return (
    <>
    <Navbar/>
    <div className="flex">
      <Sidebar/>
      <Builder/>
    </div>
    </>
  )
}

export default Core