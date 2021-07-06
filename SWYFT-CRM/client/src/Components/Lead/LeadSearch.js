import React, { useContext } from "react"
import { LeadContext } from "../../providers/LeadProvider"
import { Input } from 'reactstrap'

const LeadSearch = () => {
  const { setSearchTerms } = useContext(LeadContext)

  return (
    <>
      <Input type="text"
        className="input--wide search rounded"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search leads . . ." />
    </>
  )
}

export default LeadSearch;