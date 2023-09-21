import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import './navbar.css'

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
              <Nav.Link className="custom-nav-link" href="#/CreateAccount/">
                Create account
              </Nav.Link>
              <Nav.Link href="#/login/">Login</Nav.Link>
              <Nav.Link href="#/deposit/">Deposit</Nav.Link>
              <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
              <Nav.Link href="#/alldata/">AllData</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <a href="#">BadBank</a>,
            <a href="#/CreateAccount/">Create account</a>,
            <a href="#/login/">Login</a>,
            <a href="#/deposit/">Deposit</a>,
            <a href="#/withdraw/">Withdraw</a>,
            <a href="#/balance/">Balance</a>,
            <a href="#/alldata/">AllData</a> */}
    </>
  );
}

export default NavigationBar;
