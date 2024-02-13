import React, { Component } from "react";
import { Link } from "react-router-dom";

//import axios from "axios";
import PremierService from "../service/PremierService";

class EditPremierTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: 0,
      teamName: "",
      teamCoach: "",
      teamStadium: "",
      premTeam: [],
    };

    this.editedTeamSubmit = this.editedTeamSubmit.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }
  componentDidMount() {
    const studentId = window.location.href.split("/")[4];
    PremierService.getOnlyPremTeamById(studentId).then((response) => {
      this.setState({ premTeam: response.data });
    });
  }

  editedTeamSubmit(event) {
    const data = {
      teamId: this.state.premTeam.id,
      teamName: this.state.teamName,
      teamCoach: this.state.teamCoach,
      teamStadium: this.state.teamStadium,
    };
    this.setState({ premTeam: data });
    fetch(`http://localhost:8080/api/updateTeam/${data.teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Adjust the Content-Type as needed
      },
      body: JSON.stringify(data), // Include the request body as needed
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ premTeam: response });
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors
      });
  }
  updateFormData(event) {
    // const { name, value } = event.target;

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Edit Premier League Team New Page </h1>
        <form name="premadd" onSubmit={this.editedTeamSubmit}>
          <div>
            <label>
              Enter Club Name
              <input
                name="teamName"
                onChange={this.updateFormData}
                type="text"
                //value={this.state.premTeam.teamName}
                defaultValue={this.state.premTeam.teamName}
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
                defaultValue={this.state.premTeam.teamCoach}
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
                defaultValue={this.state.premTeam.teamStadium}
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
          <button className="m5">Back to home Page </button>
        </Link>
      </div>
    );
  }
}

export default EditPremierTeam;
