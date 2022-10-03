// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StoreIcon from "@mui/icons-material/Store";

// super admin menu
export const superAdminMenu = [
    {
        name: "Dashboard",
        icon: DashboardIcon,
        path: "/dashboard"
    },
    {
        name: "Users",
        icon: PeopleAltIcon,
        path: "/users"
    },
    {
        name: "Organizer",
        icon: AssignmentIcon,
        path: "/organizers"
    },
    {
        name: "Event Planner",
        icon: StoreIcon,
        path: "/event-planners"
    },
    {
        name: "Logs",
        icon: FolderIcon,
        path: "/logs"
    }
];
