import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";

const navItems = ["conversations", "contacts"];
const [conversations, contacts] = navItems;
const upperCaseFirst = (i) => {
  return i.charAt(0).toUpperCase() + i.slice(1);
};

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState("conversations");
  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          {navItems.map((i) => (
            <Nav.Item key={i}>
              <Nav.Link eventKey={i}>{upperCaseFirst(i)}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content className="border border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={conversations}>
            <Conversations></Conversations>
          </Tab.Pane>
          <Tab.Pane eventKey={contacts}>
            <Contacts></Contacts>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
