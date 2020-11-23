import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import Button from '@material-ui/core/Button';
import { SidebarLinks } from './SidebarLinks';
import TextField from '@material-ui/core/TextField';

import '../static/Navbar.css';


export default function PrimarySearchAppBar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    if (!localStorage.getItem("Username"))    
    return (
        <>
            <div className="navbar" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4', position: "fixed", display: "flex", height: "7.5%", width: "100%", alignItems: "center" }}>
                <Link to="#" className="menu-trigger" >
                    <FaIcons.FaBars onClick={showSidebar} style={{ fontSize: "50%", marginLeft: "150%", float: "left" }} />
                </Link>
                <Link to="/" className="header__logo" style={{ color: "#3734eb", float: "left", marginLeft: "5%", textDecoration: "none" }}>
                    Build<span style={{ color: "#eb34b1" }}>My</span>Trip
                </Link>
                <div className="quick-links" style={{ position: "absolute", left: "auto", right: "5%", fontSize: "70%" }}>
                    <Link to="/login" className="quick-link" style={{ color: "#3734eb" }}>
                        <Button size="large" style={{ color: 'white', background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)" }}>
                            Sign In
                        </Button>
                    </Link>
                    <Link to="/register" className="quick-link" style={{ color: "#eb34b1" }}>
                        <Button size="large" style={{ marginLeft: "20px", color: 'white', background: "linear-gradient(45deg, #eb34b1 30%, #3734eb 90%)" }}>
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
            <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'} style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
                <ul className='side-items' onClick={showSidebar}>
                    <li className='side-toggle'>
                        <Link to="#" className="menu-trigger">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarLinks.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span class="sidebar-text-span">{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <search>
                <TextField
                    id="outlined-full-width"
                    label="Label"
                    style={{left: "20%", color: "#ffffff", height: "20px"}}
                    placeholder="Placeholder"
                    helperText="Full width!"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </search>

        </>
    );

    else if (localStorage.getItem("Username"))
    return (
        <>
            <div className="navbar" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4', position: "fixed", display: "flex", height: "7.5%", width: "100%", alignItems: "center" }}>
                <Link to="#" className="menu-trigger" >
                    <FaIcons.FaBars onClick={showSidebar} style={{ fontSize: "50%", marginLeft: "150%", float: "left" }} />
                </Link>
                <Link to="/" className="header__logo" style={{ color: "#3734eb", float: "left", marginLeft: "5%", textDecoration: "none" }}>
                    Build<span style={{ color: "#eb34b1" }}>My</span>Trip
                </Link>
                <div className="quick-links" style={{ position: "absolute", left: "auto", right: "5%", fontSize: "70%" }}>
                    <Link to="/userprofile" className="quick-link" style={{ color: "#ffffff" }}>
                        <FaIcons.FaUserAlt style={{marginTop: "20px"}}/>
                    </Link>
                    <Link to="/signout" className="quick-link" style={{ color: "#ffffff", marginLeft: '20px' }}>
                        <FaIcons.FaSignOutAlt style={{marginTop: "20px"}}/>
                    </Link>
                </div>
            </div>
            
            <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'} style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
                <ul className='side-items' onClick={showSidebar}>
                    <li className='side-toggle'>
                        <Link to="#" className="menu-trigger">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarLinks.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span class="sidebar-text-span">{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <search>
                <TextField
                    id="outlined-full-width"
                    label="Label"
                    style={{left: "20%", color: "#ffffff", height: "20px"}}
                    placeholder="Placeholder"
                    helperText="Full width!"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </search>

        </>
    );
}


