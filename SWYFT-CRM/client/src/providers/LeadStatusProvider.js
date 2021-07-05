import firebase from "firebase/app";
import React, { useState, createContext, useEffect } from "react";
import "firebase/auth";

export const LeadStatusContext = React.createContext();

export const LeadStatusProvider = (props) => {
  const [leadStatuses, setLeadStatuses] = useState([]);
  const [searchLeadStatus, setSearchLeadStatus] = useState("")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/LeadStatus";

  const getAllLeadStatuses = () => {
    return getToken().then((token) => 
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json()))
    .then(setLeadStatuses);
  };

  const addLeadStatus = (leadstatusToAdd) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "Lead",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(leadstatusToAdd)
    }).then(resp => {
      // debugger
      if (resp.ok) {
         return resp.json()
      }
      throw new Error("Unauthorized");
    }));
  };

  const updateLeadStatus = (leadStatusToUpdate) => {
    return getToken().then((token) =>
    fetch (`${apiUrl}/${leadStatusToUpdate.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leadStatusToUpdate)
    }))       
}

  const findLeadStatus = (q) => {
    return fetch(`${apiUrl}/search?q=${q}&sortDesc=true`)
    .then((res) => res.json())
    .then(setLeadStatuses)
  }

  const getLeadStatus = (id) => {
      return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()))
  }

  const deleteLeadStatus = (id) => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
  };


//   const getCurrentUserLeads = () => {
//      return getToken().then((token) =>
//        fetch(`${apiUrl}/getbyuser/${userProfile.id}`, {
//          method: "GET",
//          headers: {
//            Authorization: `Bearer ${token}`,
//          },
//        }).then((resp) => resp.json())
//        .then(setLeads)
//      );
//   }

  return (
    <LeadStatusContext.Provider value={{ leadStatuses, getAllLeadStatuses, addLeadStatus, searchLeadStatus, setSearchLeadStatus, findLeadStatus, getLeadStatus, deleteLeadStatus, updateLeadStatus }}>
      {props.children}
    </LeadStatusContext.Provider>
  );
};