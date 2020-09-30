import React, { Dispatch, FC, KeyboardEvent } from "react";
import { connect } from "react-redux";
import { loadNameInfo } from "../redux/name-info/actions";
import { BsSearch } from "react-icons/bs";
import { NameInfoAction } from "../redux/name-info/types";

interface InputFieldProps {
  loadNameInfo: () => Dispatch<NameInfoAction>;
}

const InputField: FC<InputFieldProps> = (props) => {
  const _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      props.loadNameInfo();
    }
  };

  return (
    <div>
      <div>
        <button onClick={props.loadNameInfo}>
          <BsSearch />
        </button>
        <input
          maxLength={14}
          onKeyDown={_handleKeyDown}
          autoComplete="off"
          id="search-input-id"
          placeholder="Type a name here..."
        ></input>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    loadNameInfo: () => dispatch(loadNameInfo()),
  };
};

export default connect(null, mapDispatchToProps)(InputField);
