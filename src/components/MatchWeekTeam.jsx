import React, { Component } from "react";
import { Link } from "react-router-dom";
import MatchWeekService from "../service/MatchWeekService";
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
    MatchWeekService.deletingMatchWeekById(premId)
      .then((response) => console.log("deleted the matchID"))
      .catch((error) => console.log(error));
  }

  matchWeekTeamSubmit(event) {
    const data = {
      homeTeam: this.state.homeTeam,
      awayTeam: this.state.awayTeam,
      homeScore: this.state.homeScore,
      awayScore: this.state.awayScore,
      matchWeek: this.state.matchWeek,
    };

    MatchWeekService.addMatchWeek(data)
      .then((response) =>
        this.setState({
          showMessage: true,
        })
      )
      .catch((error) =>
        console.log("we are facing issue while updating matchweek info")
      );
    event.preventDefault();
  }
  updateMatchWeekData(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h1>Add Match Week Results</h1>
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
