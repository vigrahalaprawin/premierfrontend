import React, { Component } from "react";

import ListPremierTeams from "./ListPremierTeams";

class DeletePremTeam extends Component {
  constructor(props) {
    super(props);
    console.log(" we are in edit compoennt");
    this.state = {
      teamId: [],
    };
  }

  render() {
    return (
      <div>
        <ListPremierTeams />
      </div>
    );
  }
}

DeletePremTeam.propTypes = {};

export default DeletePremTeam;
