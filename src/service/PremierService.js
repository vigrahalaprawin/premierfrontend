import axios from "axios";

const PREM_BASE_URL = "http://localhost:8080/api/teams";
const PREM_ADDTEAM_URL = "http://localhost:8080/api/addteams";
const PREM_DELETE_URL = "http://localhost:8080/api/deleteTeam";

class PremierService {
  getPremierTeams() {
    return axios.get(PREM_BASE_URL);
  }

  addPremierTeam() {
    return axios.post(PREM_ADDTEAM_URL);
  }
  deletePremierTeam() {
    return axios.post(PREM_DELETE_URL);
  }
}

export default new PremierService();
