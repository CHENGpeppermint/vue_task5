export default {
    path: "/",
    name: "AppMain",
    component: () => import("@/views/AppMain.vue"),
    redirect: { name: "system-Users-100" },
    children: [
        {
            path: "system-Users-100",
            name: "system-Users-100",
            component: () => import("@/views/layoutpages/system/Users.vue"),
        },
    ],
}
