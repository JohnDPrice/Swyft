import React, { useContext, useEffect, useState } from "react";
import { LeadContext } from "../../providers/LeadProvider";
import { ClientContext } from "../../providers/ClientProvider";
import { Container, Button, Row, Col, Media, Table } from "reactstrap";
import { useHistory } from "react-router-dom"
import Client from "../[Client]/Client";
import Lead from "../Lead/Lead";
import LineChart from "./LineChart";
import "./Dashboard.css";

const Dashboard = () => {
    const { leads, getAllLeads } = useContext(LeadContext);
    const { clients, getAllClients } = useContext(ClientContext);
    const [ dataChart, setDataChart ] = useState({});
    const history = useHistory();

    useEffect(() => {
        getAllClients();
        getAllLeads();
    }, [])

    return (
        <>
            <Container className="card-list-container" fluid={true}>
                <Row xs="2" className="dashboard-lead-table">
                    <Col>
                        <h2>Leads</h2>
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
                        {leads.map((lead) => (
                                <Lead key={lead.id} lead={lead} />
                            ))}
                        </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <h2>Clients</h2>
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
                        {clients.map((client) => (
                                <Client key={client.id} client={client} />
                            ))}
                        </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row xs="2" className="line-chart">
                    <Col>
                        <LineChart />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;