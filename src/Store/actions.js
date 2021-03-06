import * as actions_constants from "./actions_constants";

export const addIngredient = payload => {
  return {
    type: actions_constants.ADD_INGREDIENT,
    payload
  };
};

export const supIngredient = payload => {
  return {
    type: actions_constants.SUP_INGREDIENT,
    payload
  };
};

export const AddOrder = () => {
  return {
    type: actions_constants.ADD_ORDER
  };
};

export const saveUserInfos = payload => {
  return {
    type: actions_constants.SAVE_USER_INFOS,
    payload
  };
};

export const populateOrders = payload => {
  return {
    type: actions_constants.POPULATE_ORDERS,
    payload
  };
};

export const populateIngredients = payload => {
  return {
    type: actions_constants.POPULATE_INGREDIENTS,
    payload
  };
};

export const eraseBurger = () => {
  return {
    type: actions_constants.ERASE_BURGER
  };
};

export const deleteOrder = payload => {
  return {
    type: actions_constants.DELETE_ORDER,
    payload
  };
};
