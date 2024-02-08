import React, { Component } from "react";
import { Link } from "react-router-dom";

class MatchWeekTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTeam: "",
      awayTeam: "",
      homeScore: "",
      awayScore: "",
      matchWeek: "",
    };
    this.updateMatchWeekData = this.updateMatchWeekData.bind(this);
    this.matchWeekTeamSubmit = this.matchWeekTeamSubmit.bind(this);
  }

  matchWeekTeamSubmit(event) {
    const data = {
      homeTeam: this.state.homeTeam,
      awayTeam: this.state.awayTeam,
      homeScore: this.state.homeScore,
      awayScore: this.state.awayScore,
      matchWeek: this.state.matchWeek,
    };
    console.log(JSON.parse(JSON.stringify(data)));
    fetch("http://localhost:8080/api/addMatchWeek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Adjust the Content-Type as needed
      },
      body: JSON.stringify(data), // Include the request body as needed
    })
      .then((response) => {
        console.log("we are in success score");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
  }
  updateMatchWeekData(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Add Premier League Team</h1>
        <form name="premadd" onSubmit={this.matchWeekTeamSubmit}>
          <div>
            <label>
              Enter Home Team
              <input
                name="homeTeam"
                onChange={this.updateMatchWeekData}
                value={this.state.homeTeam}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Enter Away Team
              <input
                name="awayTeam"
                value={this.state.awayTeam}
                onChange={this.updateFormData}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Enter Home Score
              <input
                type="number"
                name="homeScore"
                value={this.state.homeScore}
                onChange={this.updateFormData}
              />
            </label>
          </div>
          <div>
            <label>
              Enter Away Score
              <input
                name="awayScore"
                value={this.state.awayScore}
                onChange={this.updateFormData}
                type="number"
              />
            </label>
          </div>
          <div>
            <label>
              Enter Match Week
              <input
                name="matchWeek"
                value={this.state.matchWeek}
                onChange={this.updateFormData}
                type="number"
              />
            </label>
          </div>
          {/* <Link to="/"> */}
          <button
            type="button"
            className="m5"
            onClick={this.matchWeekTeamSubmit}
          >
            Submit
          </button>
          {/* </Link> */}
        </form>
        <Link to="/">
          <button className="m5">Back to home Page </button>
        </Link>
      </div>
    );
  }
}

export default MatchWeekTeam;
