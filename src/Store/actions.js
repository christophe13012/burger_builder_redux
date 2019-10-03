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

export const eraseIngredients = () => {
  return {
    type: actions_constants.ERASE_INGREDIENTS
  };
};
