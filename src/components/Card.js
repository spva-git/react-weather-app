import React, { Component } from "react";
import WeatherIcon from 'react-icons-weather';

class Card extends Component {  
  render() { 
    const { data, color, backgroundColor, tempUnit } = this.props;
    const cardClassName = `card ${backgroundColor}`;
    const { temp, pressure, humidity } = data.main;
    return ( 
      <div className={cardClassName}>
        <div className="card-content">
          <div style={{ color: `${color}` }}>
            {`Temp: ${Math.round(temp)} °${tempUnit}`}<br />
            {`Date: ${data.dt_txt} `}<br />
            {`Humidity: ${humidity}`}<br />
            {`Presure: ${pressure}`}<br />
            <i className={`wi wi-owm-${data.weather[0].id}`}></i>
            {`: ${data.weather[0].description}`}<br />
          </div>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  color: "#ff0000",
  backgroundColor: "grey lighten-2"
};

export default Card;
