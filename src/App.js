import React from "react";
import './App.css';
import './config'
import { apikey } from "./config";


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      temperature: 0,
      lat: 0,
      long:0,
      wind:0,
      humidity:0,
      feellike:0,
      timezone:"",
      time:0,
      city:"Bangalore",
      country:"",
      region:"",
      condition:""
    }
  }
  
  

  componentDidMount() {
    this.getData("Delhi");
  }

  getData =(value) =>{
    fetch(`http://api.weatherstack.com/current?access_key=${apikey}&query=`+value)
    .then((response)=>response.json())
    .then((json)=>{
      this.setState({
        temperature:json.current.temperature,
        humidity:json.current.humidity,
        feellike:json.current.feelslike,
        wind:json.current.wind_speed,
        lat:json.location.lat,
        long:json.location.lon,
        timezone:json.location.timezone_id,
        time:json.location.localtime,
        country:json.location.country,
        region:json.location.region,
        city:value,
        condition:json.current.weather_descriptions,
        
      })
      console.log(json);
      
    })
    .catch((error)=> {
      console.error(error);

    })
  }
  render() {
    return (
      <div>
        <h1>WEATHER APP</h1>
        <div className="city" onClick={()=>{
          this.getData("Bangalore");
        }}>Bangalore</div>
        <div className="city" onClick={()=>{
          this.getData("Delhi");
        }}>Delhi</div>
        <div className="city" onClick={()=>{
          this.getData("Mumbai");
        }}>Mumbai</div>

        <div className="container">
          {/* WEATHER COMPONENT */}
          <div className="weather">
            <div className="container-inner">
              {/* LEFT SIDE CONTENT */}
              <div className="content-inner left-side">
                <span className="primary">{this.state.city}</span>
                <br />
                <span className="secondary">as of {new Date().toString()}</span>
                <br />
                

                <span className="temp">{this.state.temperature}</span>
                <br />
                

                
                
                <span className="secondary">{this.state.condition}</span>
                <br />
              </div>
              {/* RIGHT SIDE CONTENT */}
              <div className="content-inner right-side">
                <span className="primary">{this.state.humidity}</span>
                <br />
                <span className="secondary">Humidity</span>
                <br />
                <br />

                <span className="primary">{this.state.feellike}</span>
                <br />
                <span className="secondary">Feels like</span>
                <br />
                <br />

                <span className="primary">{this.state.wind}</span>
                <br />
                <span className="secondary">wind</span>
                <br />
                <br />
              </div>
            </div>
          </div>

          {/* DETAILS COMPONENT */}
          <div className="details">
            <div className="container-inner">
              {/* LEFT SIDE CONTENT */}
              <div className="content-inner">
                <br />
                <br />

                <span className="primary">{this.state.country}/{this.state.region}</span>
                <br />
                <span className="secondary">Location</span>
                <br />
                <br />
                <br />
                <br />
               

                <span className="primary">{this.state.timezone}</span>
                <br />
                <span className="secondary">Time Zone</span>
                <br />
                <br />
              </div>
              {/* RIGHT SIDE CONTENT */}
              <div className="content-inner">
                <br />
                <br />

                <span className="primary">{this.state.time}</span>
                <br />
                <span className="secondary">Local Time</span>
                <br />
                <br />
                <br />
                <br />
                

                <span className="primary">{this.state.lat}/{this.state.long}</span>
                <br />
                <span className="secondary">Co-ordinates</span>
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


