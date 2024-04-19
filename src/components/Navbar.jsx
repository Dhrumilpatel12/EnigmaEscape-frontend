import React, { Component } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { IoLogOutOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";

class Navbar extends Component {
  state = { clicked: false, dropdownOpen: false};

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  toggleDropdown = () => {
    console.log("Dropdown toggled");
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
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
          {MenuItems.map((item, index) => (
            <Link key={index} className={item.cName} to={item.url}>
              {item.title}
            </Link>
          ))}
      {userData.username ? (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div onClick={this.toggleDropdown} style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}>
      <span>{userData.username} {userData.lastname}</span>
      <span>{userData.email}</span>
    </div>
    <Link to="/login" className={"nav-links"} title="Logout">
                    <IoLogOutOutline
                        size={30}
                        // color={"#ecf0f1"}
                        
                    />
                </Link>

    {/* {this.state.dropdownOpen && (
      <ul className="dropdown" style={{ position: 'absolute', color:'black', top: '100%', right: '0px', backgroundColor: '#ffffff', boxShadow: '0px 8px 16px rgba(0,0,0,0.2)', zIndex: 5 }}>
        <li><Link to="/UserProfile" className="dropdown-item">Profile</Link></li>
        <li><Link className="nav-links" to="/login">Logout</Link></li>
      </ul>
    )}
    
    {this.state.dropdownOpen && (
      <Link to="/UserProfile" className="profile-icon">
        <IoLogOutOutline />
      </Link>
    )} */}
  </div>
) : (
  <Link className="nav-links" to="/login">
    Login
  </Link>
)}

        </ul>
      </nav>
    );
  }
}

export default Navbar;
