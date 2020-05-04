import React, { Component } from "react";
import Axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { toCity: "", fromCity: "", fromDate: "", toDate: "" };
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
    Axios.post("http://localhost:1880/test", this.state).then((response) => {
      console.log(response);
    });
  };

  render() {
    return (
      <div>
        <h1>Travel Planner</h1>
        <form onSubmit={this.handleSubmit}>
          <div className>
            <label>
              ToCity:
              <input
                type="text"
                value={this.state.toCity}
                onChange={this.handleChangeToCity}
              />
            </label>

            <label>
              FromCity:
              <input
                type="text"
                value={this.state.fromCity}
                onChange={this.handleChangeFromCity}
              />
            </label>
          </div>
          <div>
            <label>
              ToDate:
              <ReactDatePicker
                selected={this.state.toDate}
                onChange={this.handleChangeToDate}
              ></ReactDatePicker>
            </label>
            <label>
              FromDate:
              <ReactDatePicker
                selected={this.state.fromDate}
                onChange={this.handleChangeFromDate}
              ></ReactDatePicker>
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Main;
