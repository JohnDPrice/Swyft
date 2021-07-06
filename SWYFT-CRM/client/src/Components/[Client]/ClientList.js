import React, { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../providers/ClientProvider";
import { Container, Button, Row, Col, Media, Table } from "reactstrap";
import { useHistory } from "react-router-dom"
import Client from "./Client";

const ClientList = () => {
    const { clients, getAllClients, searchTerms, setSearchTerms } = useContext(ClientContext);
    const [filteredClients, setFilteredClients] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAllClients();
    }, [])

    useEffect(() => {
        if(searchTerms !== "") {
            const subset = clients.filter(currentClient => currentClient.firstName.toLowerCase().includes(searchTerms) || currentClient.email.toLowerCase().includes(searchTerms))
            setFilteredClients(subset)
        } else {
            setFilteredClients(clients)
        }
    }, [searchTerms, clients])

    return (
        <>
            <Container className="card-list-container" fluid={true}>
                <Button color="secondary" onClick={() => {
                history.push(`/client/add`)
                }}>Add New Client</Button>
                <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Lead Status</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {filteredClients.map((client) => (
                        <Client key={client.id} client={client} />
                    ))}
                </tbody>
                </Table>
            </Container>
        </>
    );    
};

export default ClientList;