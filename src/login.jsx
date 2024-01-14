import Button from "react-bootstrap/Button";
import CardTemplate from "./cardtemplate";
import UserContext from "./context";
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import googleimg from "../public/web_light_rd_SU.svg";
import Image from "react-bootstrap/Image";

//Sweet alert import
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { auth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  // variable for Google Login
  const [user, loading, error] = useAuthState(auth);

  const [show, setShow] = useState(true); //true: show login button and fields //false: show info of logged user
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, updateCurrentUser } = useContext(UserContext);

  //======Sweet alert setup======================//
  const MySwal = withReactContent(Swal);
  const showSwalSuccessLogin = () => {
    MySwal.fire({
      icon: "success",
      title: "Logged in successfully",
      text: "So, here we go again",
      background: "#3a415c",
      color: "#cbb26a",
    });
  };
  const showSwalSuccessLogout = () => {
    MySwal.fire({
      icon: "success",
      title: "Logged out successfully",
      text: "Go now my friend, and never return",
      background: "#3a415c",
      color: "#cbb26a",
    });
  };
  const showSwalError = (errorMessage) => {
    MySwal.fire({
      icon: "error",
      title: `Email or password incorrect`,
      text: `Error: ${errorMessage}.`,
      background: "#3a415c",
      color: "#cbb26a",
    });
  };
  //=============================================//

  function handleLogin() {
    const url = `/api/account/login/${email}/${password}`;
    const apiLogin = async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log("Email and password data:", data);
      if (data.Error) {
        showSwalError(data.Error);
      } else {
        setShow(false); //ROADMAP: setShow fetch data from /api/account/currentUser
        showSwalSuccessLogin();
        //user.currentUser[0].email = email;
        updateCurrentUser({ email: email });
        console.log(currentUser.email);
      }
    };
    apiLogin();
  }

  // useEffect(() => {
  //   if (user) {
  //     setShow(false);
  //     console.log("useEffect:", user);
  //     updateCurrentUser(user.email);
  //   }
  // }, [user, loading]);

  function handleGoogleLogin() {
    const userEmail = signInWithGoogle();
    updateCurrentUser({ email: user.email });
    if (userEmail) {
      console.log("handleGoogleLogin:", userEmail);
    }
    // const url = `/api/account/googlelogin`;
    // const apiGoogleLogin = async () => {
    //   var res = await fetch(url);
    //   var data = await res.json();
    //   console.log(data);
    //   // setShow(false); //ROADMAP: setShow fetch data from /api/account/currentUser
    //   // showSwalSuccessLogin();
    //   // updateCurrentUser({ email: email });
    //   // console.log(currentUser.email);
    // };
    // apiGoogleLogin();
  }

  function handleLogout() {
    const url = `/api/account/logout`;
    const apiLogout = async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      setEmail("");
      setPassword("");
      setShow(true); //ROADMAP: setShow fecth data from /api/account/currentUser
      showSwalSuccessLogout();
      //user.currentUser[0].email = "";
      updateCurrentUser({ email: "" });
      console.log(currentUser.email);
      //   if (data.error) {
      //     showSwalError(email, data.error);
      //   } else {
      //     setShow(false);
      //     showSwalSuccess();
      //     //user.users.push({ name, email, password, balance: 0 });
      //   }
    };
    apiLogout();
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <CardTemplate
            color="secondary"
            textcolor="white"
            title="Login account"
            subtitle="You better don't do it"
            text="You should not log in into this bank"
            status={status}
            body={
              currentUser.email === "" ? (
                <>
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
                    onClick={handleLogin}
                    disabled={email === "" && password === ""}
                  >
                    Login
                  </Button>
                  <br />
                  <br />
                  <Image src={googleimg} onClick={handleGoogleLogin} />
                </>
              ) : (
                <>
                  <h5>Success</h5>
                  <Button type="submit" variant="light" onClick={handleLogout}>
                    Logout
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
export default Login;
