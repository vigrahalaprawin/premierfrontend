import "./App.css";
import ListPremierTeams from "./components/ListPremierTeams";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AddPremierTeam from "./components/AddPremierTeam";
import MatchWeek from "./components/MatchWeekTeam";
import ListAllMatchWeek from "./components/ListAllMatchWeeks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditPremierTeam from "./components/EditPremierTeam";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />

        <div className="container">
          <Routes>
            <Route path="/" element={<ListPremierTeams />}></Route>
            <Route path="/teams" element={<ListPremierTeams />}></Route>
            <Route path="/addTeam" element={<AddPremierTeam />}></Route>
            <Route path="/editTeam" element={<EditPremierTeam />}></Route>
            <Route path="/matchWeek" element={<MatchWeek />}></Route>
            <Route path="/allMatchWeeks" element={<ListAllMatchWeek />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
