import React from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";

const ModalComponent = props => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, quantity: props.ingredients[key] });
  }
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Votre burger est fini ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Détail des ingredients :</p>
        {ingredients.map(igd => {
          return (
            <p key={igd.name}>
              {igd.name} : {igd.quantity} pièces
            </p>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Non, je rajoute des ingrédients
        </Button>
        <Button variant="primary" onClick={props.valid}>
          Oui, aller au checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(ModalComponent);
