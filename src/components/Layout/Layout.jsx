  import moment from "moment/moment";
  import React, { useState } from 'react';
  import css from "./Layout.module.css";
  import { BiSearch } from "react-icons/bi";
  import Sidebar from "../Sidebar/Sidebar";
  import { Navigate, Outlet, useLocation } from "react-router-dom";
  import CountryCityStateForm from "../../pages/LocationForm/LocationForm";
import { NavLink } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
  const Layout = () => {

    const { pathname } = useLocation()
    const [isLocationFormOpen, setIsLocationFormOpen] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData") || "")

    const handleOpenLocationForm = () => {
      setIsLocationFormOpen(true);
    };
  
    const handleCloseLocationForm = () => {
      setIsLocationFormOpen(false);
    };
    
    return (
    <div id="dashboard">

      <div className={css.container}>
        <Sidebar />


        {/* making the dashboard as the default route */}
        {!userData?.isAdmin && <Navigate to="/" />}


        <div className={css.dashboard}>
          <div className={css.topBaseGradients}>
            <div className="gradient-red"></div>
            <div className="gradient-orange"></div>
            <div className="gradient-blue"></div>
          </div>

          <div className={css.header}>

            <span>{moment().format("dddd, Do MMM YYYY")}</span>
            
            <div className={css.searchBar}>
              <BiSearch size={20} />
              <input type="text" placeholder="Search" />
            </div>

            <div className={css.profile}>
             
              <div className={css.details}>
                <div style={{display:"flex", flexDirection:"column"}}>
                <span>{userData?.username} {userData?.lastname}</span>
                <span>{userData?.email}</span>
                </div>
                <NavLink to="/login" className={css.item} title="Logout">
                    <IoLogOutOutline
                        size={30}
                        color={"#ecf0f1"}
                        onClick={() => handleIconClick("users")}
                    />
                </NavLink>
              </div>
            </div>

            {/* <button className={css.loginButton} onClick={handleLogin}>
            Login
          </button> */}
         
         
          </div>


          <div className={css.content}>
            <Outlet />
          </div>
        </div>
        <CountryCityStateForm
        isOpen={isLocationFormOpen}
        onClose={handleCloseLocationForm}
      />
      </div>
      </div>
    );
  };

  export default Layout;
