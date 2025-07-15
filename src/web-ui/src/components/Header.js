import React from "react"
import { Nav, Navbar, NavItem } from "react-bootstrap"

import AddUserModal from "./AddUserModal"
import RekognitionButton from "./RekognitionButton"

const Header = (props) => (
  <Navbar inverse style={{ backgroundColor: "blue" }}>
    <Navbar.Header>
      <Navbar.Brand bsStyle="dark">LMG</Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight style={{ paddingTop: "8px" }}>
        <RekognitionButton
          onClick={props.toggleRekognition}
          enabled={props.readyToStream}
        />
        <AddUserModal onSave={props.addUser} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
