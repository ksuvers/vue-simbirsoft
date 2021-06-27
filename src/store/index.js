import Vue from "vue";
import Vuex from "vuex";
import leaguesList from "@/store/leaguesList";
import leagueCalendar from "@/store/leagueCalendar";
import teamsList from "@/store/teamsList";
import teamCalendar from "@/store/teamCalendar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    leaguesList,
    leagueCalendar,
    teamsList,
    teamCalendar
  }
});
