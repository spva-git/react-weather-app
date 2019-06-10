import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../components/Card";
import ItemsCarousel from 'react-items-carousel';

class Weather extends Component {
  componentWillMount() {
    this.setState({
      children: [],
      activeItemIndex: 0,
    });
  }
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const { list, tempUnit } = this.props;
    return (
      <ItemsCarousel
        gutter={12}
        activePosition={'center'}
        chevronWidth={60}
        numberOfCards={3}
        slidesToScroll={2}
        outsideChevron={true}
        showSlither={false}
        firstAndLastGutter={false}
        activeItemIndex={this.state.activeItemIndex}
        requestToChangeActive={value => this.setState({ activeItemIndex: value })}
        rightChevron={'>>'}
        leftChevron={'<<'}
      >
        {list.map((d, key) => {
          return <Card
            key={key}
            data={d}
            color={"#dd2c00"}
            tempUnit={tempUnit}
          />;
      })}
    </ItemsCarousel>
  );
  }
}
Weather.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coord: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired
    }),
    country: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.object)
};

export default Weather;
