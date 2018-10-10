import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';


class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().startOf('day'),
      endDate: moment().endOf('day'),
      focusedInput: null,
    };
  }

  render() {
    return (
        <DateRangePicker
          noBorder={true}
          minimumNights={0}
          startDateId="startDate"
          endDateId="endDate"
          isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => { 
            console.log("datepicker: ", startDate, endDate)
            this.setState({ startDate, endDate })
            this.props.action(Date.parse(startDate._d), Date.parse(endDate._d))
          }}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
        />
    );
  }
}

export default DatePicker;