import React, { Component } from "react";
import { Link } from "react-router-dom";
import PremierService from "../service/PremierService";

class ListPremierTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premTeams: [],
    };
  }

  componentDidMount() {
    PremierService.getPremierTeams().then((response) => {
      this.setState({ premTeams: response.data });
    });
  }

  deletePremTeam(event) {
    const premId = event.target.id;
    fetch(`http://localhost:8080/api/deleteTeam/${premId}`, {
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
        <h2 className="text-center">Premier League Teams</h2>
        <Link to="/addTeam">
          <button className="btn btn-primary m5 addTeambasic">Add Team</button>
        </Link>

        <div className="row">
          <table className="table  table-striped table-bordered">
            <thead>
              <tr>
                <th>Club Name</th>
                <th>Club Coach</th>
                <th>Club Stadium</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.premTeams.map((premTeam) => (
                <tr key={premTeam.id}>
                  <td>{premTeam.teamName}</td>
                  <td>{premTeam.teamCoach}</td>
                  <td>{premTeam.teamStadium}</td>
                  <td>
                    <button id={premTeam.id} onClick={this.deletePremTeam}>
                      Delete
                    </button>

                    <Link to="/editTeam">
                      <button
                        className="m5"
                        id={premTeam.id}
                        onClick={this.updatePremTeam}
                      >
                        Edit
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
            <label>Adding Match Week Information</label>
            <button className="btn btn-primary m5 addTeambasic">Add</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListPremierTeams;
