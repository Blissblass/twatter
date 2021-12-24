import { useContext } from "react";
import React from 'react'
import ErrorPopup from "./ErrorPopup";
import ErrorContext from "./Contexts/ErrorContext";

const Errors = () => {
  const { errors } = useContext(ErrorContext);

  return(
    errors.map((error, idx) => (<ErrorPopup key={idx} error={error} />))
  );
};

export default Errors;