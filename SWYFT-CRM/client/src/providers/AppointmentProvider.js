import firebase from "firebase/app";
import React, { useState, createContext, useEffect } from "react";
import "firebase/auth";

export const AppointmentContext = React.createContext();

export const AppointmentProvider = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [searchAppointment, setSearchAppointment] = useState("")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/Appointment";

  const getAllAppointments = () => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/getuserappointments/${userProfile.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json()))
    .then(setAppointments);
  };

  const addAppointment = (appointmentToAdd) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointmentToAdd)
    }).then(resp => {
      if (resp.ok) {
         return resp.json()
      }
      throw new Error("Unauthorized");
    }));
  };

  const updateAppointment = (appointmentToUpdate) => {
    return getToken().then((token) =>
    fetch (`${apiUrl}/${appointmentToUpdate.Id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(appointmentToUpdate)
    }))       
}

  const findAppointment = (q) => {
    return fetch(`${apiUrl}/search?q=${q}&sortDesc=true`)
    .then((res) => res.json())
    .then(setAppointments)
  }

  const getAppointment = (id) => {
      return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()))
  }

  const deleteAppointment = (id) => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
  };


  const getCurrentUserAppointments = () => {
     return getToken().then((token) =>
       fetch(`${apiUrl}/getbyuser/${userProfile.id}`, {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }).then((resp) => resp.json())
       .then(setAppointments)
     );
  }

  return (
    <AppointmentContext.Provider value={{ appointments, getAllAppointments, addAppointment, searchAppointment, setSearchAppointment, findAppointment, getAppointment, getCurrentUserAppointments, deleteAppointment, updateAppointment }}>
      {props.children}
    </AppointmentContext.Provider>
  );
};