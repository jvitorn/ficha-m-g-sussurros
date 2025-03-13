// src/components/ThemeNavbar.js
"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function ThemeNavbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log("Tema alterado para:", newTheme);
  };

  return (
    <Navbar
      expand="lg"
      bg={theme === "dark" ? "dark" : "light"}
      variant={theme === "dark" ? "dark" : "light"}
      className="mb-4"
    >
      <Container>
        <Navbar.Brand href="#">Meu Projeto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={handleThemeToggle} style={{ cursor: "pointer" }}>
              {theme === "dark" ? "🌞 Luz de Hylia" : "🌙 Sombra de Ganon"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
