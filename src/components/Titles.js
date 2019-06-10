import React, {Component} from "react"


var Titles = props => (
						<div >
							{!props.city && !props.country &&
							<h1 className="title-container__weather_title "> Weather Near You</h1>}
							{props.city && props.country &&
							<h1 className="title-container__weather_title">{props.city}, {props.country}</h1>}
							
							{props.icon && 
							<img className="title-container__weather_title center" src={'https://openweathermap.org/img/w/'+props.icon+'.png'}></img>
							}
						</div>
					)


						//	<div className="icon rainy">
 						//	<div className="cloud"></div>
  						//	<div className="rain"></div>
  						//	</div>

// class Titles extends Component {
// 			render(){
// 				return (
// 						<div>
// 							<h1> Weather Finder </h1>
// 							<p>Find out temperature, condtions and more... </p>
// 						</div>
// 					)
// 			}

// }

export default Titles