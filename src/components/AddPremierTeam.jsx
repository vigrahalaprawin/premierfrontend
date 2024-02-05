import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    fetch("http://localhost:8080/api/addTeam", {
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
  updateFormData(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Add Premier League Team</h1>
        <form name="premadd" onSubmit={this.premTeamSubmit}>
          <div>
            <label>
              Enter Club Name
              <input
                name="teamName"
                onChange={this.updateFormData}
                value={this.state.teamName}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Enter Club Stadium
              <input
                name="teamCoach"
                value={this.state.teamCoach}
                onChange={this.updateFormData}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Enter Club Coach
              <input
                name="teamStadium"
                value={this.state.teamStadium}
                onChange={this.updateFormData}
                type="text"
              />
            </label>
          </div>
          <Link to="/">
            <button type="button" className="m5" onClick={this.premTeamSubmit}>
              Submit
            </button>
          </Link>
        </form>
        <Link to="/">
          <button className="m5">Back to home Page </button>
        </Link>
      </div>
    );
  }
}

export default AddPremierTeam;
