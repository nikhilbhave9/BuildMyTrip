import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";



import React, { useState } from 'react';

{/* Inspired by https://www.youtube.com/watch?v=CXa0f4-dWi4 */}
export const SidebarLinks = [
    {
        title: 'My Profile',
        path: '/userprofile',
        icon: <AiIcons.AiOutlineUser/>,
        className: 'side-txt'
    },
    {
        title: 'Quick Trip',
        path: '/quicktrip',
        icon: <MdIcons.MdLocalHotel/>,
        className: 'side-txt'
    },
    {
        title: 'My Bookings',
        path: '/userbookings',
        icon: <AiIcons.AiOutlineHistory/>,
        className: 'side-txt'
    }
]

