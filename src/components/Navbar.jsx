import React, { Component } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { IoLogOutOutline } from "react-icons/io5";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  
  render() {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "") : {}
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
         <img src={logo} alt="Logo"></img> 
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
                <Link key={index} className={item.cName} to={item.url}>
                  {item.title}
                </Link>
              
            );
          })}
          {userData?.username ? 
          <div style={{display:"flex", alignItems:"center"}}>
           <div style={{display:"flex", flexDirection:"column"}}>
                <span>{userData?.username} {userData?.lastname}</span>
                <span>{userData?.email}</span>
                </div>
                <Link to="/login" className={"nav-links"} title="Logout">
                    <IoLogOutOutline
                        size={30}
                        // color={"#ecf0f1"}
                        
                    />
                </Link>
              </div>
              : 
              <Link className={"nav-links"} to={"/login"}>
              Login
            </Link>
              }
        </ul>
      </nav>
    );
  }
}

export default Navbar;
