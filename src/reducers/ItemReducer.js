import constants from '../constants/actionTypes'

let initialState = {
      items: [],
      cart: []
}

const itemReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);

      switch(action.type) {
            case constants.FETCH_ITEMS:
                  updated['items'] = action.items;
                  return updated;
            case constants.ADD_ITEM:
                  var cart = [...updated['cart']];
                  cart.push(action.item);
                  updated['cart'] = cart;
                  return updated;
            default:
                  return state;
      }
}

export default itemReducer;