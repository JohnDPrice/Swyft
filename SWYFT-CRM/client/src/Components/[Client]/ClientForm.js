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
import { ClientContext } from "../../providers/ClientProvider";
import { LeadStatusContext } from "../../providers/LeadStatusProvider";
import { useHistory, useParams } from "react-router-dom";
import { CoverageTypeContext } from "../../providers/CoverageTypeProvider";
import DatePicker from "reactstrap-date-picker/lib/DatePicker";

const ClientForm = () => {
    const { getClient, updateClient, addClient } = useContext(ClientContext);
    const { leadStatuses, getAllLeadStatuses } = useContext(LeadStatusContext);
    const { coverageTypes, getAllCoverageTypes } = useContext(CoverageTypeContext);
    const [clientInput, setClientInput] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    let DatePicker = require("reactstrap-date-picker");

    const {clientId} = useParams();
    const history = useHistory();

    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllCoverageTypes()
        getAllLeadStatuses()
        .then(() => {
            if (clientId) {
              getClient(clientId)
              .then(client  => {
                setClientInput(client)
                setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
    }, []);

    const formatDate = () => {
      let date = new Date(selectedDate)
      let isoStringDate = date.toISOString().slice(0, 11).replace('T', '')
      return isoStringDate;
    };

    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newClient = { ...clientInput }
        //post is an object with properties , set the property to the new value using obejct bracket notation
        newClient[event.target.id] = event.target.value
        //update state
        setClientInput(newClient)
    }

    const onDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleClickSaveLead = (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (clientId) {
            // PUT update
            updateClient({
                Id: parseInt(clientId),
                UserProfileId: userProfileId,
                FirstName: clientInput.firstName,
                LastName: clientInput.lastName,
                Email: clientInput.email,
                // DateOfBirth: clientInput.dateOfBirth,
                DateCreated: clientInput.dateCreated,
                CoverageTypeId: parseInt(clientInput.coverageTypeId),
                LeadStatusId: parseInt(clientInput.leadStatusId),
                InsuranceCompanyId: 1, 
                Client: true,
                Sold: clientInput.sold,
                SoldDate: clientInput.soldDate
            })
            .then(() => history.push(`/client/${clientId}`))
        } else {
            addClient({
                UserProfileId: userProfileId,
                FirstName: clientInput.firstName,
                LastName: clientInput.lastName,
                Email: clientInput.email,
                // DateOfBirth: clientInput.dateOfBirth,
                DateCreated: clientInput.dateCreated,
                CoverageTypeId: parseInt(clientInput.coverageTypeId),
                LeadStatusId: parseInt(clientInput.leadStatusId),
                InsuranceCompanyId: 1, 
                Client: true,
                Sold: clientInput.sold,
                SoldDate: clientInput.soldDate
            })
            .then((parsedRes) => history.push(`/client/${parsedRes.id}`))
        }
    }

    return (     
        <div className="container pt-4">
        <div className="row justify-content-center">
          <Card className="col-sm-12 col-lg-6">
            <CardBody>
              <h1> {clientId ? <>Edit Client</> : <>Add Client</>}</h1>
              <Form>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input type="text" id="firstName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="First Name" value={clientInput.firstName} />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input type="text" id="lastName" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Last Name" value={clientInput.lastName} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="text" id="email" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Email" value={clientInput.email} />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="content" name="dateOfBirth">Date Of Birth</Label>
                  <Input
                    type="date" id="dateOfBirth" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Date Of Birth" value={clientInput.dateOfBirth}
                  />
                </FormGroup> */}
                <FormGroup>
                      <Label for="exampleSelectMulti">Lead Status</Label>
                      <Input type="select" value={clientInput.leadStatusId}
                          name="leadStatusId"
                          id="leadStatusId"
                          onChange={handleControlledInputChange}
                          required>
                            <option>Select a lead status</option>
                          {leadStatuses.map((leadStatus) => (
                          leadStatus.id === clientInput.leadStatusId? <option key={leadStatus.id} selected value={leadStatus.id}>{leadStatus.name}</option> : <option key={leadStatus.id} value={leadStatus.id}>{leadStatus.name}</option>
                          ))}
                      </Input>
                </FormGroup>
                <FormGroup>
                      <Label for="exampleSelectMulti">Coverage Type</Label>
                      <Input type="select" value={clientInput.coverageTypeId}
                          name="coverageTypeId"
                          id="coverageTypeId"
                          onChange={handleControlledInputChange}
                          required>
                              <option>Select a coverage type</option>
                          {coverageTypes.map((coverageType) => (
                          coverageType.id === clientInput.coverageTypeId? <option key={coverageType.id} selected value={coverageType.id}>{coverageType.name}</option> : <option key={coverageType.id} value={coverageType.id}>{coverageType.name}</option>
                          ))}
                      </Input>
                </FormGroup>
                {/* <FormGroup>
                    <Label for="content" name="dateOfBirth">Date Of Birth</Label>
                    <DatePicker type="date" name="dateOfBirth" id="dateOfBirth" required autoFocus  value={selectedDate} className="form-control" selected={selectedDate} onChange={onDateChange} dateFormat="YYYY/MM/DD"/>
                </FormGroup> */}
              </Form>
              <Button  onClick={handleClickSaveLead} disable={isLoading.toString()}>
                    {clientId ? <>Save Client</> : <>Add Client</>}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    )
};

export default ClientForm;