import React, { FC } from "react";
import { connect } from "react-redux";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import Flag from "react-world-flags";
import { RootState } from "../redux/store/store";
import { NameInfo } from "../redux/name-info/types";

const DisplayContent: FC<NameInfo> = (props) => {
  const drawAllResults = (props: NameInfo) => {
    if (props.countryIds[0]) {
      return (
        <div>
          {renderGenderIcon(props.gender)}
          <div>
            <p>Average age: {props.age}</p>
          </div>
          <div>
            <p>{props.countries[0]} </p>
            <Flag
              height="50"
              width="50"
              className="pb-1"
              code={props.countryIds[0]}
            />
            <p>Name popularity: {props.namePopularity[0]}%</p>
          </div>
          <div>
            <p>{props.countries[1]}</p>
            <Flag
              height="50"
              width="50"
              className="pb-1"
              code={props.countryIds[1]}
            />
            <p>Name popularity: {props.namePopularity[1]}%</p>
          </div>
          <div>
            <p>{props.countries[2]}</p>
            <Flag
              height="50"
              width="50"
              className="pb-1"
              code={props.countryIds[2]}
            />
            <p>Name popularity: {props.namePopularity[2]}%</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>No results found.</p>
        </div>
      );
    }
  };

  const renderGenderIcon = (gender: string) => {
    if (gender === "male") {
      return (
        <div>
          <IoMdMale />
        </div>
      );
    } else if (gender === "female") {
      return (
        <div>
          <IoMdFemale />
        </div>
      );
    }
  };

  if (props.name) {
    return (
      <div>
        <div>
          <p>{props.name}</p>
        </div>
        {drawAllResults(props)}
      </div>
    );
  } else {
    return (
      <div>
        <p>
          Your results <br />
          will be shown here.
        </p>
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    name: state.nameInfo.name,
    gender: state.nameInfo.gender,
    age: state.nameInfo.age,
    countries: state.nameInfo.countries,
    countryIds: state.nameInfo.countryIds,
    namePopularity: state.nameInfo.namePopularity,
  };
};

export default connect(mapStateToProps)(DisplayContent);
