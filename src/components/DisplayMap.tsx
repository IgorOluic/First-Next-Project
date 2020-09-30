import React, { FC, Dispatch } from "react";
import { connect } from "react-redux";
import { Feature, FeatureCollection } from "geojson";
import { Map, GeoJSON, TileLayer } from "react-leaflet-universal";
var countries: FeatureCollection = require("../../data/geo.json");
import { updateMapCoords } from "../redux/coords/actions";
import { RootState } from "../redux/store/store";
import { CoordsType } from "../redux/coords/types";

interface DisplayMapProps {
  countryIds: string[];
  globeCoords: number[];
  updateMapCoords: (coords: number[]) => void;
}

const DisplayMap: FC<DisplayMapProps> = (props) => {
  const countryStyle = {
    fillColor: "#101820ff",
    fillOpacity: 0.5,
    color: "",
    weight: 1,
  };

  const onEachCountry = (
    country: Feature,
    layer: { bindPopup: (countryName: string) => void }
  ) => {
    const countryName: string = country.properties.admin;
    layer.bindPopup(countryName);
  };

  const drawSelectedCountries = (countries: string[]) => {
    return function (feature: Feature) {
      switch (feature.properties.iso_a2) {
        case countries[0]:
        case countries[1]:
        case countries[2]:
          return countryStyle;
        default:
          return {
            fillOpacity: 0,
            color: "",
            weight: 0,
          };
      }
    };
  };

  const onMoveUpdateCoords = (event: {
    target: { getCenter: () => { lat: number; lng: number } };
  }) => {
    let center = event.target.getCenter();
    let centerCoords = [center.lat, center.lng];
    props.updateMapCoords(centerCoords);
  };

  return (
    <Map
      css={`
        height: 100%;
        width: 100%;
        z-index: 0;
      `}
      center={[-props.globeCoords[1], -props.globeCoords[0]]}
      zoom={3}
      minZoom={2}
      maxZoom={5}
      worldCopyJump="true"
      style={{ height: 500, width: 500 }}
      ondrag={onMoveUpdateCoords}
    >
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" />

      <GeoJSON
        style={drawSelectedCountries(props.countryIds)}
        data={countries.features}
        onEachFeature={onEachCountry}
      ></GeoJSON>
    </Map>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    countryIds: state.nameInfo.countryIds,
    globeCoords: state.coords.globeCoords,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<CoordsType>) => {
  return {
    updateMapCoords: (coords: number[]) => dispatch(updateMapCoords(coords)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMap);
