import React, { Component } from "react";
import Joi from "joi";
import axios from "axios";
import Input from "../Components/Input";

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
        window.location.replace("/checkout");

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
    if (arr.indexOf("empty") !== -1)
      error = "Aucun des champs ne doit etre vide";
    if (arr.indexOf("email") !== -1) error = "Votre email n'est pas valide";
    if (arr.indexOf("pattern:") !== -1)
      error = "Votre mot de passe n'est pas assez long";
    this.setState({ error });
  };
  render() {
    console.log(this.props.history);

    return (
      <div style={{ textAlign: "left", padding: 30 }}>
        <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
          Veuillez entrer vos informations :
        </h1>
        <form className="col-6">
          <Input
            placeholder="Entrer email"
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={null}
            label="Adresse email"
          />
          <Input
            placeholder="Entrez votre mot de passe"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            error={null}
            label="Mot de passe"
          />
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
