import axios from "axios";
const BASE_URL = "http://localhost:8080/api";
const PREM_MATCHWEEK_URL = "http://localhost:8080/api/addMatchWeek";
const PREM_DELETE_MATCHWEEK_URL = "http://localhost:8080/api/matchWeek";
const PREM_MATCHWEEKINFO_URL = "http://localhost:8080/api/allMatchWeek";
const PREM_MATCHWEEKBYID_URL = "http://localhost:8080/api/matchWeekMatchId";
const PREM_UPDATEMATCHWEEK_URL = "http://localhost:8080/api/updateMatchWeek";
const PREM_TEAMBYNAME_URL = "http://localhost:8080/api/matchWeekResults";
const PREM_MATCHWEEKIDS_URL = "http://localhost:8080/api/matchWeekIds";

class MatchWeekService {
  //all matchWeek Info from Db
  getAllMatchWeekInfo() {
    return axios.get(PREM_MATCHWEEKINFO_URL);
  }

  //get matchweek by id
  getMatchWeekById(matchWeekId) {
    return axios.get(`${PREM_MATCHWEEKBYID_URL}/${matchWeekId}`);
  }
  updateMatchWeekById(matchId) {
    return axios.put(`${PREM_UPDATEMATCHWEEK_URL}/${matchId}`);
  }

  getTeamMatchWeekDetailsByName(teamName) {
    return axios.get(`${PREM_TEAMBYNAME_URL}/${teamName}`);
  }
  addMatchWeek(matchWeekData) {
    return axios.post(PREM_MATCHWEEK_URL, matchWeekData);
  }
  getOnlyMatchIds() {
    return axios.get(PREM_MATCHWEEKIDS_URL);
  }
  updatingMatchWeekData(matchId, matchEdited) {
    return axios.put(`${BASE_URL}/matchWeek/${matchId}`, matchEdited);
  }

  getTeamsforMatchWeek(matchId) {
    return axios.get(`${PREM_MATCHWEEKBYID_URL}/teamNames/${matchId}`);
  }
  getAwayTeamsforMatchWeek(teamName) {
    return axios.get(`${PREM_TEAMBYNAME_URL}/AwayTeams/${teamName}`);
  }

  deletingMatchWeekById(matchId) {
    return axios.delete(`${PREM_DELETE_MATCHWEEK_URL}/${matchId}`);
  }
}

export default new MatchWeekService();
