import Button from "react-bootstrap/Button";
import CardTemplate from "./cardtemplate";
import { UserContext } from "./context";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

//Sweet alert import
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState(""); //true=create new account false=success create another account?
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const user = useContext(UserContext);

  //======Sweet alert setup======================//
  const MySwal = withReactContent(Swal);
  const showSwalSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Account created successfully",
      text: "The worst decision you could make today",
      background: "#3a415c",
      color: "#cbb26a",
    });
  };
  const showSwalError = (email, errorMessage) => {
    MySwal.fire({
      icon: "error",
      title: `Error trying to create user with email: ${email}`,
      text: `Error: ${errorMessage}.`,
      background: "#3a415c",
      color: "#cbb26a",
    });
  };
  //=============================================//

  function validate(field, label) {
    // validate fields not empty
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => {
        setStatus("");
      }, 3000);
      return false;
    }
    // validate password length
    if (field.length < 4 && label === "password") {
      setStatus("Error: " + label);
      setTimeout(() => {
        setStatus("");
      }, 3000);
      return false;
    }
    // validate email format
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (label === "email" && !validRegex.test(field)) {
      setStatus("Error: " + label);
      setTimeout(() => {
        setStatus("");
      }, 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    const url = `/api/account/create/${name}/${email}/${password}`;
    const apiCreateAccount = async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      if (data.error) {
        showSwalError(email, data.error);
      } else {
        setShow(false);
        showSwalSuccess();
        //user.users.push({ name, email, password, balance: 0 });
      }
    };
    apiCreateAccount();
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <CardTemplate
            color="secondary"
            textcolor="white"
            title="Create account"
            subtitle="Your first step to a terrible mistake"
            text="You should not create an account in this bank"
            status={status}
            body={
              show ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="input"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                    {status === "Error: name" ? (
                      <Form.Text muted>Name field can't be empty</Form.Text>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter a valid email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    {status === "Error: email" ? (
                      <Form.Text muted>Enter a valid email</Form.Text>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    {status === "Error: password" ? (
                      <Form.Text muted>
                        Password must be at least 8 characters long
                      </Form.Text>
                    ) : null}
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="light"
                    onClick={handleCreate}
                    disabled={name === "" && email === "" && password === ""}
                  >
                    Create account
                  </Button>
                </>
              ) : (
                <>
                  <h5>Success</h5>
                  <Button type="submit" variant="light" onClick={clearForm}>
                    Create another account
                  </Button>
                </>
              )
            }
          />
        </Col>
      </Row>
    </Container>
  );
}
export default CreateAccount;
