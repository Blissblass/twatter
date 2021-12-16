import { useContext } from "react";
import ErrorContext from "./Contexts/ErrorContext";

const Errors = () => {
  const { errors } = useContext(ErrorContext);

  return(
    errors.map(error => (<ErrorPopup error={error} />))
  );
};

export default Errors;