export const UPDATE_GLOBE_COORDS = "UPDATE_GLOBE_COORDS";
export const UPDATE_MAP_COORDS = "UPDATE_MAP_COORDS";

export interface Coords {
  globeCoords: number[];
  mapCoords: number[];
}

interface UpdateGlobeCoordsAction {
  type: typeof UPDATE_GLOBE_COORDS;
  globeCoords: number[];
}

interface UpdateMapCoordsAction {
  type: typeof UPDATE_MAP_COORDS;
  mapCoords: number[];
}

export type CoordsType = UpdateGlobeCoordsAction | UpdateMapCoordsAction;
