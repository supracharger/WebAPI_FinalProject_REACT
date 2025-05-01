import constants from '../constants/actionTypes'

let initialState = {
      data: {}
}

const IPReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);

      switch(action.type) {
            case constants.FETCH_GEO:
                  updated['data'] = action.data;
                  return updated;
            default:
                  return state;
      }
}

export default IPReducer;