import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HotelSearch from "./Components/HotelSearch";
import FlightSearch from "./Components/FlightSearch";
import Header from "./Components/Header";
import About from "./Components/About";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <React.StrictMode>
    <Header />

    <Router>
      <Button variant="outline-secondary" href="/about">
        About
      </Button>

      <Button variant="outline-secondary" href="/hotelSearch">
        Search Hotels
      </Button>
      <Button variant="outline-secondary" href="/flightSearch">
        Search Flights
      </Button>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/hotelSearch">
          <HotelSearch />
        </Route>
        <Route path="/flightSearch">
          <FlightSearch />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
