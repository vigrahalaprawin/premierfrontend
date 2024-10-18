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
      matchWeek: null,
      stringList: [],
      displayOption: [],
      selectedTeamList: [],
      newSelectedTeamList: [],
      showMessage: false,
    };
    this.updateMatchWeekData = this.updateMatchWeekData.bind(this);
    this.matchWeekTeamSubmit = this.matchWeekTeamSubmit.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.displayingTeamNames = this.displayingTeamNames.bind(this);
    this.displayingSelectedHomeTeamNames =
      this.displayingSelectedHomeTeamNames.bind(this);
    // this.hidingEntyColumn = this.hidingEntyColumn.bind(this);
  }

  componentDidMount() {
    PremierService.getOnlyPremierTeams().then((response) => {
      this.setState({
        stringList: response.data,
        displayOption: response.data,
      });
    });
  }
  displayingTeamNames(value) {
    MatchWeekService.getTeamsforMatchWeek(value).then((response) => {
      this.setState({
        selectedTeamList: response.data,
      });
    });
  }

  displayingSelectedHomeTeamNames(value) {
    MatchWeekService.getAwayTeamsforMatchWeek(value)
      .then((response) => {
        this.setState(
          {
            newSelectedTeamList: response.data,
          },
          () => {}
        );
      })
      .catch((error) => {
        console.error("Error fetching away teams:", error);
      });
  }

  hideMessage(event) {
    this.setState({
      showMessage: false,
    });
  }

  handleButtonClick(value) {
    this.displayingTeamNames(value);
    this.setState({
      homeTeam: "",
      awayTeam: "",
      matchWeek: value,
      homeScore: 0,
      awayScore: 0,
      showMessage: false,
    });
  }
  matchWeekTeamSubmit(event) {
    console.log("matchweek", this.state.matchWeek);
    event.preventDefault();
    const data = {
      homeTeam: this.state.homeTeam,
      awayTeam: this.state.awayTeam,
      homeScore: this.state.homeScore,
      awayScore: this.state.awayScore,
      matchWeek: this.state.matchWeek,
    };

    PremierService.getOnlyPremierTeams().then((response) => {
      this.setState({
        stringList: response.data,
        displayOption: response.data,
      });
    });

    if (this.state.homeTeam !== "" && this.state.awayTeam !== "") {
      MatchWeekService.addMatchWeek(data)
        .then((response) =>
          this.setState({
            showMessage: true,
          })
        )
        .catch((error) =>
          console.log("we are facing issue while updating matchweek info")
        );
    }

    MatchWeekService.getTeamsforMatchWeek(this.state.matchWeek).then(
      (response) => {
        this.setState({
          selectedTeamList: response.data,
        });
        console.log("updated response", this.state.selectedTeamList);
      }
    );
    this.setState({
      homeTeam: "",
      awayTeam: "",
      homeScore: 0,
      awayScore: 0,
    });
  }

  updateMatchWeekData(event) {
    event.preventDefault();
    this.displayingSelectedHomeTeamNames(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  matchWeekButton() {
    const matchWeekButton = [];
    for (let i = 1; i <= this.state.stringList.length * 2 - 2; i++) {
      matchWeekButton.push(
        <button
          className="mside-5 btn btn-warning"
          key={i}
          onClick={() => this.handleButtonClick(i)}
        >
          MW{i}
        </button>
      );
    }
    return matchWeekButton;
  }

  render() {
    return (
      <div>
        <h1>Add Match Week Results</h1>
        <div className="d-flex">
          Total Number of Teams
          <p className="mside-5">{this.state.stringList.length}</p>
          You will Have
          <p className="mside-5">{this.state.stringList.length * 2 - 2}</p>{" "}
          matchweeks
          <p className="mside-5">
            Each MatchWeek will have {this.state.stringList.length / 2} Match
            Results{" "}
          </p>{" "}
        </div>
        <div className="d-flex justify-content-start">
          {this.matchWeekButton()}
        </div>
        {this.state.matchWeek && (
          <form
            className="d-flex align-items-center"
            name="premadd"
            onSubmit={this.matchWeekTeamSubmit}
          >
            {this.state.selectedTeamList.length !==
            this.state.displayOption.length ? (
              <div>
                <label>
                  Match Week
                  <input
                    name="matchWeek"
                    className="w-30  mside-5 rounded"
                    value={this.state.matchWeek}
                    onChange={this.updateMatchWeekData}
                    type="number"
                    readOnly
                  />
                </label>

                <label>
                  Home Team
                  <select
                    name="homeTeam"
                    className="mside-5 colorblue rounded"
                    value={this.state.homeTeam}
                    onChange={this.updateMatchWeekData}
                  >
                    <option value="">Select Team</option>
                    {this.state.displayOption.map(
                      (string, index) =>
                        !this.state.selectedTeamList.includes(string) && (
                          <option key={index} value={string}>
                            {string}
                          </option>
                        )
                    )}
                  </select>
                </label>
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
                <label className="mside-5">
                  Away Team
                  <select
                    name="awayTeam"
                    className="mside-5 colorblue rounded"
                    value={this.state.awayTeam}
                    onChange={this.updateMatchWeekData}
                  >
                    <option value="">Select Team</option>
                    {this.state.displayOption
                      .filter((n) => n !== this.state.homeTeam)
                      .map(
                        (string, index) =>
                          !this.state.newSelectedTeamList.includes(string) &&
                          !this.state.selectedTeamList.includes(string) && (
                            <option key={index} value={string}>
                              {string}
                            </option>
                          )
                      )}
                  </select>
                </label>
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
            ) : (
              <div>
                All Matches are Completed for the {this.state.matchWeek}
              </div>
            )}
          </form>
        )}
        <div>
          {this.state.showMessage && (
            <div onClick={this.hideMessage} className="text-success">
              Match Week Details Updated for `{this.state.matchWeek}``
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
          <button className="mside-5 btn btn-primary">Home Page</button>
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
