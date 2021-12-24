import React from 'react';
import UserBox from './UserBox';

const FormResults = (props) => {

  if(props.users.length === 0) {
    return(
      <div></div>
    );
  } else {
    return(
      <div>
        {props.users.map(user => (
            <UserBox key={user.id} user={user} setQueryStr={props.setQueryStr}/>
          ))}
      </div>
    );
  }
};

export default FormResults;