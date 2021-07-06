import React, { useContext, useEffect, useState } from "react";
import { LeadContext } from "../../providers/LeadProvider";
import { Container, Button, Row, Col, Media, Table } from "reactstrap";
import { useHistory } from "react-router-dom"
import Lead from "./Lead"

const LeadList = () => {

    const { leads, getAllLeads, searchTerms, setSearchTerms } = useContext(LeadContext);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAllLeads();
    }, [])

    useEffect(() => {
        if(searchTerms !== "") {
            const subset = leads.filter(currentLead => currentLead.fullName.toLowerCase().includes(searchTerms) || currentLead.email.toLowerCase().includes(searchTerms))
            setFilteredLeads(subset)
        } else {
            setFilteredLeads(leads)
        }
    }, [searchTerms, leads])

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
                {filteredLeads.map((lead) => (
                        <Lead key={lead.id} lead={lead} />
                    ))}
                </tbody>
                </Table>
            </Container>
        </>
    );    
};

export default LeadList;