import css from './Sidebar.module.css';
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineTable } from "react-icons/ai";
import { FaListAlt, FaMapMarkerAlt, FaHotel, FaUsers } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
    };

    return (
        <div className={css.container}>
            <img src="./logo.png" alt="logo" className={css.logo} />
            <div className={css.menu}>
                <NavLink to="dashboard" className={css.item} title="Dashboard">
                    <MdSpaceDashboard
                        size={30}
                        color={selectedIcon === "dashboard" ? "#3498db" : "#ecf0f1"}
                        onClick={() => handleIconClick("dashboard")}
                    />
                </NavLink>
                <NavLink to="DisplayHotels" className={css.item} title="Display Hotels">
                    <FaHotel
                        size={30}
                        color={selectedIcon === "hotels" ? "#3498db" : "#ecf0f1"}
                        onClick={() => handleIconClick("DisplayHotels")}
                    />
                </NavLink>
                <NavLink to="DisplayActivites" className={css.item} title="Display Activities">
                    <FaListAlt
                        size={30}
                        color={selectedIcon === "activities" ? "#3498db" : "#ecf0f1"}
                        onClick={() => handleIconClick("DisplayActivites")}
                    />
                </NavLink>
                <NavLink to="DisplayAttractions" className={css.item} title="Display Attractions">
                    <FaMapMarkerAlt
                        size={30}
                        color={selectedIcon === "attractions" ? "#3498db" : "#ecf0f1"}
                        onClick={() => handleIconClick("DisplayAttractions")}
                    />
                </NavLink>
                <NavLink to="users" className={css.item} title="Users">
                    <FaUsers
                        size={30}
                        color={selectedIcon === "users" ? "#3498db" : "#ecf0f1"}
                        onClick={() => handleIconClick("users")}
                    />
                </NavLink>
                
            </div>
        </div>
    );
}

export default Sidebar;
