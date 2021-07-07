import React, { useEffect, useContext, useState } from "react";
import { Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from "reactstrap";
import { LeadContext } from "../../providers/LeadProvider";
import { FaCalendar } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { AppointmentContext } from "../../providers/AppointmentProvider";
const LeadDetails = () => {
  const [lead, setLead] = useState();
  const { id } = useParams();
  const [ modal, setModal ] = useState(false)
  const { getLead, updateLead } = useContext(LeadContext);
  const { addAppointment } = useContext(AppointmentContext);
  const [ appointmentInput, setAppointmentInput ] = useState({});
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getLead(id).then(setLead);
  }, []);

  const handleClick = () => {
      history.push("/leads")
  }

  const handleControlledInputChange = (event) => {
    //creating a copy of state to change and then set, using spread syntax to copy an object
    let newAppointment = { ...appointmentInput }
    //post is an object with properties , set the property to the new value using obejct bracket notation
    newAppointment[event.target.id] = event.target.value
    //update state
    setAppointmentInput(newAppointment)
  }

  const printDate = () => {
    const d = new Date();
    const timeOffset = d.getTimezoneOffset() * 60000;
    if (d.getTimezoneOffset() > 0) {
      d.setTime(d.getTime() - timeOffset);
    } else {
      d.setTime(d.getTime() + timeOffset);
    }
    return d;
  };

  const convertToClient = () => {
        // PUT update
        updateLead({
            Id: parseInt(id),
            UserProfileId: lead.userProfileId,
            FirstName: lead.firstName,
            LastName: lead.lastName,
            Email: lead.email,
            DateOfBirth: lead.dateOfBirth,
            DateCreated: lead.dateCreated,
            CoverageTypeId: lead.coverageTypeId,
            LeadStatusId: lead.leadStatusId,
            InsuranceCompanyId: 1, 
            Client: true,
            Sold: true,
            SoldDate: printDate()
        })
        .then(history.push(`/client/${id}`))
  }

  const handleClickSaveAppointment = (event) => {
    event.preventDefault();
    setIsLoading(true);
        addAppointment({
            UserProfileId: parseInt(userProfileId),
            Title: appointmentInput.title,
            Notes: appointmentInput.notes,
            Start: appointmentInput.start,
            End: appointmentInput.end,
            AllDay: null,
            LeadId: parseInt(id)
        }).then(history.push(`/appointments`))
  }

  if (!lead) {
    return null;
  }

  return (
    <Row>
      <Col sm="12">
        <Card body>
          <FaCalendar onClick={toggle} />
          <CardTitle tag="h3">{lead.fullName}</CardTitle>
          <CardText>{lead.content}</CardText>
          <strong>{lead.email}</strong>
          <strong>{lead.leadStatus.name}</strong>
          <Button color="danger" size="sm" onClick={convertToClient}>Convert to client and mark as sold</Button>
          <Button onClick={handleClick}>Go Back</Button>
          <Modal isOpen={modal} toggle={toggle} style={{textAlign: "center"}}>
            <ModalHeader>Schedule Appointment with: {lead.fullName}</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={appointmentInput.title}/>
                </FormGroup>
                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input type="text" id="notes" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Notes" value={appointmentInput.notes}/>
                </FormGroup>
                <FormGroup>
                  <Label for="start">Start Date and Time</Label>
                  <Input type="datetime-local" id="start" required autoFocus className="form-control" onChange={handleControlledInputChange} value={appointmentInput.start}/>
                </FormGroup>
                <FormGroup>
                  <Label for="end">End Date and Time</Label>
                  <Input type="datetime-local" id="end" required autoFocus className="form-control" onChange={handleControlledInputChange} value={appointmentInput.end}/>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleClickSaveAppointment}>Save Appointment</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Card>
      </Col>
    </Row>
  );
};

export default LeadDetails;