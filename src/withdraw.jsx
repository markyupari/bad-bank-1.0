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

function Withdraw() {
  const { currentUser, updateCurrentUser } = useContext(UserContext);
  // const user = useContext(UserContext);
  // const [balance, setBalance] = useState(
  //   user.users[user.users.length - 1].balance
  // );
  const [balance, setBalance] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [statusWithdraw, setStatusWithdraw] = useState("");

  //======Sweet alert setup======================//
  const MySwal = withReactContent(Swal);
  const showSwalSuccess = (number) => {
    MySwal.fire({
      icon: "success",
      title: `Withdraw of ${number} BTC registered successfully`,
      text: "Nothing suspicious here either",
      background: "#3a415c",
      color: "#cbb26a",
    });
  };
  const showSwalError = (number, total) => {
    MySwal.fire({
      icon: "error",
      title: `You can't withdraw ${number} BTC. You only have ${total} BTC in your account`,
      text: "We can be a bad bank, but we know how to do math.",
      background: "#3a415c",
      color: "#cbb26a",
    });
  };
  //=============================================//

  function validate(number) {
    if (isNaN(number)) {
      setStatusWithdraw("Error: NaN");
      setTimeout(() => {
        setStatusWithdraw("");
      }, 3000);
      return false;
    }
    if (number < 0) {
      setStatusWithdraw("Error: negative");
      setTimeout(() => {
        setStatusWithdraw("");
      }, 3000);
      return false;
    }
    return true;
  }

  function overdraft(number, total) {
    if (number > total) {
      showSwalError(number, total);
      setWithdraw(0);
      return false;
    }
    return true;
  }

  /* ---useEffect to get user balance--- */
  const url = "/api/account/all";
  useEffect(() => {
    async function fetchUserBalance() {
      setBalance(0);
      var res = await fetch(url);
      var data = await res.json();
      console.log("Withdraw data:", data);
      console.log("Withdraw data.UserEmail[0]:", data[0].email);
      console.log("Withdraw currentUser", currentUser);
      const currentUserData = data.filter(
        (user) => user.email == currentUser.email
      );
      console.log("Withdraw currentUser balance", currentUserData[0].balance);
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

  function handleWithdraw() {
    console.log(withdraw);
    if (!validate(Number(withdraw))) return;
    if (!overdraft(Number(withdraw), balance)) return;

    let newBalance = balance - Number(withdraw);
    setBalance(newBalance);
    // user.users[user.users.length - 1].balance = newBalance; //to be replaced when login is ON

    // write new balance to database
    const url = `/account/update/${currentUser.email}/${-withdraw}`;
    const apiUpdateBalance = async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log("Withdraw fetch data", data);
      console.log(`withdraw: ${withdraw}, balance: ${balance}`);
      showSwalSuccess(Number(withdraw));
      setWithdraw(0);
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
            title="Withdraw"
            subtitle="Nothing suspicious here"
            text="Type in the amount you want to withdraw"
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
                  <Form.Label>Amount to withdraw:</Form.Label>
                  <Form.Control
                    type="input"
                    id="withdraw"
                    placeholder="BTC"
                    value={withdraw}
                    onChange={(e) => setWithdraw(e.currentTarget.value)}
                  />
                  {statusWithdraw === "Error: NaN" ? (
                    <Form.Text muted>
                      Letters and special characters not allowed
                    </Form.Text>
                  ) : null}
                  {statusWithdraw === "Error: negative" ? (
                    <Form.Text muted>Only positive numbers allowed</Form.Text>
                  ) : null}
                </Form.Group>
                <Button
                  type="submit"
                  variant="light"
                  onClick={handleWithdraw}
                  disabled={!withdraw}
                >
                  Withdraw
                </Button>
              </>
            }
          />
        </Col>
      </Row>
    </Container>
  );
}
export default Withdraw;
