import React, { useState } from "react";
import { Button, Tab, Modal, Nav } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewContact from "./NewContact";
import NewConversation from "./NewConversation";

const navItems = ["conversations", "contacts"];
const [conversations, contacts] = navItems;
const upperCaseFirst = (i) => {
  return i.charAt(0).toUpperCase() + i.slice(1);
};

export default function Sidebar({ id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("conversations");
  let conversationOpen = activeKey === conversations;
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };

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
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <Button onClick={openModal} className="rounded-0">
          New {conversationOpen ? "conversation" : "contact"}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {conversationOpen ? (
          <NewConversation closeModal={closeModal} />
        ) : (
          <NewContact closeModal={closeModal} />
        )}
      </Modal>

      <div className="text-muted">
        {" "}
        Your ID: <span className="fw-bold">{id}</span>
      </div>
    </div>
  );
}
