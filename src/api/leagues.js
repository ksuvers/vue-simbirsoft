import axios from "@/api/axios";

const getLeagues = () => {
  return axios
    .get("competitions", {
      params: {
        plan: "TIER_ONE"
      }
    })
    .then(response => response.data.competitions);
};

const getLeagueCalendar = id => {
  return axios
    .get(`competitions/${id}/matches`)
    .then(response => response.data.matches);
};

export default {
  getLeagues,
  getLeagueCalendar
};
