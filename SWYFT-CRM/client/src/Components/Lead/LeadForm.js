import React, { useContext, useEffect, useState } from "react"
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button
} from "reactstrap";
import { LeadContext } from "../../providers/LeadProvider";
import { LeadStatusContext } from "../../providers/LeadStatusProvider";
import { useHistory, useParams } from "react-router-dom";
import { CoverageTypeContext } from "../../providers/CoverageTypeProvider";

const LeadForm = () => {
    const { addLead, getLead, updateLead } = useContext(LeadContext);
    const { leadStatuses, getAllLeadStatuses } = useContext(LeadStatusContext);
    const { coverageTypes, getAllCoverageTypes } = useContext(CoverageTypeContext);
    const [leadInput, setLeadInput] = useState({
        userProfileId: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        dateCreated: "",
        coverageTypeId: "",
        leadStatusId: "",
        insuranceCompanyId: "", 
        client: false,
        sold: false,
        soldDate: null

    });
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const {leadId} = useParams();
    const history = useHistory();

    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllCoverageTypes()
        getAllLeadStatuses()
        .then(() => {
            if (leadId) {
              getLead(leadId)
              .then(lead  => {
                setLeadInput(lead)
                setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
    }, []);

    const printDate = (leadDate) => {
        let date = new Date(leadDate)
        let isoStringDate = date.toISOString().slice(0, 11).replace('T', '')
        return isoStringDate;
      };

    const formatDate = () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newLead = { ...leadInput }
        //post is an object with properties , set the property to the new value using obejct bracket notation
        newLead[event.target.id] = event.target.value
        //update state
        setLeadInput(newLead)
    }

    const handleClickSaveLead = (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (leadId) {
            // PUT update
            updateLead({
                Id: parseInt(leadId),
                UserProfileId: userProfileId,
                FirstName: leadInput.firstName,
                LastName: leadInput.lastName,
                Email: leadInput.email,
                // DateOfBirth: printDate(leadInput.dateOfBirth),
                DateCreated: leadInput.dateCreated,
                CoverageTypeId: parseInt(leadInput.coverageTypeId),
                LeadStatusId: parseInt(leadInput.leadStatusId),
                InsuranceCompanyId: 1, 
                Client: false,
                Sold: false,
                SoldDate: null
            }).then(() => history.push(`/lead/${leadId}`))
        } else {
            addLead({
                UserProfileId: userProfileId,
                FirstName: leadInput.firstName,
                LastName: leadInput.lastName,
                DateCreated: formatDate(),
                Email: leadInput.email,
                // DateOfBirth: leadInput.dateOfBirth,
                LeadStatusId: parseInt(leadInput.leadStatusId),
                CoverageTypeId: parseInt(leadInput.coverageTypeId),
                InsuranceCompanyId: 1,
                Client: false,
                Sold: null,
                SoldDate: null
            }).then(history.push(`/leads`))
        }
    }

    return (     
        <div className="container pt-4">
        <div className="row justify-content-center">
          <Card className="col-sm-12 col-lg-6">
            <CardBody>
              <h1> {leadId ? <>Update Lead</> : <>Add Lead</>}</h1>
              <Form>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input type="text" id="firstName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="First Name" value={leadInput.firstName} />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input type="text" id="lastName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Last Name" value={leadInput.lastName} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="text" id="email" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Email" value={leadInput.email} />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="content" name="dateOfBirth">Date Of Birth</Label>
                  <Input
                    type="date" id="dateOfBirth" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Date Of Birth" value={leadInput.dateOfBirth}
                  />
                </FormGroup> */}
                <FormGroup>
                      <Label for="exampleSelectMulti">Lead Status</Label>
                      <Input type="select" value={leadInput.leadStatusId}
                          name="leadStatusId"
                          id="leadStatusId"
                          onChange={handleControlledInputChange}
                          required>
                            <option>Select a lead status</option>
                          {leadStatuses.map((leadStatus) => (
                          leadStatus.id === leadInput.leadStatusId? <option key={leadStatus.id} selected value={leadStatus.id}>{leadStatus.name}</option> : <option key={leadStatus.id} value={leadStatus.id}>{leadStatus.name}</option>
                          ))}
                      </Input>
                </FormGroup>
                <FormGroup>
                      <Label for="exampleSelectMulti">Coverage Type</Label>
                      <Input type="select" value={leadInput.coverageTypeId}
                          name="coverageTypeId"
                          id="coverageTypeId"
                          onChange={handleControlledInputChange}
                          required>
                              <option>Select a coverage type</option>
                          {coverageTypes.map((coverageType) => (
                          coverageType.id === leadInput.coverageTypeId? <option key={coverageType.id} selected value={coverageType.id}>{coverageType.name}</option> : <option key={coverageType.id} value={coverageType.id}>{coverageType.name}</option>
                          ))}
                      </Input>
                </FormGroup>
              </Form>
              <Button  onClick={handleClickSaveLead} disable={isLoading.toString()}>
                    {leadId ? <>Save Lead</> : <>Add Lead</>}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    )
};

export default LeadForm;