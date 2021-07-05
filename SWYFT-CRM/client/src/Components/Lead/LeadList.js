import React, { useContext, useEffect } from "react";
import { LeadContext } from "../../providers/LeadProvider";
import { Container, Button, Row, Col, Media, Table } from "reactstrap";
import { useHistory } from "react-router-dom"
import Lead from "./Lead"

const LeadList = () => {

    const { leads, getAllLeads } = useContext(LeadContext);
    const history = useHistory();

    useEffect(() => {
        getAllLeads();
    }, [])

    return (
        <>
            <Container className="card-list-container" fluid={true}>
                <Button color="secondary" onClick={() => {
                history.push(`/lead/add`)
                }}>Add New Lead</Button>
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
            </Container>
        </>
    );    
};

export default LeadList;