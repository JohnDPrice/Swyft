import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppointmentContext } from '../../providers/AppointmentProvider'
import { Button } from 'reactstrap';
import moment from 'moment'
import './Calendar.css'
import { useContext, useEffect, useState } from 'react'
import * as dates from '../../utils/dates'
import AppointmentDetails from './AppointmentDetails';
import { useHistory, useParams } from "react-router-dom";


const AppointmentCalendar = () => {
    const { appointments, getAllAppointments } = useContext(AppointmentContext);
    const history = useHistory();

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

      const pushToDetails = (id) => {
        history.push(`appointment/${id}`)
      }

      // handleEventClick = () => {
      //   console.log('event clicked!')
      //  };
      //   render= () => {
      //   const {event, theme} = this.props;
      //   return (
      //       <div onClick={this.handleEventClick} style={{zIndex:999, marginTop: 2, backgroundColor, borderRadius: 10}}>
      //           <div style={{paddingRight: 15}}>
      //               <AppText variant='body2' color='default'>
      //                   {event.title}
      //               </AppText>
      //           </div>
      //       </div>
      //   )
      // }

      return (
        <div>
        <Button onClick={() => history.push('/appointment/add')}>Add new appointment</Button>
        <Calendar
          events={appointments}
          views={allViews}
          step={60}
          showMultiDayTimes
          onSelectEvent={event => pushToDetails(event.id)}
          max={dates.add(dates.endOf(new Date(2023, 1, 1), 'day'), -1, 'hours')}
          defaultDate={new Date()}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          localizer={localizer}
        />
        </div>
      )
  }

export default AppointmentCalendar;