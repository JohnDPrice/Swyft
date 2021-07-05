import firebase from "firebase/app";
import React, { useState, createContext, useEffect } from "react";
import "firebase/auth";

export const ClientContext = React.createContext();

export const ClientProvider = (props) => {
  const [clients, setClients] = useState([]);
  const [searchClient, setSearchClient] = useState("")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/Client";

  const getAllClients = () => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/getuserclients/${userProfile.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json()))
    .then(setClients);
  };

  const addClient = (clientToAdd) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clientToAdd)
    }).then(resp => {
      if (resp.ok) {
         return resp.json()
      }
      throw new Error("Unauthorized");
    }));
  };

  const updateClient = (clientToUpdate) => {
    return getToken().then((token) =>
    fetch (`${apiUrl}/${clientToUpdate.Id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clientToUpdate)
    }))       
}

  const findClient = (q) => {
    return fetch(`${apiUrl}/search?q=${q}&sortDesc=true`)
    .then((res) => res.json())
    .then(setClients)
  }

  const getClient = (id) => {
      return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()))
  }

  const deleteClient = (id) => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
  };


  const getCurrentUserClients = () => {
     return getToken().then((token) =>
       fetch(`${apiUrl}/getbyuser/${userProfile.id}`, {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }).then((resp) => resp.json())
       .then(setClients)
     );
  }

  return (
    <ClientContext.Provider value={{ clients, getAllClients, addClient, searchClient, setSearchClient, findClient, getClient, getCurrentUserClients, deleteClient, updateClient }}>
      {props.children}
    </ClientContext.Provider>
  );
};