import React, { Component } from "react";
import Axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class HotelSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toCity: "",
      selectedCity: "",
      selectedCityCode: "",
      Adults: "",
      fromDate: "",
      toDate: "",
      roomquantity: "",
      fetchHotelsReq: {
        adults: "",
      },
      fetchHotelsResp: [],
      res: [],
      resCity: [],
      resHotelDetails: [],
      resHotelDetailsFlag: false,
      lat: "",
      lng: "",
      displayHotelSearch: false,
    };
    //console.log(props);
    this.handleChangeToCity = this.handleChangeToCity.bind(this);
    this.handleChangeAdults = this.handleChangeAdults.bind(this);
    this.handleChangeRoomQuantity = this.handleChangeRoomQuantity.bind(this);
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);
    this.handleSubmitDisplay = this.handleSubmitDisplay.bind(this);
    this.handleHotelDetailSubmit = this.handleHotelDetailSubmit.bind(this);
    this.handleFetchHotels = this.handleFetchHotels.bind(this);
  }

  handleChangeToCity = (event) => {
    this.setState({ toCity: event.target.value });
    var postUrl =
      "https://travelplanner2-cc-uc-1-initiators.container-crush-01-4044f3a4e314f4bcb433696c70d13be9-0000.che01.containers.appdomain.cloud/city/CITY/" +
      event.target.value;
    Axios.post(postUrl).then((response) => {
      console.log(response);
      this.setState({ resCity: response.data.data });

      //console.log(this.state);
    });
  };

  handleFetchHotels = (event) => {
    event.preventDefault();
    console.log("flag1");

    var payload = {
      adults: this.state.Adults,
      checkInDate: this.state.fromDate,
      checkOutDate: this.state.toDate,
      cityCode: this.state.selectedCityCode,
      roomQuantity: this.state.roomquantity,
    };
    console.log(payload);
    var postUrl =
      "https://hotelservice2-cc-uc-1-initiators.container-crush-01-4044f3a4e314f4bcb433696c70d13be9-0000.che01.containers.appdomain.cloud/hotel";
    Axios.post(postUrl, payload).then((response) => {
      this.setState({ fetchHotelsResp: response.data.data });

      console.log(this.state.fetchHotelsResp);
    });
  };

  handleChangeAdults = (event) => {
    this.setState({ Adults: event.target.value });
  };
  handleSubmitDisplay = (cityName, cityCode) => {
    //console.log(this.state.toCity);
    this.setState({ selectedCity: cityName });
    this.setState({ selectedCityCode: cityCode });
    this.setState({ displayHotelSearch: true });
  };

  handleChangeFromDate = (date) => {
    this.setState({ fromDate: date });
  };

  handleChangeToDate = (date) => {
    this.setState({ toDate: date });
  };
  handleChangeRoomQuantity = (event) => {
    this.setState({ roomquantity: event.target.value });
  };
  handleHotelDetailSubmit = (hotelID) => {
    console.log(hotelID);
    //event.preventDefault();
    var postUrl =
      "https://hotelservice2-cc-uc-1-initiators.container-crush-01-4044f3a4e314f4bcb433696c70d13be9-0000.che01.containers.appdomain.cloud/hotel/" +
      hotelID;
    console.log(postUrl);
    Axios.get(postUrl).then((response) => {
      console.log(response);
      this.setState({ resHotelDetails: response.data });
      this.setState({ resHotelDetailsFlag: true });
      this.setState({
        lat: this.state.resHotelDetails.data[0].hotelDTO.latitude,
      });
      this.setState({
        lng: this.state.resHotelDetails.data[0].hotelDTO.longitude,
      });
      //console.log(this.state);
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm"></div>
            <div className="HotelSearchFont1 col-sm">
              <h1>Hotel Search</h1>
            </div>
            <div className="col-sm"></div>
          </div>
          <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm HotelSearchFont2">
              <form>
                <div>
                  <label className="badge">
                    City:
                    <input
                      type="text"
                      value={this.state.toCity}
                      onChange={this.handleChangeToCity}
                    />
                  </label>
                </div>
              </form>
            </div>
            <div className="col-sm"></div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg">
              {this.state.resCity.map((value, index) => {
                return (
                  <div className="card cardProp5" key={index}>
                    <div class="card-text cardProp4">
                      <label>
                        <input
                          type="text"
                          readonly
                          className="form-control-plaintext"
                          value={value.cityName}
                        />
                      </label>
                      <button
                        onClick={() =>
                          this.handleSubmitDisplay(
                            value.cityName,
                            value.cityCode
                          )
                        }
                        class="btn btn-sm btn-primary"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-lg">
              {this.state.displayHotelSearch == true && (
                <form onSubmit={this.handleFetchHotels}>
                  <div>
                    <div>
                      <label>
                        Destination:
                        <input
                          type="text"
                          readonly
                          value={this.state.selectedCity}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Destination Code:
                        <input
                          type="text"
                          readonly
                          value={this.state.selectedCityCode}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Adults:
                        <input
                          type="number"
                          value={this.state.Adults}
                          onChange={this.handleChangeAdults}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Rooms:
                        <input
                          type="number"
                          value={this.state.roomquantity}
                          onChange={this.handleChangeRoomQuantity}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        ToDate:
                        <ReactDatePicker
                          selected={this.state.toDate}
                          onChange={this.handleChangeToDate}
                          dateFormat="yyyy-MM-dd"
                        ></ReactDatePicker>
                      </label>
                    </div>
                    <div>
                      <label>
                        FromDate:
                        <ReactDatePicker
                          selected={this.state.fromDate}
                          onChange={this.handleChangeFromDate}
                          dateFormat="yyyy-MM-dd"
                        ></ReactDatePicker>
                      </label>
                    </div>
                  </div>
                  <input type="submit" value="Submit" />
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="container ">
          <div className="row">
            <div className="col-sm">
              {this.state.fetchHotelsResp.map((value, index) => {
                return (
                  <div className="card cardProp1" key={index}>
                    <div class="card-body cardProp2 zoom">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={"Hotel :" + value.hotelDTO.name}
                      />
                      <button
                        onClick={() =>
                          this.handleHotelDetailSubmit(value.hotelDTO.hotelId)
                        }
                        class="btn btn-sm btn-primary"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-lg">
              {this.state.resHotelDetailsFlag == true && (
                <div className="card cardProp7">
                  <div className="card-body cardProp6">
                    <input
                      type="text"
                      readonly
                      class="form-control-plaintext"
                      value={
                        "Rating:" +
                        this.state.resHotelDetails.data[0].hotelDTO.rating
                      }
                    />
                    <input
                      type="text"
                      readonly
                      class="form-control-plaintext"
                      value={
                        "CityCode:" +
                        this.state.resHotelDetails.data[0].hotelDTO.cityCode
                      }
                    />
                    <input
                      type="text"
                      readonly
                      class="form-control-plaintext"
                      value={
                        "City:" +
                        this.state.resHotelDetails.data[0].hotelDTO.address
                          .cityName
                      }
                    />
                    <input
                      type="text"
                      readonly
                      class="form-control-plaintext"
                      value={
                        "Address:" +
                        this.state.resHotelDetails.data[0].hotelDTO.address
                          .lines[0]
                      }
                    />
                    <input
                      type="text"
                      readonly
                      class="form-control-plaintext"
                      value={
                        "Postalcode:" +
                        this.state.resHotelDetails.data[0].hotelDTO.address
                          .postalCode
                      }
                    />
                    <input
                      type="text"
                      readonly
                      class="form-control-plaintext"
                      value={
                        "Fax:" +
                        this.state.resHotelDetails.data[0].hotelDTO.contact.fax
                      }
                    />
                    <input
                      type="text"
                      readonly
                      class="form-control-plaintext"
                      value={
                        "Phone:" +
                        this.state.resHotelDetails.data[0].hotelDTO.contact
                          .phone
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="col-sm">
              {this.state.resHotelDetailsFlag == true && (
                <div style={{ height: "50vh", width: "75%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyAvJcDYHdF5RVlKlQvZuk77EjdVzVXxo8M1",
                    }}
                    defaultCenter={{
                      lat: this.state.lat,
                      lng: this.state.lng,
                    }}
                    defaultZoom={15}
                  ></GoogleMapReact>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelSearch;
