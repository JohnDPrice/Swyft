import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, CardTitle, CardImg, CardBody, Badge, Button,  Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useHistory } from "react-router-dom"
import { LeadContext } from "../../providers/LeadProvider";
import { FaTrash, FaEdit } from "react-icons/fa";

const Lead = ({ lead }) => {
  const [ modal, setModal ] = useState(false)
  const { deleteLead, getAllLeads } = useContext(LeadContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
  const leadId = lead.id
  const history = useHistory();

  const handleClick = () => {
        history.push(`/leads/edit`)
  }

  const handleClickToDetails = () => {
    history.push(`lead/${lead.id}`)
  }

  const toggle = () => setModal(!modal);

  return (
    <>
    {/* <Card className="m-4 p-2">
        <Link to={`/lead/${lead.id}`}>
          <CardTitle tag="h3">{lead.fullName}</CardTitle>
        </Link>
        <CardBody>
          <p>{lead.email}</p>
          <p>{lead.dateOfBirth}</p>
          <p className="text-left">{lead.leadStatus.name}</p>
          {lead.userProfileId === userProfile.id ?
            <> 
            <Button color="secondary" size="sm" onClick={() => {
                history.push(`/lead/edit/${lead.id}`)
                }}>Edit
            </Button>
            <Button color="danger" size="sm" onClick={toggle}>Delete</Button>
            <Modal isOpen={modal} toggle={toggle} style={{textAlign: "center"}}>
              <ModalHeader>Delete Lead: {lead.fullName}</ModalHeader>
              <ModalBody>
                <b>Please confirm you would like to delete the post:</b><br /> <em>{lead.fullName}</em><br /><br />
               This action <b>can not</b> be undone.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => {
                  deleteLead(lead.id).then(getAllLeads)
                  toggle();
                }}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            </>
            :
            <div></div>
          }
        </CardBody>
    </Card> */}
     <tr>
        <th scope="row" onClick={handleClickToDetails}>{lead.id}</th>
        <td onClick={handleClickToDetails}>{lead.firstName}</td>
        <td onClick={handleClickToDetails}>{lead.lastName}</td>
        <td onClick={handleClickToDetails}>{lead.email}</td>
        <td onClick={handleClickToDetails}>{lead.leadStatus.name}</td>
        <td><FaEdit onClick={() => {
            history.push(`/lead/edit/${lead.id}`)
            }}>Edit</FaEdit></td>
        <td><FaTrash onClick={toggle}>Delete</FaTrash></td>
    </tr>
    <Modal isOpen={modal} toggle={toggle} style={{textAlign: "center"}}>
      <ModalHeader>Delete Lead: {lead.fullName}</ModalHeader>
      <ModalBody>
        <b>Please confirm you would like to delete the post:</b><br /> <em>{lead.fullName}</em><br /><br />
        This action <b>can not</b> be undone.
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => {
          deleteLead(lead.id).then(getAllLeads)
          toggle();
        }}>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
      </Modal>
    </>
  );
};

export default Lead;