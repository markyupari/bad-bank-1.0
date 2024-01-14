import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./navbar.css";
import UserContext from "./context";
import { useContext, useEffect, useState } from "react";

function NavigationBar() {
  const { currentUser, updateCurrentUser } = useContext(UserContext);
  // const [show, setShow] = useState(false);
  // const [email, setEmail] = useState("");

  // const url = "/api/account/currentuser";
  // useEffect(() => {
  //   console.log("Navbar:", user.currentUser);
  //   if (user.currentUser.length > 0) {
  //     setEmail(user.currentUser[0].email);
  //     setShow(true);
  //   } else {
  //     setEmail("");
  //     setShow(false);
  //   }
  // }, [user.currentUser.length]);

  // useEffect(() => {
  //   async function fetchCurrentUser() {
  //     setEmail("");
  //     var res = await fetch(url);
  //     var data = await res.json();
  //     if (!ignore) {
  //       console.log("Navbar", data);
  //       setEmail(data.email);
  //       if (data.email === "") {
  //         setShow(false);
  //       } else {
  //         setShow(true);
  //       }
  //     }
  //   }
  //   let ignore = false;
  //   fetchCurrentUser();
  //   return () => {
  //     ignore = true;
  //   };
  // }, [user]);

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">Bad Bank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="home-tooltip">"Go home (seriously)"</Tooltip>
                }
              >
                <Nav.Link href="#/">Home</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="createAccount-tooltip">
                    "Already a bad idea"
                  </Tooltip>
                }
              >
                <Nav.Link href="#/CreateAccount/">Create account</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="login-tooltip">
                    "You don't listen, do you?"
                  </Tooltip>
                }
              >
                <Nav.Link href="#/login/">User</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="deposit-tooltip">
                    "A bad idea after another"
                  </Tooltip>
                }
              >
                <Nav.Link
                  href="#/deposit/"
                  style={{
                    display: currentUser.email === "" ? "none" : "inline",
                  }}
                >
                  Deposit
                </Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="withdraw-tooltip">
                    "Why are you still here?"
                  </Tooltip>
                }
              >
                <Nav.Link
                  href="#/withdraw/"
                  style={{
                    display: currentUser.email === "" ? "none" : "inline",
                  }}
                >
                  Withdraw
                </Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="alldata-tooltip">"Want to take a peek?"</Tooltip>
                }
              >
                <Nav.Link
                  href="#/alldata/"
                  style={{
                    display:
                      currentUser.email === "mark@mit.edu" ? "inline" : "none",
                  }}
                >
                  AllData
                </Nav.Link>
              </OverlayTrigger>
              <Nav.Link
                href="#/login/"
                style={{
                  display: currentUser.email === "" ? "none" : "inline",
                }}
              >
                {currentUser.email}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
