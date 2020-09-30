import thunk from "redux-thunk";
import coordsReducer from "../coords/reducers";
import nameInfoReducer from "../name-info/reducers";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

const rootReducer = combineReducers({
  nameInfo: nameInfoReducer,
  coords: coordsReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof rootReducer>;
