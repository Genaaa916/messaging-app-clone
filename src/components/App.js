import React from "react";
import Login from "./Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./Dashboard";

export default function App() {
  const [id, setId] = useLocalStorage("id");

  return id ? (
    <Dashboard id={id}></Dashboard>
  ) : (
    <Login onIdSubmit={setId}></Login>
  );
}
