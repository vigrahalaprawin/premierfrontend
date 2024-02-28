import axios from "axios";

const PREM_BASE_URL = "http://localhost:8080/api/teams";
const PREM_ADDTEAM_URL = "http://localhost:8080/api/addteams";
const PREM_DELETE_URL = "http://localhost:8080/api/deleteTeam";
const PREM_LEAGUETEAMS_URL = "http://localhost:8080/api/premierTeams";
const PREM_TEAMBYID_URL = "http://localhost:8080/api/premTeam";
const PREM_UPDATETEAM_URL = "http://localhost:8080/api/updateTeam";

class PremierService {
  getPremierTeams() {
    return axios.get(PREM_BASE_URL);
  }

  addPremierTeam() {
    //adding the prem team
    return axios.post(PREM_ADDTEAM_URL);
  }

  updatePremierTeam(teamId) {
    //Updating the PL team details
    return axios.put(`${PREM_UPDATETEAM_URL}/${teamId}`);
  }

  deletePremierTeam() {
    //deleting the PL teams
    return axios.post(PREM_DELETE_URL);
  }

  getOnlyPremierTeams() {
    //Only Names of PL
    return axios.get(PREM_LEAGUETEAMS_URL);
  }

  getOnlyPremTeamById(id) {
    //getting only the premteam with Id for editing scenario
    return axios.get(`${PREM_TEAMBYID_URL}/${id}`);
  }
}

export default new PremierService();
