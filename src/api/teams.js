import axios from "@/api/axios";

const getTeams = () => {
  return axios.get("teams").then(response => response.data.teams);
};

const getTeamCalendar = teamId => {
  return axios
    .get(`teams/${teamId}/matches`)
    .then(response => response.data.matches);
};

export default {
  getTeams,
  getTeamCalendar
};
