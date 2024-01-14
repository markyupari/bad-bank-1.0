import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import CardTemplate from "./cardtemplate";
import UserContext from "./context";
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

function CurrentUser(props) {
  const user = useContext(UserContext);
  const data = props.value;
  useEffect(() => {
    console.log("Current User Component:", user);
  }, [user]);

  return (
    <div>
      {!user.currentUser[0] ? (
        <Badge bg="secondary">{user.currentUser[0]}</Badge>
      ) : (
        <Badge>No user logged</Badge>
      )}
    </div>
  );
}

export default CurrentUser;
