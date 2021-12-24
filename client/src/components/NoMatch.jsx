import { Redirect } from "react-router-dom";

const NoMatch = () => {

  return(
    <Redirect to="/twatter/home" />
  )
};

export default NoMatch;