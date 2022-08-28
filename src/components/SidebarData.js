import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SortIcon from '@mui/icons-material/Sort';
import AnimationIcon from '@mui/icons-material/Animation';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Sort",
        icon: <SortIcon />,
        link: "/sort"
    },
    {
        title: "Linked List",
        icon: <AnimationIcon />,
        link: "/linked-list"
    },
    {
        title: "Trees",
        icon: <DeviceHubIcon />,
        link: "/trees"
    },
];
