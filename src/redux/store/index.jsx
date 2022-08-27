import { createStore, combineReducers } from "redux";
import tokenReducer from "./token/reducer";
import approvedReducer from "./approved/reducer";

const reducers = combineReducers({
  tokenReducer,approvedReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
