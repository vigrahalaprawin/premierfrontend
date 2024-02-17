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
                <th>Match Week</th>
                <th>Home Team</th>
                <th>Home Score </th>
                <th>Away Team </th>
                <th>Away Score </th>
              </tr>
            </thead>
            <tbody>
              {this.state.matchWeeksInfo.map((match) => (
                <tr key={match.matchId} id={match.matchId}>
                  <td>
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="matchWeek"
                        value={match.matchWeek}
                        onChange={(event) =>
                          this.updateMatchWeek(event, match.matchId)
                        }
                      />
                    ) : (
                      match.matchWeek
                    )}
                  </td>
                  <td>
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="homeTeam"
                        value={match.homeTeam}
                        //onChange={this.updateMatchWeek}
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                        // onChange={(e) => this.updateMatchWeek(e, match.matchId)}
                      />
                    ) : (
                      match.homeTeam
                    )}
                  </td>
                  <td>
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="homeScore"
                        value={match.homeScore}
                        //   onChange={this.updateMatchWeek}
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                        //onChange={(e) => this.updateMatchWeek(e, match.matchId)}
                      />
                    ) : (
                      match.homeScore
                    )}
                  </td>
                  <td>
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="awayTeam"
                        value={match.awayTeam}
                        // onChange={this.updateMatchWeek}
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                        //onChange={(e) => this.updateMatchWeek(e, match.matchId)}
                      />
                    ) : (
                      match.awayTeam
                    )}
                  </td>
                  <td>
                    {this.state.editableRow === match.matchId ? (
                      <input
                        type="text"
                        name="awayScore"
                        value={match.awayScore}
                        // onChange={this.updateMatchWeek}
                        onChange={(event) =>
                          this.updateMatchRowItem(event, match.matchId)
                        }
                        // onChange={(e) => this.updateMatchWeek(e, match.matchId)}
                      />
                    ) : (
                      match.awayScore
                    )}
                  </td>
                  <td>
                    <button
                      className="m5"
                      id={match.matchId}
                      onClick={(event) =>
                        this.editedMatchWeekInfo(event, match.matchId)
                      }
                    >
                      {this.state.editableRow === match.matchId
                        ? "Save"
                        : "Edit"}
                    </button>
                    <button id={match.matchId} onClick={this.deleteMatchWeek}>
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
            <button className="m5"> Home Page </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListAllMatchWeeks;
