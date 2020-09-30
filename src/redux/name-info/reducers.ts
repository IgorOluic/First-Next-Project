import { UPDATE_INFO, NameInfo, NameInfoAction } from "./types";

const defaultState: NameInfo = {
  name: "",
  age: 0,
  gender: "",
  countries: [],
  countryIds: [],
  namePopularity: [],
};

export const nameInfoReducer = (
  state = defaultState,
  action: NameInfoAction
) => {
  switch (action.type) {
    case UPDATE_INFO: {
      return {
        ...state,
        name: action.payload.name,
        countries: action.payload.countries,
        age: action.payload.age,
        gender: action.payload.gender,
        countryIds: action.payload.countryIds,
        namePopularity: action.payload.namePopularity,
      };
    }
    default:
      return state;
  }
};

export default nameInfoReducer;
