import { useState } from "react";
import { Alert } from "react-bootstrap";

const ErrorPopup = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const { error } = props;

  return(
    <Alert variant="danger" show={show} onClose={handleClose}>
      error
    </Alert>
  )
};