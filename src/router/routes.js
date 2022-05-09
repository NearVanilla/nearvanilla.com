const Home = () => import("../views/Home.vue");
const Stats = () => import("../views/PlayerStats.vue");
const Downloads = () => import("../views/Downloads.vue");

export default [
  { path: "/", redirect: "/home" },
  { path: "/downloads", component: Downloads },
  { path: "/home", component: Home },
  { path: "/stats", component: Stats },
];
