import React from "react";
import DayPicker, { DateUtils } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

export default class Example extends React.Component {

  static defaultProps = {
    numberOfMonths: 2,
  }

  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return { from: null, to: null, };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    
    const {from, to} = this.state;
    const modifiers = {start:from, end:to};

    return (

      <div style={{width:'100%'}}>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, {from, to}]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          style={{padding:0}}
        />
        <style>{`
          .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outs) {
            background-color: #f0f8ff !important;
            color: #4a90e2;
          }
          .Selectable .DayPicker-Day {
            border-radius: 0 !important;
          }
          .Selectable .DayPicker-Day--start {
            border-top-left-radius: 50% !important;
            border-bottom-left-radius: 50% !important;
          }
          .Selectable .DayPicker-Day--end {
            border-top-right-radius: 50% !important;
            border-bottom-right-radius: 50% !important;
          }
        `}}</style>
      </div>

    );

  }

}