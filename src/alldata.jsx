import { UserContext } from "./context";
import { useContext } from "react";
import Table from "react-bootstrap/Table";

function Data() {}

function AllData() {
  const user = useContext(UserContext);

  return (
    <Table striped bordered hover variant="dark" className="mt-2">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {user.users.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.password}</td>
            <td>{item.balance}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default AllData;
