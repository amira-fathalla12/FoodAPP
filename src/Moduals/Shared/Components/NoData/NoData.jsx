/* eslint-disable no-unused-vars */
import React from 'react'
import Nodata from "../../../../assets/No-Data.png";

export default function NoData() {
  return (
    <div className=' text-center py-5'>
      <img src={Nodata} alt="NoData" />
      <h3>NO Data!</h3>
    </div>
  )
}
