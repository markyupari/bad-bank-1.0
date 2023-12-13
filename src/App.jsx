import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./navbar.jsx";
import Home from "./home.jsx";
import CreateAccount from "./createaccount.jsx";
import Login from "./login.jsx";
import Deposit from "./deposit.jsx";
import Withdraw from "./withdraw.jsx";
import AllData from "./alldata.jsx";
import { UserContext } from "./context";

function App() {
  const ctx = {
    users: [
      {
        name: "mark",
        email: "mark@mit.edu",
        password: "dontknow",
        balance: 100,
      },
    ],
  };

  return (
    <>
      <HashRouter>
        <NavigationBar />
        <UserContext.Provider value={ctx}>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/alldata" element={<AllData />} />
          </Routes>
        </UserContext.Provider>
      </HashRouter>
    </>
  );
}

export default App;
