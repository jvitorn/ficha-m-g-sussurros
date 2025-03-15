"use client";

import { useState } from "react";
import { Navbar, Container, Offcanvas } from "react-bootstrap";

const NavbarDashboard = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <Navbar expand={false} className="mt-3">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            alt="Logo"
            src="/images/logo/logo.svg"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{" "}
          M&G
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={() => setShowOffcanvas(true)}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Perfil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Configurações
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sair
                </a>
              </li>
            </ul>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarDashboard;
