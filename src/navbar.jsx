import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function NavigationBar() {
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
                <Nav.Link href="#/login/">Login</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="deposit-tooltip">
                    "A bad idea after another"
                  </Tooltip>
                }
              >
                <Nav.Link href="#/deposit/">Deposit</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="withdraw-tooltip">
                    "Why are you still here?"
                  </Tooltip>
                }
              >
                <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="alldata-tooltip">"Want to take a peek?"</Tooltip>
                }
              >
                <Nav.Link href="#/alldata/">AllData</Nav.Link>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
