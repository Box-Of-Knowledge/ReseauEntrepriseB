import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link } from "react-router-dom";
import logo from "./img/only_logo.png";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{fontSize: "20px"}}>
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} style={{width: "47px", marginRight: "40px"}}/></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Connexion</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Inscription</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/formations"}>Formations</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default App;