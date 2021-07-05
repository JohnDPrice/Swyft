import firebase from "firebase/app";
import React, { useState, createContext, useEffect } from "react";
import "firebase/auth";

export const LeadContext = React.createContext();

export const LeadProvider = (props) => {
  const [leads, setLeads] = useState([]);
  const [searchLead, setSearchLead] = useState("")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/Lead";

  const getAllLeads = () => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/getuserleads/${userProfile.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json()))
    .then(setLeads);
  };

  const addLead = (leadToAdd) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(leadToAdd)
    }).then(resp => {
      if (resp.ok) {
         return resp.json()
      }
      // throw new Error("Unauthorized");
    }));
  };

  const updateLead = (leadToUpdate) => {
    return getToken().then((token) =>
    fetch (`${apiUrl}/${leadToUpdate.Id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leadToUpdate)
    }))       
}

  const findLead = (q) => {
    return fetch(`${apiUrl}/search?q=${q}&sortDesc=true`)
    .then((res) => res.json())
    .then(setLeads)
  }

  const getLead = (id) => {
      return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()))
  }

  const deleteLead = (id) => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
  };


  const getCurrentUserLeads = () => {
     return getToken().then((token) =>
       fetch(`${apiUrl}/getbyuser/${userProfile.id}`, {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }).then((resp) => resp.json())
       .then(setLeads)
     );
  }

  return (
    <LeadContext.Provider value={{ leads, getAllLeads, addLead, searchLead, setSearchLead, findLead, getLead, getCurrentUserLeads, deleteLead, updateLead }}>
      {props.children}
    </LeadContext.Provider>
  );
};