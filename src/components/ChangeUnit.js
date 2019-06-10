import React, { Component } from "react";
import Toggle from 'material-ui/Toggle';
import styled from 'styled-components';


const ToggleStyles = {
    width: 'auto',
    marginLeft: 'auto'
  };
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: right;
`;

class ChangeUnit extends Component {
  state = {
    tempUnit: 'C'
  }
  constructor(props) {
    super(props);
    this.state = { tempUnit: "C" };
    this.onChange = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.changeTempUnit(this.state.tempUnit);
    // for convenience, when the user submit the form, we clean up the input
    this.setState({ unit: "C" });
  }

  onInputChange(event) {
    this.setState({ unit: event.target.value });
  }
  changeTempUnit = () => {
    const updatedTempUnit = this.state.tempUnit === 'C' ? 'F' : 'C';
    this.setState({ tempUnit: updatedTempUnit });
    this.props.changeUnit(updatedTempUnit);
  }


  render() {
    return (
      <Wrapper>
      <Toggle
        onToggle={this.changeTempUnit}
        label={`Change to °${this.state.tempUnit === 'C' ? 'F' : 'C'}`}
        labelStyle={{ whiteSpace: 'nowrap' }}
        style={ToggleStyles}
        />
        </Wrapper>
    );
  }
}
export default ChangeUnit;
