import React, { useEffect, useContext, useState } from "react";
import { Card, Button, CardTitle, CardText, Row, Col, Media, CardImg } from "reactstrap";
import { ClientContext } from "../../providers/ClientProvider";
import { useHistory, useParams } from "react-router-dom";

const ClientDetails = () => {
  const [client, setClient] = useState();
  const { id } = useParams();
  const { getClient } = useContext(ClientContext);
  const history = useHistory();

  useEffect(() => {
    getClient(id).then(setClient);
  }, []);

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
          <CardTitle tag="h3">{client.fullName}</CardTitle>
          <CardText>{client.content}</CardText>
          <strong>{client.email}</strong>
          <strong>{client.leadStatus.name}</strong>
          <Button onClick={handleClick}>Go Back</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default ClientDetails;