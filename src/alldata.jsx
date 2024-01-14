// import { UserContext } from "./context";
import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function AllData() {
  //const user = useContext(UserContext);

  const [data, setData] = useState([]);
  const url = "/api/account/all";
  useEffect(() => {
    async function fetchAllData() {
      setData([]);
      var res = await fetch(url);
      var data = await res.json();
      if (!ignore) {
        console.log(data);
        setData(data);
      }
    }
    let ignore = false;
    fetchAllData();
    return () => {
      ignore = true;
    };
  }, []);

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
        {data.map((item, index) => (
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
