import React, { Component } from "react";
import Joi from "joi";

const schema = {
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  verifPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
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
  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.loginInfos.password === this.state.loginInfos.verifPassword
    ) {
      console.log("submit ok", this.state.loginInfos);
      this.setState({ error: null });
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
      error = "Votre mot de passe doit être de 3 à 30 caractères";
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
          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Entrer email valide"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email && (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.email}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Mot de passe de 3 à 30 caractères"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.errors.password && (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.password}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="verifPassword">Ressaisir le mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="verifPassword"
              placeholder="Mot de passe de 3 à 30 caractères"
              value={this.state.verifPassword}
              onChange={this.handleChange}
            />
            {this.state.errors.verifPassword && (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.verifPassword}
              </div>
            )}
          </div>
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
            S'enregistrer
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
