import firebase from "firebase/app";
import React, { useState, createContext, useEffect } from "react";
import "firebase/auth";

export const CoverageTypeContext = React.createContext();

export const CoverageTypeProvider = (props) => {
  const [coverageTypes, setCoverageTypes] = useState([]);
  const [searchCoverageType, setSearchCoverageType] = useState("")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const apiUrl = "https://localhost:5001/api/CoverageType";

  const getAllCoverageTypes = () => {
    return getToken().then((token) => 
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json()))
    .then(setCoverageTypes);
  };

  const addCoverageType = (coverageTypeToAdd) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(coverageTypeToAdd)
    }).then(resp => {
       debugger
      if (resp.ok) {
         return resp.json()
      }
      throw new Error("Unauthorized");
    }));
  };

  const updateCoverageType = (coverageTypeToUpdate) => {
    return getToken().then((token) =>
    fetch (`${apiUrl}/${coverageTypeToUpdate.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coverageTypeToUpdate)
    }))       
}

  const findCoverageType = (q) => {
    return fetch(`${apiUrl}/search?q=${q}&sortDesc=true`)
    .then((res) => res.json())
    .then(setCoverageTypes)
  }

  const getCoverageType = (id) => {
      return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()))
  }

  const deleteCoverageType = (id) => {
    return getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
  };


  const getCurrentUserCoverageTypes = () => {
     return getToken().then((token) =>
       fetch(`${apiUrl}/getbyuser/${userProfile.id}`, {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }).then((resp) => resp.json())
       .then(setCoverageTypes)
     );
  }

  return (
    <CoverageTypeContext.Provider value={{ coverageTypes, getAllCoverageTypes, addCoverageType, searchCoverageType, setSearchCoverageType, findCoverageType, getCoverageType, getCurrentUserCoverageTypes, deleteCoverageType, updateCoverageType }}>
      {props.children}
    </CoverageTypeContext.Provider>
  );
};