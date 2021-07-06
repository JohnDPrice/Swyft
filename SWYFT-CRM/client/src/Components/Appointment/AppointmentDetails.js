import React, { useEffect, useContext, useState } from "react";
import { Card, Button, CardTitle, CardText, Row, Col, Media, CardImg } from "reactstrap";
import { AppointmentContext } from "../../providers/AppointmentProvider"
import { useHistory, useParams } from "react-router-dom";

const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState();
  const { id } = useParams();
  const { getAppointment } = useContext(AppointmentContext);
  const history = useHistory();

  useEffect(() => {
    getAppointment(id).then(setAppointment);
  }, []);

  const handleClick = () => {
      history.push("/appointments")
  }

  if (!appointment) {
    return null;
  }

  return (
    <Row>
      <Col sm="12">
        <Card body>
          <CardTitle tag="h3">{appointment.title}</CardTitle>
          <CardText>{appointment.notes}</CardText>
          <strong>{appointment.lead.firstName}</strong>
          <Button onClick={handleClick}>Go Back</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default AppointmentDetails;