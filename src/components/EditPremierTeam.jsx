import React, { Component } from "react";
import { Link } from "react-router-dom";

import PremierService from "../service/PremierService";

class EditPremierTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premTeam: [],
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
        <form name="premadd" onSubmit={this.editedTeamSubmit}>
          <div>
            <label>
              Enter Club Name
              <input
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
                name="teamStadium"
                onChange={this.updateFormData}
                type="text"
                value={this.state.premTeam.teamStadium}
              />
            </label>
          </div>
          <Link to="/">
            <button
              type="button"
              className="m5"
              onClick={this.editedTeamSubmit}
            >
              Submit
            </button>
          </Link>
        </form>

        <Link to="/">
          <button type="button" className="m5">
            Back to home Page{" "}
          </button>
        </Link>
      </div>
    );
  }
}

export default EditPremierTeam;
