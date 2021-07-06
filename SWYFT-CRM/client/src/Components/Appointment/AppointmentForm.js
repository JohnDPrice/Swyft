import React, { useContext, useEffect, useState } from "react"
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button
} from "reactstrap";
import { AppointmentContext } from "../../providers/AppointmentProvider";
import { useHistory, useParams } from "react-router-dom";
import { LeadContext } from "../../providers/LeadProvider";

const AppointmentForm = () => {
    const { addAppointment, getAppointment, updateAppointment, getAllAppointments } = useContext(AppointmentContext);
    const { leads, getAllLeads } = useContext(LeadContext);
    const [appointmentInput, setAppointmentInput] = useState({});
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const {appointmentId, leadId} = useParams();
    const history = useHistory();

    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllAppointments()
        getAllLeads()
        .then(() => {
            if (appointmentId) {
              getAppointment(appointmentId)
              .then(appointment  => {
                setAppointmentInput(appointment)
                setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
    }, []);

    const printDate = (leadDate) => {
        let date = new Date(leadDate)
        let isoStringDate = date.toISOString().slice(0, 11).replace('T', '')
        return isoStringDate;
      };

    const formatDate = () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newAppointment = { ...appointmentInput }
        //post is an object with properties , set the property to the new value using obejct bracket notation
        newAppointment[event.target.id] = event.target.value
        //update state
        setAppointmentInput(newAppointment)
    }

    const handleClickSaveLead = (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (appointmentId) {
            // PUT update
            updateAppointment({
                Id: parseInt(appointmentId),
                UserProfileId: userProfileId,
                Title: appointmentInput.title,
                Start: appointmentInput.start,
                End: appointmentInput.end,
                Notes: appointmentInput.notes,
                LeadId: appointmentInput.leadId
            }).then(() => history.push(`/appointment/${appointmentId}`))
        } else if (leadId) {
            addAppointment({
                UserProfileId: userProfileId,
                Title: appointmentInput.title,
                Start: appointmentInput.start,
                End: appointmentInput.end,
                Notes: appointmentInput.notes,
                LeadId: appointmentInput.leadId
            }).then(history.push(`/appointments`))
        }
    }

    return (     
        <div className="container pt-4">
        <div className="row justify-content-center">
          <Card className="col-sm-12 col-lg-6">
            <CardBody>
              <h1> {appointmentId ? <>Update Appointment</> : <>Add Appointment</>}</h1>
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={appointmentInput.title} />
                </FormGroup>
                <FormGroup>
                  <Label for="start">Last Name</Label>
                  <Input type="text" id="start" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Last Name" value={appointmentInput.lastName} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="text" id="email" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Email" value={appointmentInput.email} />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="content" name="dateOfBirth">Date Of Birth</Label>
                  <Input
                    type="date" id="dateOfBirth" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Date Of Birth" value={leadInput.dateOfBirth}
                  />
                </FormGroup> */}
                <FormGroup>
                      <Label for="exampleSelectMulti">Lead Status</Label>
                      <Input type="select" value={appointmentInput.leadStatusId}
                          name="leadStatusId"
                          id="leadStatusId"
                          onChange={handleControlledInputChange}
                          required>
                            <option>Select a lead status</option>
                          {leads.map((lead) => (
                          lead.id === appointmentInput.leadStatusId? <option key={lead.id} selected value={lead.id}>{lead.fullName}</option> : <option key={lead.id} value={lead.id}>{lead.fullName}</option>
                          ))}
                      </Input>
                </FormGroup>
                {/* <FormGroup>
                      <Label for="exampleSelectMulti">Coverage Type</Label>
                      <Input type="select" value={leadInput.coverageTypeId}
                          name="coverageTypeId"
                          id="coverageTypeId"
                          onChange={handleControlledInputChange}
                          required>
                              <option>Select a coverage type</option>
                          {coverageTypes.map((coverageType) => (
                          coverageType.id === leadInput.coverageTypeId? <option key={coverageType.id} selected value={coverageType.id}>{coverageType.name}</option> : <option key={coverageType.id} value={coverageType.id}>{coverageType.name}</option>
                          ))}
                      </Input>
                </FormGroup> */}
              </Form>
              <Button  onClick={handleClickSaveLead} disable={isLoading.toString()}>
                    {appointmentId ? <>Save Lead</> : <>Add Lead</>}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    )
};

export default AppointmentForm;