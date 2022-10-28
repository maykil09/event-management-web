export const permissions = [
    {
        path: "/dashboard",
        allowedUsers: [
            "super-admin",
            "admin",
            "super-organizer",
            "organizer",
            "super-planner",
            "planner"
        ]
    },
    {
        path: "/logs",
        allowedUsers: ["super-admin"]
    },
    {
        path: "/organizers",
        allowedUsers: ["super-admin", "admin", "super-organizer"]
    },
    {
        path: "/event-planners",
        allowedUsers: ["super-admin", "admin", "super-planner"]
    },
    {
        path: "/users",
        allowedUsers: ["super-admin", "admin"]
    },
    {
        path: "/plans",
        allowedUsers: ["super-admin", "admin"]
    },
    {
        path: "/profile",
        allowedUsers: [
            "super-admin",
            "admin",
            "super-organizer",
            "organizer",
            "super-planner",
            "planner"
        ]
    },
    {
        path: "/bookings",
        allowedUsers: ["super-admin", "planner"]
    },
    {
        path: "/events",
        allowedUsers: ["super-admin", "planner"]
    },
    {
        path: "/events/details",
        allowedUsers: ["super-admin", "planner"]
    }
];
