import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { PropagateLoader } from "react-spinners";
import { fetchWeather } from "../actions/actionCreators";
import Header from "../components/Header";
import ChangeUnit from "../components/ChangeUnit";
import WeatherList from "../components/WeatherList";
import Footer from "../components/Footer";

const Container = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;

const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
`;

class App extends Component {
  state = {
    data: null,
    tempUnit: 'C'
  }
  componentDidMount() {
    this.props.fetchWeather("Munich,de");
  }

  changeUnit = (currentTempUnit) => {

    const updatedFor = this.props.data;
    updatedFor.forEach(day => {
      Object.keys(day.list).forEach(key => {
        day.list[key].main.temp = currentTempUnit === 'F' ? 9 / 5 * day.list[key].main.temp + 32 : 5 / 9 * (day.list[key].main.temp - 32);
      });
    });
    this.setState({ data: updatedFor, tempUnit: currentTempUnit  });
  }
  render() {
    const primaryColor = "blue darken-2";
    const secondaryColor = "orange darken-4";
    const { data, errorMessage } = this.props;
    return (
      <div className="container">
        <Container>
          <Header text={"Weather App"} color={primaryColor} />
          <Content>
            <ChangeUnit
              color={secondaryColor}
              changeUnit={this.changeUnit}
              errorMessage={errorMessage}
            />
            {this.props.isLoading && (
              <div className="row">
                <div className="col s12 offset-s6">
                  <PropagateLoader
                    color={"#0336ff"}
                    loading={this.props.isLoading}
                  />
                </div>
              </div>
            )}
            <WeatherList data={data} tempUnit={this.state.tempUnit} />
          </Content>
          <Footer data={data} tempUnit={this.state.tempUnit} color={primaryColor} />
        </Container>
      </div>
    );
  }
}

/*
  Take a portion of the entire application state (managed by redux) and make it
  available to this container component via props.
*/
function mapStateToProps(state) {
  const { data, errorMessage, isLoading } = state.weather;
  const props = {
    data,
    errorMessage,
    isLoading
  };
  return props;
}

/* 
  Bind action creators to props and pass them to all reducers via the dispatch
  function. Anything returned from this function will end up as props on the
  UserList container.
*/
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

/*
  Promote the "dumb" presentational component, to a "smart",
  redux-aware, container component.
*/
const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);
const AppWithRedux = enhance(App);

export { App, AppWithRedux };
