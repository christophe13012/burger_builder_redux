import * as actions_constants from "./actions_constants";

const initialState = {
  ingredients: {
    Salade: 0,
    Bacon: 0,
    Viande: 0,
    Fromage: 0
  },
  ingredientsPrices: {
    Salade: 1,
    Bacon: 2,
    Viande: 3,
    Fromage: 1.5
  },
  orders: [],
  userInfos: []
};

export const rootReducer = (state = initialState, action) => {
  let ingredients = { ...state.ingredients };
  let orders = [...state.orders];
  switch (action.type) {
    case actions_constants.POPULATE_ORDERS:
      ingredients = action.payload;
      return {
        ...state,
        ingredients
      };
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
    case actions_constants.ADD_ORDER:
      const order = [];
      for (let key in ingredients) {
        order.push({ ingredient: key, quantity: ingredients[key] });
      }
      orders.push(order);
      return {
        ...state,
        orders
      };
    case actions_constants.SAVE_USER_INFOS:
      return {
        ...state,
        userInfos: action.payload
      };
    default:
      return state;
  }
};
