export const UPDATE_INFO = "UPDATE_INFO";

export interface NameInfo {
  name: string;
  age: number;
  gender: string;
  countries: string[];
  countryIds: string[];
  namePopularity: string[];
}

export interface NameInfoAction {
  type: typeof UPDATE_INFO;
  payload: NameInfo;
}
