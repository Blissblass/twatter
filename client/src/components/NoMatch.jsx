import { Redirect } from "react-router-dom";

const NoMatch = () => {

  return(
    <Redirect to="/home" />
  )
};

export default NoMatch;