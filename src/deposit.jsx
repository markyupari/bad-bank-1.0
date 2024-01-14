import UserContext from "./context";
import { useContext, useEffect, useState } from "react";
import CardTemplate from "./cardtemplate";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

//Sweet alert import
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Deposit() {
  const { currentUser, updateCurrentUser } = useContext(UserContext);
  // const [balance, setBalance] = useState(
  //   user.users[user.users.length - 1].balance
  // );
  const [balance, setBalance] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [statusDeposit, setStatusDeposit] = useState("");

  //======Sweet alert setup======================//
  const MySwal = withReactContent(Swal);
  const showSwalSuccess = (number) => {
    MySwal.fire({
      icon: "success",
      title: `Deposit of ${number} BTC registered successfully`,
      text: "There is no going back!",
      background: "#3a415c",
      color: "#cbb26a",
    });
  };
  //=============================================//

  function validate(number) {
    if (isNaN(number)) {
      setStatusDeposit("Error: NaN");
      setTimeout(() => {
        setStatusDeposit("");
      }, 3000);
      return false;
    }
    if (number < 0) {
      setStatusDeposit("Error: negative");
      setTimeout(() => {
        setStatusDeposit("");
      }, 3000);
      return false;
    }
    return true;
  }

  /* ---useEffect to get user balance--- */
  const url = "/api/account/all";
  useEffect(() => {
    async function fetchUserBalance() {
      //setBalance(0);
      var res = await fetch(url);
      var data = await res.json();
      console.log("Deposit data:", data);
      console.log("Deposit data.UserEmail[0]:", data[0].email);
      console.log("Deposit currentUser", currentUser);
      const currentUserData = data.filter(
        (user) => user.email == currentUser.email
      );
      console.log("Deposit currentUser balance", currentUserData[0].balance);
      if (!ignore) {
        console.log("ignore: false");
        setBalance(currentUserData[0].balance);
      }
    }
    let ignore = false;
    fetchUserBalance();
    return () => {
      ignore = true;
    };
  }, []);

  /* ----------------------------------- */

  function handleDeposit() {
    console.log(deposit);
    if (!validate(Number(deposit))) return;

    let newBalance = balance + Number(deposit);
    setBalance(newBalance);
    //user.users[user.users.length - 1].balance = newBalance; //to be replaced when login is ON

    // write new balance to database
    const url = `/account/update/${currentUser.email}/${deposit}`;
    const apiUpdateBalance = async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log("Deposit fetch data", data);
      console.log(`deposit: ${deposit}, balance: ${balance}`);
      showSwalSuccess(Number(deposit));
      setDeposit(0);
      //user.users.push({ name, email, password, balance: 0 });
    };
    apiUpdateBalance();
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <CardTemplate
            color="secondary"
            textcolor="white"
            title="Deposit"
            subtitle="Sure, what could possibly go wrong?"
            text="Type in the amount you want to deposit"
            body={
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Your balance:</Form.Label>
                  <Form.Control
                    type="number"
                    id="balance"
                    placeholder={`BTC ${balance}`}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Amount to deposit:</Form.Label>
                  <Form.Control
                    type="input"
                    id="deposit"
                    placeholder="BTC"
                    value={deposit}
                    onChange={(e) => setDeposit(e.currentTarget.value)}
                  />
                  {statusDeposit === "Error: NaN" ? (
                    <Form.Text muted>
                      Letters and special characters not allowed
                    </Form.Text>
                  ) : null}
                  {statusDeposit === "Error: negative" ? (
                    <Form.Text muted>Only positive numbers allowed</Form.Text>
                  ) : null}
                </Form.Group>
                <Button
                  type="submit"
                  variant="light"
                  onClick={handleDeposit}
                  disabled={!deposit}
                >
                  Deposit
                </Button>
              </>
            }
          />
        </Col>
      </Row>
    </Container>
  );
}
export default Deposit;
