import { CoordsType, UPDATE_MAP_COORDS, UPDATE_GLOBE_COORDS } from "./types";

export const updateGlobeCoords = (coords: number[]): CoordsType => {
  return {
    type: UPDATE_GLOBE_COORDS,
    globeCoords: coords,
  };
};

export const updateMapCoords = (coords: number[]): CoordsType => {
  return {
    type: UPDATE_MAP_COORDS,
    mapCoords: coords,
  };
};
