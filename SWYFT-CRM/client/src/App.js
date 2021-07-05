import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from './providers/UserProfileProvider';
import ApplicationViews from './Components/ApplicationViews';
import { LeadProvider } from './providers/LeadProvider';
import SwyftNavbar from './Components/Navbar';
import { LeadStatusProvider } from './providers/LeadStatusProvider';
import { CoverageTypeProvider } from './providers/CoverageTypeProvider';
import { ClientProvider } from './providers/ClientProvider';
import { AppointmentProvider } from './providers/AppointmentProvider'

function App() {
  return (
    <Router>
          <UserProfileProvider>
            <LeadStatusProvider>
              <CoverageTypeProvider>
                <ClientProvider>
                  <LeadProvider>
                    <AppointmentProvider>
                        <SwyftNavbar />
                        <ApplicationViews />
                    </AppointmentProvider>
                  </LeadProvider>
                </ClientProvider>
              </CoverageTypeProvider>
            </LeadStatusProvider>
          </UserProfileProvider>
    </Router>
  );
}

export default App;
