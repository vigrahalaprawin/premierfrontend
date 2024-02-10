import React, { Component } from "react";
import PremierService from "../service/PremierService";
import { Link } from "react-router-dom";

class ListAllMatchWeeks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchWeeksInfo: [],
    };
    // this.premTeamSubmit = this.premTeamSubmit.bind(this);
    //this.deleteMatchWeek = this.deleteMatchWeek.bind(this);
  }

  componentDidMount() {
    PremierService.getAllMatchWeekInfo().then((response) => {
      this.setState({ matchWeeksInfo: response.data });
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
      .then((response) => {
        // Handle the response
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
    window.location.reload();
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
                <tr key={match.matchId}>
                  <td>{match.matchWeek}</td>
                  <td>{match.homeTeam}</td>
                  <td>{match.homeScore}</td>
                  <td>{match.awayTeam}</td>
                  <td>{match.awayScore}</td>
                  <td>
                    <button id={match.matchId} onClick={this.deleteMatchWeek}>
                      Delete
                    </button>

                    <Link to="/editTeam">
                      <button
                        className="m5"
                        id={match.matchId}
                        onClick={this.updatePremTeam}
                      >
                        Edit Not Implemented
                      </button>
                    </Link>
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
