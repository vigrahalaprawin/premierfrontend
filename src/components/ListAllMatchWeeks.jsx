import React, { Component } from "react";
import PremierService from "../service/PremierService";
import { Link } from "react-router-dom";
import MatchWeekService from "../service/MatchWeekService";

class ListAllMatchWeeks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchWeeksInfo: [],
      editableRow: null,
      stringList: [],
      matchWeekIdList: [],
      selectedMatchWeek: 0,
      selectedTeam: "None",
    };
    this.deleteMatchWeek = this.deleteMatchWeek.bind(this);
    this.editedMatchWeekInfo = this.editedMatchWeekInfo.bind(this);
    this.updateMatchRowItem = this.updateMatchRowItem.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.showTeamDetails = this.showTeamDetails.bind(this);
    this.showTeamDetailsById = this.showTeamDetailsById.bind(this);
  }
  componentDidMount() {
    MatchWeekService.getAllMatchWeekInfo().then((response) => {
      this.setState({ matchWeeksInfo: response.data });
    });
    PremierService.getOnlyPremierTeams().then((response) => {
      this.setState({ stringList: response.data });
    });
    MatchWeekService.getOnlyMatchIds().then((response) => {
      this.setState({ matchWeekIdList: response.data });
    });
  }

  showTeamDetails(event) {
    const teamName = event.target.value;
    this.setState({
      selectedTeam: event.target.value,
      selectedMatchWeek: 0,
    });
    if (teamName === "") {
      MatchWeekService.getAllMatchWeekInfo().then((response) => {
        this.setState({ matchWeeksInfo: response.data });
      });
    } else if (teamName !== "") {
      MatchWeekService.getTeamMatchWeekDetailsByName(teamName).then(
        (response) => {
          this.setState({ matchWeeksInfo: response.data });
        }
      );
    }
  }

  showTeamDetailsById(event) {
    const matchWeek = event.target.value;
    this.setState({
      selectedTeam: "None",
      selectedMatchWeek: event.target.value,
    });
    if (matchWeek !== "") {
      MatchWeekService.getMatchWeekById(matchWeek).then((response) => {
        this.setState({ matchWeeksInfo: response.data });
      });
    } else {
      MatchWeekService.getAllMatchWeekInfo().then((response) => {
        this.setState({ matchWeeksInfo: response.data });
      });
    }
  }

  updateFormData(matchId) {
    const matchEdited = this.state.matchWeeksInfo.find(
      (item) => item.matchId === matchId
    );

    this.setState({
      editableRow: null,
    });

    MatchWeekService.updatingMatchWeekData(matchId, matchEdited)
      .then((response) => {
        console.log("we are in success score");
      })
      .catch((error) => console.log("error while updating"));
  }
  editedMatchWeekInfo(event, matchId) {
    if (event.target.textContent !== "Save") {
      this.setState({
        editableRow: parseInt(event.target.id),
      });
    } else {
      this.updateFormData(matchId);
    }
  }

  updateMatchRowItem(event, matchId) {
    const matchtoEdit = this.state.matchWeeksInfo.findIndex(
      (item) => item.matchId === matchId
    );
    const updatedmatchInfo = [...this.state.matchWeeksInfo];
    updatedmatchInfo[matchtoEdit][event.target.name] = event.target.value;
    this.setState({
      matchWeeksInfo: updatedmatchInfo,
    });
  }

  deleteMatchWeek(event) {
    const matchId = event.target.id;
    console.log(matchId);
    MatchWeekService.deletingMatchWeekById(matchId)
      .then((response) => {
        this.setState({ matchWeeksInfo: response.data });
      })
      .catch((error) => {
        console.log("error deleting the record");
      });
  }

  render() {
    return (
      <div>
        <div className="row m-5">
          <div className="d-flex justify-content-start">
            <div className="m5">
              <label>
                Select Team
                <select
                  name="selectedTeam"
                  value={this.state.selectedTeam}
                  onChange={this.showTeamDetails}
                >
                  <option value="" className="font-weight-bold">
                    None
                  </option>
                  {this.state.stringList.map((string, index) => (
                    <option key={index} value={string}>
                      {string}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <p className="font-weight-bold m5"> OR </p>
            </div>

            <div>
              <label>
                Select By MatchWeek
                <select
                  name="matchWeekId"
                  className="m5"
                  value={this.state.selectedMatchWeek}
                  onChange={this.showTeamDetailsById}
                >
                  <option value="">0</option>
                  {this.state.matchWeekIdList.map((number, index) => (
                    <option key={index} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <table className="table  table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-center">Match Week</th>
                <th className="text-center">Home Team</th>
                <th className="text-center">Home Score </th>
                <th className="text-center">Away Team </th>
                <th className="text-center">Away Score </th>
                <th className="text-center"> Result </th>
                <th className="text-center"> Options </th>
              </tr>
            </thead>
            <tbody>
              {this.state.matchWeeksInfo.map((match) => (
                <tr key={match.matchId} id={match.matchId}>
                  <td className="text-center m5">
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="matchWeek"
                        value={match.matchWeek}
                        className="w-30"
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                      />
                    ) : (
                      match.matchWeek
                    )}
                  </td>
                  <td className="text-center">
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="homeTeam"
                        value={match.homeTeam}
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                      />
                    ) : (
                      match.homeTeam
                    )}
                  </td>
                  <td className="text-center">
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="homeScore"
                        className="w-30"
                        value={match.homeScore}
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                      />
                    ) : (
                      match.homeScore
                    )}
                  </td>
                  <td className="text-center">
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="awayTeam"
                        value={match.awayTeam}
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                      />
                    ) : (
                      match.awayTeam
                    )}
                  </td>
                  <td className="text-center">
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="awayScore"
                        className="w-30"
                        value={match.awayScore}
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                      />
                    ) : (
                      match.awayScore
                    )}
                  </td>
                  <td className="text-center">
                    {match.homeScore > match.awayScore ? (
                      <button className="m5 btn btn-success" id={match.matchId}>
                        W
                      </button>
                    ) : (
                      <button className="m5 btn btn-danger" id={match.matchId}>
                        L
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      className="m5 btn btn-warning"
                      id={match.matchId}
                      onClick={(event) =>
                        this.editedMatchWeekInfo(event, match.matchId)
                      }
                    >
                      {this.state.editableRow === match.matchId
                        ? "Save"
                        : "Edit"}
                    </button>
                    <button
                      className="btn btn-secondary"
                      id={match.matchId}
                      onClick={this.deleteMatchWeek}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Link to="/matchWeek">
            <button className="btn btn-primary m5 addTeambasic">
              Add MatchWeek Results
            </button>
          </Link>
          <Link to="/">
            <button className="m5 btn-primary btn"> Home Page </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListAllMatchWeeks;
