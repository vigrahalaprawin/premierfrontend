import React, { Component } from "react";
import { Link } from "react-router-dom";
import PremierService from "../service/PremierService";

class MatchWeekTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTeam: "",
      awayTeam: "",
      homeScore: 0,
      awayScore: 0,
      matchWeek: 0,
      stringList: [],
      dupstringList: [],
      showMessage: false,
    };
    this.updateMatchWeekData = this.updateMatchWeekData.bind(this);
    this.matchWeekTeamSubmit = this.matchWeekTeamSubmit.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
  }

  componentDidMount() {
    PremierService.getOnlyPremierTeams().then((response) => {
      this.setState({ stringList: response.data });
    });
  }

  hideMessage(event) {
    this.setState({
      showMessage: false,
    });
  }

  deleteMatchWeekInfo(event) {
    const premId = event.target.id;
    fetch(`http://localhost:8080/api/deleteTeam/${premId}`, {
      //Sending the parameter in url
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Adjust the Content-Type as needed
      },
    })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });

    window.location.reload();
  }

  matchWeekTeamSubmit(event) {
    // event.preventDefault();
    const data = {
      homeTeam: this.state.homeTeam,
      awayTeam: this.state.awayTeam,
      homeScore: this.state.homeScore,
      awayScore: this.state.awayScore,
      matchWeek: this.state.matchWeek,
    };
    fetch("http://localhost:8080/api/addMatchWeek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Adjust the Content-Type as needed
      },
      body: JSON.stringify(data), // Include the request body as needed
    })
      .then((response) => {
        this.setState({
          showMessage: true,
        });
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
  }
  updateMatchWeekData(event) {
    this.setState({
      [event.target.name]: event.target.value,
      dupstringList: this.state.stringList.filter(
        (n) => n !== event.target.value
      ),
    });
  }
  render() {
    return (
      <div>
        <h1>Add Premier League Team</h1>
        <form
          className="d-flex align-items-center"
          name="premadd"
          onSubmit={this.matchWeekTeamSubmit}
        >
          <div>
            <label>
              Match Week
              <input
                name="matchWeek"
                className="w-30  mside-5 rounded"
                value={this.state.matchWeek}
                onChange={this.updateMatchWeekData}
                type="number"
              />
            </label>
          </div>
          <div>
            <label>
              Home Team
              <select
                name="homeTeam"
                className="mside-5 colorblue rounded"
                value={this.state.homeTeam}
                onChange={this.updateMatchWeekData}
              >
                <option value="">Select Team</option>
                {this.state.stringList.map((string, index) => (
                  <option key={index} value={string}>
                    {string}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Home Score
              <input
                type="number"
                name="homeScore"
                className="w-30  mside-5 rounded"
                value={this.state.homeScore}
                onChange={this.updateMatchWeekData}
              />
            </label>
          </div>
          <div>
            <label className="mside-5">
              Away Team
              <select
                name="awayTeam"
                className="mside-5 colorblue rounded"
                value={this.state.awayTeam}
                onChange={this.updateMatchWeekData}
              >
                <option value="">Select Team</option>
                {this.state.stringList
                  .filter((n) => n !== this.state.homeTeam)
                  .map((string, index) => (
                    <option key={index} value={string}>
                      {string}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div>
            <label className="mside-5">
              Away Score
              <input
                name="awayScore"
                className="w-30  mside-5 rounded"
                value={this.state.awayScore}
                onChange={this.updateMatchWeekData}
                type="number"
              />
            </label>
          </div>
        </form>
        <div>
          {this.state.showMessage && (
            <div onClick={this.hideMessage} className="text-success">
              Match Week Details Updated for `{this.state.matchWeek}`
            </div>
          )}
        </div>

        <button
          type="button"
          className="mside-5 btn btn-secondary"
          onClick={this.matchWeekTeamSubmit}
        >
          Submit
        </button>
        <Link to="/">
          <button className="mside-5 btn btn-primary">
            Back to home Page{" "}
          </button>
        </Link>
        <Link to="/allMatchWeeks">
          <button className="btn btn-primary m5 addTeambasic">
            Match Week Page
          </button>
        </Link>
      </div>
    );
  }
}

export default MatchWeekTeam;
