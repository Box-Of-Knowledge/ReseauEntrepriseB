import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./components/login";
import SignUp from "./components/signup";
import Formations from "./components/formations";
import Home from "./components/home";
import Rgpd from "./components/rgpd"

ReactDOM.render(
      
      <Router>
        < App />
        
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/formations" element={<Formations />} />
              <Route path="/rgpd" element={<Rgpd />} />
          </Routes>
            
        </Router>,
   
    document.getElementById("root")
)