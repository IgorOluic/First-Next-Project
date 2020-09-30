export interface Nationalize {
  name: string;
  country: Countries[];
}

export interface Countries {
  country_id: string;
  probability: number;
}

export interface Agify {
  name: string;
  age: number;
  count: number;
}

export interface Genderize {
  name: string;
  gender: string;
  probability: number;
  count: number;
}
