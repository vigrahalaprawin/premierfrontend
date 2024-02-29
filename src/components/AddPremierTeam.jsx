import React, { Component } from "react";
import { Link } from "react-router-dom";
import PremierService from "../service/PremierService";

class AddPremierTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      teamCoach: "",
      teamStadium: "",
    };
    this.updateFormData = this.updateFormData.bind(this);
    this.premTeamSubmit = this.premTeamSubmit.bind(this);
  }

  premTeamSubmit(event) {
    const data = {
      teamName: this.state.teamName,
      teamCoach: this.state.teamCoach,
      teamStadium: this.state.teamStadium,
    };

    PremierService.addPremierTeam(data)
      .then((response) => console.log("success scenario"))
      .catch((response) =>
        console.log("Adding team table failed ", response.data)
      );
  }
  updateFormData(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Add Premier League Team</h1>
        <form
          className="d-flex align-items-center"
          name="premadd"
          onSubmit={this.premTeamSubmit}
        >
          <div>
            <label>
              Club Name
              <input
                name="teamName"
                className="mside-5"
                onChange={this.updateFormData}
                value={this.state.teamName}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Club Coach
              <input
                name="teamCoach"
                className="mside-5"
                value={this.state.teamCoach}
                onChange={this.updateFormData}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Club Stadium
              <input
                className="mside-5"
                name="teamStadium"
                value={this.state.teamStadium}
                onChange={this.updateFormData}
                type="text"
              />
            </label>
          </div>
          <Link to="/teams">
            <button
              type="button"
              className="mside-5 btn btn-success"
              onClick={this.premTeamSubmit}
            >
              Submit
            </button>
          </Link>
          <Link to="/">
            <button className="m5 btn btn-primary">Back to home Page </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default AddPremierTeam;
