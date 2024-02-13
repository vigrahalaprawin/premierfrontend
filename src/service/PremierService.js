import axios from "axios";

const PREM_BASE_URL = "http://localhost:8080/api/teams";
const PREM_ADDTEAM_URL = "http://localhost:8080/api/addteams";
const PREM_DELETE_URL = "http://localhost:8080/api/deleteTeam";
const PREM_MATCHWEEK_URL = "http://localhost:8080/api/addMatchWeek";
const PREM_LEAGUETEAMS_URL = "http://localhost:8080/api/premierTeams";
const PREM_MATCHWEEKINFO_URL = "http://localhost:8080/api/allMatchWeek";
const PREM_MATCHWEEKBYID_URL = "http://localhost:8080/api/MatchWeek";
const PREM_TEAMBYID_URL = "http://localhost:8080/api/premTeam";
const PREM_UPDATETEAM_URL = "http://localhost:8080/api/updateTeam";

class PremierService {
  getPremierTeams() {
    return axios.get(PREM_BASE_URL);
  }

  addPremierTeam() {
    return axios.post(PREM_ADDTEAM_URL);
  }

  updatePremierTeam(teamId) {
    return axios.put(`${PREM_UPDATETEAM_URL}/${teamId}`);
  }

  addMatchWeek() {
    return axios.post(PREM_MATCHWEEK_URL);
  }
  deletePremierTeam() {
    return axios.post(PREM_DELETE_URL);
  }

  getOnlyPremierTeams() {
    return axios.get(PREM_LEAGUETEAMS_URL);
  }

  getAllMatchWeekInfo() {
    return axios.get(PREM_MATCHWEEKINFO_URL);
  }

  getMatchWeekById() {
    return axios.get(PREM_MATCHWEEKBYID_URL);
  }

  getOnlyPremTeamById(id) {
    return axios.get(`${PREM_TEAMBYID_URL}/${id}`);
  }
}

export default new PremierService();
