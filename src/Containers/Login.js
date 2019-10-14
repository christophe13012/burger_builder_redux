import React, { Component } from "react";
import Joi from "joi";
import axios from "axios";

const schema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});

class Login extends Component {
  state = { loginInfos: { email: "", password: "" }, error: null };
  handleChange = e => {
    const loginInfos = { ...this.state.loginInfos };
    loginInfos[e.target.type] = e.target.value;
    this.setState({ loginInfos });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const result = Joi.validate(this.state.loginInfos, schema);
    if (result.error === null) {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfWM4xAXaIT7wpWcpU_jPN0OiC4gWoE1w",
          this.state.loginInfos
        );
        localStorage.setItem("token", response.data.idToken);
        window.location.replace("/burger_builder");
        this.setState({ error: null });
      } catch (error) {
        this.setState({ error: "Email ou mot de passe incorrect" });
      }
    } else {
      this.traduireMessage(result.error.details[0].message);
    }
  };
  traduireMessage = message => {
    let error;
    const arr = message.split(" ");
    console.log(arr);

    if (arr.indexOf("empty") !== -1)
      error = "Aucun des champs ne doit etre vide";
    if (arr.indexOf("email") !== -1) error = "Votre email n'est pas valide";
    if (arr.indexOf("pattern:") !== -1)
      error = "Votre mot de passe n'est pas assez long";
    this.setState({ error });
  };
  render() {
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
              placeholder="Entrer email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          )}
          <button
            onClick={this.handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Se connecter
          </button>
        </form>
      </div>
    );
  }
}

export default Login;