import {
  UPDATE_GLOBE_COORDS,
  UPDATE_MAP_COORDS,
  CoordsType,
  Coords,
} from "./types";

const defaultState: Coords = {
  globeCoords: [0, 0],
  mapCoords: [0, 0],
};

const coordsReducer = (state = defaultState, action: CoordsType) => {
  switch (action.type) {
    case UPDATE_GLOBE_COORDS: {
      return {
        ...state,
        globeCoords: action.globeCoords,
      };
    }
    case UPDATE_MAP_COORDS: {
      return {
        ...state,
        mapCoords: action.mapCoords,
      };
    }
    default:
      return state;
  }
};

export default coordsReducer;
