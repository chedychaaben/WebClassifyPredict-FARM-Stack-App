import React from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "../assets/css/Login.css";
// Redux Imports
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAuth(e.target.username.value, e.target.password.value);
  };
  render() {
    return (
      <div className="loginPage">
        {this.props.isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <Container className="loginCont shadow mx-auto">
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit} className="pt-5 ">
                  <h1 className="title text-center pb-1" id="titleCnx">
                    Connexion
                  </h1>
                  <div className="pt-3 pb-3 ">
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label className="title">Nom utilisateur</Form.Label>
                      <Form.Control
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        placeholder="username"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="title">Mot de passe</Form.Label>
                      <Form.Control
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="password"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Enregistrer le mot de passe"
                        className="title"
                      />
                    </Form.Group>
                    <div className="text-center pt-3">
                      <Button type="submit" variant="primary">
                        Se connecter
                      </Button>
                    </div>
                  </div>
                  <Container>
                    <Row>
                      <Col md={4}>
                        <Nav.Link as={Link} to="/" className="title">
                          Mot de passe oublié ?
                        </Nav.Link>
                      </Col>

                      <Col md={{ span: 4, offset: 4 }}>
                        <div>
                          <Nav.Link as={Link} to="/signup" className="title">
                            Créer nouveau compte?
                          </Nav.Link>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
