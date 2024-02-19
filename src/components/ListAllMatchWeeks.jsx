import React, { Component } from "react";
import PremierService from "../service/PremierService";
import { Link } from "react-router-dom";

class ListAllMatchWeeks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchWeeksInfo: [],
      editableRow: null,
    };
    this.deleteMatchWeek = this.deleteMatchWeek.bind(this);
    this.editedMatchWeekInfo = this.editedMatchWeekInfo.bind(this);
    this.updateMatchRowItem = this.updateMatchRowItem.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }
  componentDidMount() {
    PremierService.getAllMatchWeekInfo().then((response) => {
      this.setState({ matchWeeksInfo: response.data });
    });
  }

  updateFormData(matchId) {
    const matchEdited = this.state.matchWeeksInfo.find(
      (item) => item.matchId === matchId
    );
    this.setState({
      editableRow: null,
    });

    fetch(`http://localhost:8080/api/MatchWeek/${matchId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Adjust the Content-Type as needed
      },
      body: JSON.stringify(matchEdited), // Include the request body as needed
    })
      .then((response) => {
        console.log("we are in success score");
        //window.location.reload
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
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
    fetch(`http://localhost:8080/api/MatchWeek/${matchId}`, {
      //Sending the parameter in url
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Adjust the Content-Type as needed
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // Handle the response
        this.setState({ matchWeeksInfo: response });
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
  }

  render() {
    return (
      <div>
        <div className="row m-5">
          <table className="table  table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-center">Match Week</th>
                <th className="text-center">Home Team</th>
                <th className="text-center">Home Score </th>
                <th className="text-center">Away Team </th>
                <th className="text-center">Away Score </th>
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
                          this.updateMatchWeek(event, match.matchId)
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
                      className="btn btn-danger"
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
