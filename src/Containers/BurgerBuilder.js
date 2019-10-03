import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Board from "./Board";
import ModalComponent from "../Components/ModalComponent";
import { connect } from "react-redux";
import { eraseIngredients } from "./../Store/actions";

class BurgerBuilder extends Component {
  state = { show: false };
  handleCloseModal = () => {
    this.setState({ show: false });
  };
  handleShowModal = () => {
    this.setState({ show: true });
  };
  handleValid = () => {
    this.props.eraseIngredients();
    this.handleCloseModal();
  };
  render() {
    return (
      <div>
        <Burger />
        <Board click={this.handleShowModal} />
        <ModalComponent
          show={this.state.show}
          close={this.handleCloseModal}
          valid={this.handleValid}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { eraseIngredients: () => dispatch(eraseIngredients()) };
};

export default connect(
  null,
  mapDispatchToProps
)(BurgerBuilder);
