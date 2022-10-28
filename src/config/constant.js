// Tables headers
export const userTableColumn = ["ID", "email", "Status", "Actions"];

export const organizerTableColumn = ["ID", "email", "Status", "Actions"];

export const eventPlannerTableColumn = ["ID", "email", "Status", "Actions"];

export const logsTableColumn = ["Date", "Message", "Email", "Role"];

export const bookingTableColumn = [
    "ID",
    "Event Name",
    "Customer Name",
    "Event Type",
    "status",
    "Action"
];

export const eventTableColumn = [
    "ID",
    "Event Name",
    "Event Type",
    "Event Posted",
    "Action"
];

export const planTableColumn = [
    "ID",
    "Plan Name",
    "Description",
    "Price",
    "Status",
    "Action"
];

// Months
export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// session
export const STORAGE = {
    ACCESS_TOKEN: "token",
    SESSION: "session"
};

// event type
export const eventTypes = [
    {
        displayName: "Wedding",
        value: "wedding"
    },
    {
        displayName: "Kids Birthday Party",
        value: "kids-birthday-party"
    },
    {
        displayName: "Adults Birthday Party",
        value: "adults-birthday-party"
    },
    {
        displayName: "Disco",
        value: "disco"
    },
    {
        displayName: "Casual Party",
        value: "casual-party"
    }
];
