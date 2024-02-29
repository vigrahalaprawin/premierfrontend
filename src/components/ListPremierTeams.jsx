import React, { Component } from "react";
import { Link } from "react-router-dom";
import PremierService from "../service/PremierService";

class ListPremierTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premTeams: [],
    };
    this.deletePremTeam = this.deletePremTeam.bind(this);
  }

  componentDidMount() {
    PremierService.getPremierTeams().then((response) => {
      this.setState({ premTeams: response.data });
    });
  }
  deletePremTeam(event) {
    const premId = event.target.id;
    PremierService.deletePremierTeam(premId)
      .then((response) => {
        this.setState({
          premTeams: response.data,
        });
        console.log("Team deleted successfully");
      })
      .catch((error) => console.log("error while deleting the premier team"));
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Premier League Teams</h2>

        <div>
          <Link to="/addTeam">
            <button className="btn btn-primary m5 addTeambasic">
              Add Team
            </button>
          </Link>
          <Link to="/matchWeek">
            <button className="btn btn-primary m5 addTeambasic">
              Add Match Week Results
            </button>
          </Link>
          <Link to="/allMatchWeeks">
            <button className="btn btn-primary m5 addTeambasic">
              Match Week HomePage
            </button>
          </Link>
        </div>

        <div className="row">
          <table className="table  table-striped table-bordered text-center">
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
                    <button
                      className="btn btn-danger"
                      id={premTeam.id}
                      onClick={this.deletePremTeam}
                    >
                      Delete
                    </button>
                    <Link to={`/editTeam/${premTeam.id}`}>
                      <button className="m5 btn btn-secondary" id={premTeam.id}>
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListPremierTeams;
