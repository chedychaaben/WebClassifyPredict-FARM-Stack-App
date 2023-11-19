import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/auth";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="shadow "
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" className="title fw-bold fs-3" id="titleHead">
              <img
                src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg"
                alt="Piximind"
              />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {!isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/login" className="title">
                    Se connecter
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" className="title">
                    Créer un compte
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  onClick={() => {
                    dispatch(actions.logout());
                  }}
                  className="title"
                >
                  Déconnexion
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
