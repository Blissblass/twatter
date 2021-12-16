import { useContext, useEffect } from "react";
import React from 'react'
import ErrorPopup from "./ErrorPopup";
import ErrorContext from "./Contexts/ErrorContext";

const Errors = () => {
  const { errors } = useContext(ErrorContext);

  return(
    errors.map(error => (<ErrorPopup error={error} />))
  );
};

export default Errors;