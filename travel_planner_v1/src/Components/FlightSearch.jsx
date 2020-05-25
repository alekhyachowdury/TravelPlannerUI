import React, { Component } from "react";
import Axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
class FlightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toCity: "",
      fromCity: "",
      fromDate: "",
      toDate: "",
      res: {},
    };
    //console.log(props);
    this.handleChangeToCity = this.handleChangeToCity.bind(this);
    this.handleChangeFromCity = this.handleChangeFromCity.bind(this);
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeToCity = (event) => {
    this.setState({ toCity: event.target.value });
  };

  handleChangeFromCity = (event) => {
    this.setState({ fromCity: event.target.value });
  };

  handleChangeFromDate = (date) => {
    this.setState({ fromDate: date });
  };

  handleChangeToDate = (date) => {
    this.setState({ toDate: date });
  };

  handleSubmit = (event) => {
    //console.log(this.state.toCity);
    event.preventDefault();
    Axios.post("http://localhost:1880/test", { City: this.state.toCity }).then(
      (response) => {
        console.log(response);
        this.setState({ res: JSON.stringify(response.data) });
        console.log(this.state);
      }
    );
  };

  render() {
    return (
      <div className="FlightSearchMainBackground ">
        <div>
          <h1>Flight Search</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="badge">
              ToDate:
              <ReactDatePicker
                selected={this.state.toDate}
                onChange={this.handleChangeToDate}
              ></ReactDatePicker>
            </label>
            <label className="badge">
              FromDate:
              <ReactDatePicker
                selected={this.state.fromDate}
                onChange={this.handleChangeFromDate}
              ></ReactDatePicker>
            </label>
          </div>
          <div>
            <label className="badge">
              ToCity:
              <input
                type="text"
                value={this.state.toCity}
                onChange={this.handleChangeToCity}
              />
            </label>

            <label className="badge">
              FromCity:
              <input
                type="text"
                value={this.state.toCity}
                onChange={this.handleChangeFromCity}
              />
            </label>
            <Button variant="outline-secondary">
              <input type="submit" value="Submit" />
            </Button>
          </div>
        </form>
        <textarea value={this.state.res} />
      </div>
    );
  }
}

export default FlightSearch;
