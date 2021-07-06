import React, { useContext } from "react"
import { ClientContext } from "../../providers/ClientProvider"
import { Input } from 'reactstrap'

const ClientSearch = () => {
  const { setSearchTerms } = useContext(ClientContext)

  return (
    <>
      
      <Input type="text"
        className="input--wide search rounded"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search clients . . ." />
    </>
  )
}

export default ClientSearch;