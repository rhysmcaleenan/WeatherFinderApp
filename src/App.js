import React, {Component} from "react"

import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import PageTitle from "./components/PageTitle"
const unsplash = require('unsplash-api');
var API_KEY ="1ee407c3b086dbfe0f4d9a54ce009719";

unsplash.init('ca9680a200cc0897f1c481f5b91dc3e9736816253e893aeaddcf7f3f3c8d6329');


class App extends Component {

  state = {

    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    icon: undefined

  }


  getWeather = async (e) => {


          e.preventDefault();

          var city = e.target.elements.city.value;

          var country = e.target.elements.country.value;

          var api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);

          var data = await api_call.json();

          if(data.weather){

           var image =   this.callUnsplashApi(city)
              this.setState({
                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    error: ""
              });
        } 
        else{
               this.setState({
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    error: "Please enter the values.."
              });
        }


  }
  callUnsplashApi = async (location) => {
    unsplash.searchPhotos(location, null, null, null, function(error, photos, link) {
      let body = photos;
      var randomPhotoNumber = Math.floor(Math.random() * 10);
      let div = document.getElementById ("title-container");

      if(photos.length > 0){
        div.style.backgroundImage = "url('" + photos[randomPhotoNumber].urls.regular + "')";
      }
      else {
          let link='(/static/media/bg.01cb978b.png'
          div.style.backgroundImage = "url("+link+")";
        }

        }
      )
     ;
   };



          render(){


                return(

                  <div>
                       <div className="wrapper">
                          <div className="main">
                              <div className="container">
                                
                                  <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-m-12 col-lg-12 title">
                                      <PageTitle />
                                    </div>
                                  </div>
                                  

                                    <div className="row">

                                      <div className="col-xs-7 col-sm-7 col-m-7 col-lg-7 form-container">
                                        <Form 
                                            getWeather={this.getWeather} 
                                        />
                                        <Weather 
                                            temperature={this.state.temperature} 
                                            humidity={this.state.humidity}
                                            city={this.state.city}
                                            country={this.state.country}
                                            description={this.state.description}
                                            error={this.state.error}
                                            icon= {this.state.icon}
                                        />
                                  </div>

                                   <div className="col-xs-5 col-sm-5 col-m-5 col-lg-5 title-container" id="title-container">
                                      <Titles temperature={this.state.temperature} 
                                            humidity={this.state.humidity}
                                            city={this.state.city}
                                            country={this.state.country}
                                            description={this.state.description}
                                            error={this.state.error}
                                            icon= {this.state.icon}
                                            />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
      

                  )
          }

}

export default App