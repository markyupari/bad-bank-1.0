import { UserContext } from "./context";
import { useContext, useState } from "react";
import CardTemplate from "./cardtemplate";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Sweet alert import
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Withdraw() {
  const user = useContext(UserContext);
  const [balance, setBalance] = useState(
    user.users[user.users.length - 1].balance
  );
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

  function handleWithdraw() {
    console.log(withdraw);
    if (!validate(Number(withdraw))) return;
    if (!overdraft(Number(withdraw), balance)) return;

    let newBalance = balance - Number(withdraw);
    setBalance(newBalance);
    user.users[user.users.length - 1].balance = newBalance; //to be replaced when login is ON
    console.log(`withdraw: ${withdraw}, balance: ${balance}`);
    showSwalSuccess(Number(withdraw));
    setWithdraw(0);
  }

  return (
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
  );
}
export default Withdraw;
