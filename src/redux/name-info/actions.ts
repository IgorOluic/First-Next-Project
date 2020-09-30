import { Dispatch } from "react";
import requestApi from "../../api/request";
import { UPDATE_INFO, NameInfo, NameInfoAction } from "./types";

export const loadNameInfo = () => {
  return (dispatch: Dispatch<NameInfoAction>) => {
    try {
      requestApi().then((data) => {
        dispatch(updateInfo(data));
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const updateInfo = (data: NameInfo): NameInfoAction => {
  return {
    type: UPDATE_INFO,
    payload: {
      ...data,
    },
  };
};
