import { UserContext } from "./context";
import { useContext, useState } from "react";
import CardTemplate from "./cardtemplate";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Sweet alert import
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Deposit() {
  const user = useContext(UserContext);
  const [balance, setBalance] = useState(
    user.users[user.users.length - 1].balance
  );
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

  function handleDeposit() {
    console.log(deposit);
    if (!validate(Number(deposit))) return;

    let newBalance = balance + Number(deposit);
    setBalance(newBalance);
    user.users[user.users.length - 1].balance = newBalance; //to be replaced when login is ON
    console.log(`deposit: ${deposit}, balance: ${balance}`);
    showSwalSuccess(Number(deposit));
    setDeposit(0);
  }

  return (
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
  );
}
export default Deposit;
