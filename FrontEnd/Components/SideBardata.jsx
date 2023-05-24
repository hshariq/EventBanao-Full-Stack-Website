import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BalconyIcon from "@mui/icons-material/Balcony";
import ExploreIcon from "@mui/icons-material/Explore";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import { LogoutRounded } from "@mui/icons-material";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import jwtDecode from "jwt-decode";
import "./SB.css";

const SideBar = () => {
  const [SideBarData, setSideBarData] = React.useState([]);
  React.useEffect(() => {
    const domain = jwtDecode(localStorage.getItem("token")).userType;
    if (domain == "user") {
      setSideBarData([
        //array of objects
        {
          titile: "Home",
          icon: <DashboardIcon />,
          link: "/location",
        },
        {
          titile: "Log Out",
          icon: <LogoutRounded />,
          link: "/",
        },
      ]);
    } else if (domain == "landlord") {
      setSideBarData([
        //array of objects
        {
          titile: "Home",
          icon: <DashboardIcon />,
          link: "/DB",
        },
        {
          titile: "Add Venue",
          icon: <AddBusinessIcon />,
          link: "/addLocation",
        },
        {
          titile: "My Venues",
          icon: <BalconyIcon />,
          link: "/myVenues",
        },
        {
          titile: "Archived",
          icon: <ArchiveIcon />,
          link: "/archive",
        },
        {
          titile: "Log Out",
          icon: <LogoutRounded />,
          link: "/",
        },
      ]);
    } else {
      setSideBarData([
        //array of objects
        {
          titile: "Home",
          icon: <DashboardIcon />,
          link: "/location",
        },
        {
          titile: "Users",
          icon: <PermContactCalendarIcon />,
          link: "/admin/landlords",
        },
        {
          titile: "Landlord",
          icon: <PermContactCalendarIcon />,
          link: "/admin/landlords",
        },
        {
          titile: "Log Out",
          icon: <LogoutRounded />,
          link: "/",
        },
      ]);
    }
  }, []);
  return (
    <div className="SB">
      <ul className="SBList">
        <h5 className="Heading">eventbanao.pk</h5>
        {SideBarData.map((val, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname == val.link ? "active" : ""}
              className="SBRow"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {" "}
              <div id="icon">{val.icon}</div> <div id="title">{val.titile}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SideBar;
