import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.css";
//Klucz do API
const APIkey = "882cb5500894ec7e4604a5304d6d6507";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: false,
  };

  handleInputChage = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // handleCitySubmit = (e) => {
  //   e.preventDefault();

  //   const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric`;

  //   fetch(API)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response;
  //       }
  //       throw Error("Nie udało się");
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const time = new Date().toLocaleString();
  //       this.setState((state) => ({
  //         err: false,
  //         date: time,
  //         sunrise: data.sys.sunrise,
  //         sunset: data.sys.sunset,
  //         temp: data.main.temp,
  //         pressure: data.main.pressure,
  //         wind: data.wind.speed,
  //         city: state.value,
  //       }));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState((prevState) => {
  //         return {
  //           err: true,
  //           city: prevState.value,
  //         };
  //       });
  //     });
  // };

  componentDidUpdate(prevProps, prevState) {
    // console.log("poprzednia wartość " + prevState.value);
    // console.log("aktualna wartość " + this.state.value);

    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric`;

      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie udało się");
        })
        .then((response) => response.json())
        .then((data) => {
          const time = new Date().toLocaleString();
          this.setState((state) => ({
            err: false,
            date: time,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            city: state.value,
          }));
        })
        .catch((err) => {
          console.log(err);
          this.setState((prevState) => {
            return {
              err: true,
              city: prevState.value,
            };
          });
        });
    }
  }
  render() {
    return (
      <div className="App">
        <Form value={this.state.value} change={this.handleInputChage} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
