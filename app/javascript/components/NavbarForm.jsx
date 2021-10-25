import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import FormResults from './FormResults';

const NavbarForm = (props) => {

  const [queryStr, setQueryStr] = useState("");
  const [users, setUsers] = useState("");


  const handleInput = ({currentTarget}) => {
    setQueryStr(currentTarget.value);

    const data = {
      'query': currentTarget.value
    };
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content")

    if(queryStr.length > 1) {
      fetch('/api/search_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify(data)
      })
        .then(data => data.json())
        .then(data => {setUsers(data); console.log(data)})
    }
  };

  return(
    <Form className="form-inline my-2 my-lg-0 mx-2">
      <FormControl 
        placeholder="Search for users..." 
        className="form-control d-inline" 
        style={{width:500}}
        onChange={(e) => {handleInput(e)}}
        onBlur={() => setUsers("")}
        value={queryStr}>

        </FormControl>
      <div className="position-absolute">
        <FormResults setQueryStr={setQueryStr} users={users} currUser={props.currUser} />
      </div>
    </Form>
  )
};

export default NavbarForm;