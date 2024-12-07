import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import './NavBar.css';

function AppNavbar() {
    const location = useLocation();

    return (
        <Navbar bg="light" expand="lg" aria-controls="basic-navbar-nav">
            <Navbar.Brand className="navbar-brand-bold" as={Link} to="/" style={{ paddingLeft: '2rem' }}>Ol Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ justifyContent: 'flex-start' }}>
                    <Nav.Link 
                        as={Link} 
                        to="/" 
                        className={location.pathname === "/" ? "active-link" : ""}
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} 
                        to="/cart" 
                        className={location.pathname === "/cart" ? "active-link" : ""}
                    >
                        Cart
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppNavbar;
