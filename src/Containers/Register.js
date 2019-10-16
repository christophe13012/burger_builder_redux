import React, { Component } from "react";
import Joi from "joi";
import Input from "../Components/Input";
import axios from "axios";

const schema = {
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
  verifPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required()
};

class Register extends Component {
  state = {
    loginInfos: { email: "", password: "", verifPassword: "" },
    errors: { email: null, password: null, verifPassword: null },
    error: null
  };
  handleChange = e => {
    const loginInfos = { ...this.state.loginInfos };
    const errors = { ...this.state.errors };
    loginInfos[e.target.id] = e.target.value;
    const result = Joi.validate(e.target.value, schema[e.target.id]);
    if (result.error !== null) {
      const error = this.traduireMessage(result.error.details[0].message);
      errors[e.target.id] = error;
    } else {
      errors[e.target.id] = null;
    }
    this.setState({ loginInfos, errors });
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (
      this.state.loginInfos.password === this.state.loginInfos.verifPassword
    ) {
      const authData = {
        email: this.state.loginInfos.email,
        password: this.state.loginInfos.password,
        returnSecureToken: true
      };
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfWM4xAXaIT7wpWcpU_jPN0OiC4gWoE1w",
          authData
        );
        localStorage.setItem("token", response.data.idToken);
        window.location.replace(
          "https://christophe13012.github.io/burger_builder_redux"
        );
      } catch (error) {
        this.setState({ error: "Email déjà utilisé" });
      }
    } else {
      this.setState({ error: "Les mots de passe ne sont pas identiques" });
    }
  };
  traduireMessage = message => {
    let error;
    const arr = message.split(" ");
    if (arr.indexOf("empty") !== -1) error = "Le champs ne doit etre vide";
    if (arr.indexOf("email") !== -1) error = "Votre email n'est pas valide";
    if (arr.indexOf("pattern:") !== -1)
      error = "Votre mot de passe doit être de 6 à 30 caractères";
    return error;
  };
  render() {
    let disabled = false;
    for (let key in this.state.errors) {
      if (this.state.errors[key] !== null || this.state.loginInfos[key] === "")
        disabled = true;
    }
    return (
      <div style={{ textAlign: "left", padding: 30 }}>
        <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
          Veuillez entrer vos informations :
        </h1>
        <form className="col-6">
          <Input
            placeholder="Entrer email valide"
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={this.state.errors.email}
            label="Email"
          />
          <Input
            placeholder="Mot de passe de 6 à 30 caractères"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            error={this.state.errors.password}
            label="Mot de passe"
          />
          <Input
            placeholder="Mot de passe de 6 à 30 caractères"
            type="password"
            id="verifPassword"
            value={this.state.verifPassword}
            onChange={this.handleChange}
            error={this.state.errors.verifPassword}
            label="Confirmation mot de passe"
          />
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          )}
          <button
            disabled={disabled}
            onClick={this.handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            S'inscrire
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
