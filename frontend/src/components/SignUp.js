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






class SignUp extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    // If pass 1 == pass 2 
    if (e.target.password1.value === e.target.password2.value){
      this.props.onSignUp(e.target.nom.value, e.target.prenom.value, e.target.username.value, e.target.email.value, e.target.password1.value);
    }
    //console.log(e.target.nom.value, e.target.prenom.value, e.target.username.value, e.target.email.value, e.target.password1.value, e.target.password2.value)
  };
  render() {
    return (
      <div className="loginPage">
        {this.props.isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <Container className="loginCont mx-auto shadow">
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit} className="pt-5 ">
                  <h1 className="title text-center pb-1" id="titleCnx">
                    Sign Up
                  </h1>
                  <div className="pt-3 pb-3 ">
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="title">Nom </Form.Label>
                          <Form.Control
                            name="nom"
                            placeholder="nom"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="title">Prénom</Form.Label>
                          <Form.Control
                            name="prenom"
                            placeholder="prénom"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="title">Nom utilisateur</Form.Label>
                          <Form.Control
                            name="username"
                            placeholder="Nom utilisateur"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="title">Email</Form.Label>
                          <Form.Control
                            name="email"
                            type="Email"
                            placeholder="Email"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                          <Form.Label className="title">Nouveau mot de passe</Form.Label>
                          <Form.Control
                            name="password1"
                            type="password"
                            placeholder="Nouveau mot de passe"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                          <Form.Label className="title">Confirmer le mot de passe</Form.Label>
                          <Form.Control
                            name="password2"
                            type="password"
                            placeholder="Confirmer le mot de passe"
                          />
                        </Form.Group>

                        <div className="text-center pt-3">
                          <Button
                            type="submit"
                            variant="primary"
                          >
                            S'inscrire
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
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
    onSignUp: (nom, prenom, username, email, password) =>
      dispatch(actions.authSignup(nom, prenom, username, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);