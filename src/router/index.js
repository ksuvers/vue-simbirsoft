import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: {name: 'teams'}
  },
  {
    path: "/teams",
    name: "teams",
    component: () => import("@/views/TeamsList"),
    props: route => ({
      year: +route.query.year,
      search: route.query.search
    })
  },
  {
    path: "/leagues",
    name: "leagues",
    component: () => import("@/views/LeaguesList"),
    props: route => ({
      year: +route.query.year,
      search: route.query.search
    })
  },
  {
    path: "/leagues/:id/calendar",
    name: "leagueCalendar",
    component: () => import("@/views/LeagueCalendar"),
    props: route => ({
      id: +route.params.id,
      year: +route.query.year
    })
  },
  {
    path: "/teams/:id/calendar",
    name: "teamsCalendar",
    component: () => import("@/views/TeamCalendar"),
    props: route => ({
      id: +route.params.id,
      year: +route.query.year
    })
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
