import * as actions_constants from "./actions_constants";

const initialState = {
  ingredients: {
    Salade: 0,
    Bacon: 0,
    Viande: 0,
    Fromage: 0
  },
  orders: []
};

export const rootReducer = (state = initialState, action) => {
  const ingredients = { ...state.ingredients };
  switch (action.type) {
    case actions_constants.ADD_INGREDIENT:
      ingredients[action.payload] = ingredients[action.payload] + 1;
      return {
        ...state,
        ingredients
      };
    case actions_constants.SUP_INGREDIENT:
      ingredients[action.payload] = ingredients[action.payload] - 1;
      return {
        ...state,
        ingredients
      };
    case actions_constants.ERASE_INGREDIENTS:
      for (let key in ingredients) {
        ingredients[key] = 0;
      }
      console.log(ingredients);

      return {
        ...state,
        ingredients
      };
    default:
      return state;
  }
};
