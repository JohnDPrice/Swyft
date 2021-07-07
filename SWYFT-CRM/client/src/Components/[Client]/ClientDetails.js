import React, { useEffect, useContext, useState } from "react";
import { Card, Button, CardTitle, CardText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label} from "reactstrap";
import { ClientContext } from "../../providers/ClientProvider";
import { AppointmentContext } from "../../providers/AppointmentProvider";
import { FaCalendar } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";

const ClientDetails = () => {
  const [client, setClient] = useState();
  const [ appointmentInput, setAppointmentInput ] = useState({});
  const [ modal, setModal ] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { getClient } = useContext(ClientContext);
  const { addAppointment } = useContext(AppointmentContext);
  const history = useHistory();
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getClient(id).then(setClient);
  }, []);

  const handleControlledInputChange = (event) => {
    //creating a copy of state to change and then set, using spread syntax to copy an object
    let newAppointment = { ...appointmentInput }
    //post is an object with properties , set the property to the new value using obejct bracket notation
    newAppointment[event.target.id] = event.target.value
    //update state
    setAppointmentInput(newAppointment)
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

  const handleClick = () => {
      history.push("/clients")
  }

  if (!client) {
    return null;
  }

  return (
    <Row>
      <Col sm="12">
        <Card body>
          <FaCalendar onClick={toggle} />
          <CardTitle tag="h3">{client.fullName}</CardTitle>
          <CardText>{client.content}</CardText>
          <strong>{client.email}</strong>
          <strong>{client.leadStatus.name}</strong>
          <Button onClick={handleClick}>Go Back</Button>
          <Modal isOpen={modal} toggle={toggle} style={{textAlign: "center"}}>
            <ModalHeader>Schedule Appointment with: {client.fullName}</ModalHeader>
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

export default ClientDetails;