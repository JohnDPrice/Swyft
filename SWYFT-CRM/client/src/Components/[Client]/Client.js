import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, CardTitle, CardImg, CardBody, Badge, Button,  Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useHistory } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ClientContext } from "../../providers/ClientProvider";

const Client = ({ client }) => {
  const [ modal, setModal ] = useState(false)
  const { deleteClient, getAllClients } = useContext(ClientContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
  const clientId = client.id;
  
  const history = useHistory();

  const handleClick = () => {
        history.push(`/clients/edit`)
  }

  const onClickToDetails = () => {
      history.push(`/client/${clientId}`)
  }

  const toggle = () => setModal(!modal);

  return (
    <>
    {/* <Card className="m-4 p-2">
        <Link to={`/client/${client.id}`}>
          <CardTitle tag="h3">{client.fullName}</CardTitle>
        </Link>
        <CardBody>
          <p>{client.email}</p>
          <p>{client.dateOfBirth}</p>
          <p className="text-left">{client.leadStatus.name}</p>
          {client.userProfileId === userProfile.id ?
            <> 
            <Button color="secondary" size="sm" onClick={() => {
                history.push(`/client/edit/${client.id}`)
                }}>Edit
            </Button>
            <Button color="danger" size="sm" onClick={toggle}>Delete</Button>
            <Modal isOpen={modal} toggle={toggle} style={{textAlign: "center"}}>
              <ModalHeader>Delete Client: {client.fullName}</ModalHeader>
              <ModalBody>
                <b>Please confirm you would like to delete the post:</b><br /> <em>{client.fullName}</em><br /><br />
               This action <b>can not</b> be undone.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => {
                  deleteClient(clientId).then(getAllClients)
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
        <th scope="row" onClick={onClickToDetails}>1</th>
        <td onClick={onClickToDetails}>{client.firstName}</td>
        <td onClick={onClickToDetails}>{client.lastName}</td>
        <td onClick={onClickToDetails}>{client.email}</td>
        <td onClick={onClickToDetails}>{client.leadStatus.name}</td>
        <td><FaEdit onClick={() => {
            history.push(`/client/edit/${client.id}`)
            }}>Edit</FaEdit></td>
        <td><FaTrash onClick={toggle}>Delete</FaTrash></td>
    </tr>
        <Modal isOpen={modal} toggle={toggle} style={{textAlign: "center"}}>
              <ModalHeader>Delete Client: {client.fullName}</ModalHeader>
              <ModalBody>
                <b>Please confirm you would like to delete the post:</b><br /> <em>{client.fullName}</em><br /><br />
               This action <b>can not</b> be undone.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => {
                  deleteClient(clientId).then(getAllClients)
                  toggle();
                }}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
    </>
  );
};

export default Client;