



import React from "react";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";

function App() {
  
  return (
    <>
    
      <Router>
        <Navbar />
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
