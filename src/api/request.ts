import axios, { AxiosResponse } from "axios";
import { Feature, FeatureCollection } from "geojson";
var jsonData: FeatureCollection = require("../../data/geo.json");
import { NameInfo } from "../redux/name-info/types";
import { Nationalize, Countries, Agify, Genderize } from "./types";

export default function requestApi() {
  let input = (<HTMLInputElement>document.getElementById("search-input-id"))
    .value;

  if (input) {
    let nationalize = "https://api.nationalize.io?name=" + input;
    let agify = "https://api.agify.io?name=" + input;
    let genderize = "https://api.genderize.io?name=" + input;

    let requestNationalize = axios.get(nationalize);
    let requestAgify = axios.get(agify);
    let requestGenderize = axios.get(genderize);

    let requestArr = [requestNationalize, requestAgify, requestGenderize];
    return axios.all(requestArr).then(
      axios.spread((...responses: any[]) => {
        const nationalize: AxiosResponse<Nationalize> = responses[0];
        const agify: AxiosResponse<Agify> = responses[1];
        const genderize: AxiosResponse<Genderize> = responses[2];

        let data = dataValidator(
          nationalize.data.name,
          nationalize.data.country,
          agify.data.age,
          genderize.data.gender
        );

        return data;
      })
    );
  } else {
    throw new Error("Input field is empty.");
  }
}

function dataValidator(
  name: string,
  countries: Countries[],
  age: number,
  gender: string
): NameInfo {
  let jsonArray = jsonData.features;
  let countriesArr = [];
  let nameFixed = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  let countryIds = countries.map((e) => e.country_id);
  let namePopularity = countries.map((e) => e.probability.toFixed(4));

  getFullCountryNames(jsonArray, countryIds, countriesArr);

  let data = {
    name: nameFixed,
    countries: countriesArr,
    age: age,
    gender: gender,
    countryIds: countryIds,
    namePopularity: namePopularity,
  };

  return data;
}

function getFullCountryNames(
  jsonArr: Feature[],
  idArr: string[],
  countriesArr: string[]
) {
  for (let i = 0; i < idArr.length; i++) {
    for (let j = 0; j < jsonArr.length; j++) {
      if (jsonArr[j].properties.iso_a2 === idArr[i]) {
        countriesArr.push(jsonArr[j].properties.admin);
      }
    }
  }
}
