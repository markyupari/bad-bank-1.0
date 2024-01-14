import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./navbar.jsx";
import Home from "./home.jsx";
import CreateAccount from "./createaccount.jsx";
import Login from "./login.jsx";
import Deposit from "./deposit.jsx";
import Withdraw from "./withdraw.jsx";
import AllData from "./alldata.jsx";
import { UserProvider } from "./context";
import CurrentUser from "./currentuser.jsx";

function App() {
  const ctx = {
    users: [],
    currentUser: [
      {
        email: "",
      },
    ],
  };
  // const [data, setData] = useState(ctx);
  const url = "/api/account/all";
  async function fetchAllData() {
    var res = await fetch(url);
    var data = await res.json();
    console.log(data);
    data.map((item) => ctx.users.push(item));
    console.log("All data: ", ctx);
  }
  fetchAllData();

  return (
    <>
      <UserProvider>
        <HashRouter>
          <NavigationBar />
          <CurrentUser value={ctx} />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/alldata" element={<AllData />} />
          </Routes>
        </HashRouter>
      </UserProvider>
    </>
  );
}

export default App;
