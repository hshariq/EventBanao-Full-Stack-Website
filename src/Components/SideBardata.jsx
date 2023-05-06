import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BalconyIcon from '@mui/icons-material/Balcony';
import ExploreIcon from '@mui/icons-material/Explore';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

export const SideBarData= [ //array of objects
    {
        titile: "Home",
        icon:<DashboardIcon/>,
        link:"/DB"
    },
    {
        titile: "Add Venue",
        icon:<AddBusinessIcon/>,
        link:"/AddVenue"
    },
    {
        titile: "My Venues",
        icon:<BalconyIcon/>,
        link:"/MyVenues"
    },
    {
        titile: "Explore All",
        icon:<ExploreIcon/>,
        link:"/ShowAll"
    },
    {
        titile: "Archived",
        icon:<ArchiveIcon/>,
        link:"/Archive"
    },
    {
        titile: "Deleted",
        icon:<DeleteIcon/>,
        link:"/deleted"
    },
    {
        titile: "Personal Information",
        icon:<PermContactCalendarIcon/>,
        link:"/perInfo"
    },
    


        
       
]