import React, { Component } from "react";
import { Link } from "react-router-dom";

import PremierService from "../service/PremierService";

class EditPremierTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premTeam: [],
      teamName: "",
      teamCoach: "",
      teamStadium: "",
    };

    this.editedTeamSubmit = this.editedTeamSubmit.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }
  componentDidMount() {
    const studentId = window.location.href.split("/")[4]; //need to change according to the URL
    PremierService.getOnlyPremTeamById(studentId).then((response) => {
      this.setState({ premTeam: response.data });
    });
  }

  editedTeamSubmit(event) {
    const matchId = this.state.premTeam.id;
    this.setState({
      premTeam: this.state.premTeam,
    });
    fetch(`http://localhost:8080/api/updateTeam/${matchId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Adjust the Content-Type as needed
      },
      body: JSON.stringify(this.state.premTeam), // Include the request body as needed
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ premTeam: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateFormData(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      premTeam: {
        ...prevState.premTeam,
        [event.target.name]: event.target.value,
      },
    }));
  }

  render() {
    return (
      <div>
        <h1>Edit Premier League Team </h1>
        <form
          name="premadd"
          className="d-flex"
          onSubmit={this.editedTeamSubmit}
        >
          <div>
            <label className="margin-5">
              Enter Club Name
              <input
                className="mside-5 rounded  border-4"
                name="teamName"
                onChange={this.updateFormData}
                type="text"
                value={this.state.premTeam.teamName}
              />
            </label>
          </div>
          <div>
            <label>
              Enter Club Coach
              <input
                className="mside-5 rounded"
                name="teamCoach"
                onChange={this.updateFormData}
                type="text"
                value={this.state.premTeam.teamCoach}
              />
            </label>
          </div>
          <div>
            <label>
              Enter Club Stadium
              <input
                className="mside-5 rounded"
                name="teamStadium"
                onChange={this.updateFormData}
                type="text"
                value={this.state.premTeam.teamStadium}
              />
            </label>
          </div>
          <div>
            <Link to="/">
              <button
                type="button"
                className="mside-5 btn btn-secondary"
                onClick={this.editedTeamSubmit}
              >
                Submit
              </button>
            </Link>
            <Link to="/">
              <button type="button" className=" mside-5 btn btn-primary">
                Back to home Page
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default EditPremierTeam;
