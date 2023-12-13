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

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState(""); //true=not logged in false=welcome logged user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(UserContext);

  //======Sweet alert setup======================//
  const MySwal = withReactContent(Swal);
  const showSwalSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Logged in successfully",
      text: "So, here we go again",
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

  function login(email, password) {
    const url = `/account/login/${email}/${password}`;
    const apiLogin = async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      //   if (data.error) {
      //     showSwalError(email, data.error);
      //   } else {
      //     setShow(false);
      //     showSwalSuccess();
      //     //user.users.push({ name, email, password, balance: 0 });
      //   }
    };
    apiLogin();
  }

  return (
    <h1>
      Login
      <br />
      {JSON.stringify(user)}
    </h1>
  );
}
export default Login;
