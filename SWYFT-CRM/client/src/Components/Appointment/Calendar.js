import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppointmentContext } from '../../providers/AppointmentProvider'
import moment from 'moment'
import './Calendar.css'
import { useContext, useEffect, useState } from 'react'
import * as dates from '../../utils/dates'


const AppointmentCalendar = () => {
    const { appointments, getAllAppointments } = useContext(AppointmentContext);

      // Setup the localizer by providing the moment object to the localizer
    const localizer = momentLocalizer(moment)
    let allViews = Object.keys(Views).map(k => Views[k])

    const ColoredDateCellWrapper = ({ children }) =>
      React.cloneElement(React.Children.only(children), {
        style: {
          backgroundColor: 'lightblue',
        },
      })

      useEffect(() => {
        getAllAppointments();
      })

      return (
        <Calendar
          events={appointments}
          views={allViews}
          step={60}
          showMultiDayTimes
          max={dates.add(dates.endOf(new Date(2023, 1, 1), 'day'), -1, 'hours')}
          defaultDate={new Date()}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          localizer={localizer}
        />
      )
  }

export default AppointmentCalendar;