/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import styles from './MasterLayout.module.css'
export default function MasterLayout() {
  return (
    <>
     
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Navbar  />
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
      </div>
   
    </div>
    </>
  )
}
