import React, { useEffect, useContext, useState } from "react";
import { Card, Button, CardTitle, CardText, Row, Col, Media, CardImg } from "reactstrap";
import { LeadContext } from "../../providers/LeadProvider";
import { useHistory, useParams } from "react-router-dom";

const LeadDetails = () => {
  const [lead, setLead] = useState();
  const { id } = useParams();
  const { getLead, updateLead } = useContext(LeadContext);
  const history = useHistory();

  useEffect(() => {
    getLead(id).then(setLead);
  }, []);

  const handleClick = () => {
      history.push("/leads")
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

  if (!lead) {
    return null;
  }

  var d = new Date(lead.publishDateTime);
  let publishDate = d.toLocaleDateString('en-US')

  return (
    <Row>
      <Col sm="12">
        <Card body>
          <CardTitle tag="h3">{lead.fullName}</CardTitle>
          <CardText>{lead.content}</CardText>
          <strong>{lead.email}</strong>
          <strong>{lead.leadStatus.name}</strong>
          <Button color="danger" size="sm" onClick={convertToClient}>Convert to client and mark as sold</Button>
          <Button onClick={handleClick}>Go Back</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default LeadDetails;