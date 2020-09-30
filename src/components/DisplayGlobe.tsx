import React, { useEffect, FC, Dispatch, MouseEvent } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import { FeatureCollection } from "geojson";
var json: FeatureCollection = require("../../data/geo.json");
import { updateGlobeCoords } from "../redux/coords/actions";
import { RootState } from "../redux/store/store";
import { CoordsType } from "../redux/coords/types";

interface DisplayGlobeProps {
  countryIds: string[];
  mapCoords: number[];
  updateGlobeCoords: (coords: number[]) => void;
}

const DisplayGlobe: FC<DisplayGlobeProps> = (props) => {
  useEffect(() => {
    const w = 485;
    const h = 485;
    const sensitivity = 75;
    const scl = 600 / 2.5;

    const projection = d3
      .geoOrthographic()
      .scale(scl)
      .translate([w / 2, h / 2])
      .rotate([-props.mapCoords[1], -props.mapCoords[0]]);

    const path = d3.geoPath().projection(projection);
    const svg = d3.select("#svgDiv").attr("width", w).attr("height", h);
    const map = d3.select(".gDiv");

    map
      .select(".ocean")
      .datum({ type: "Sphere" })
      .attr("d", path)
      .attr("fill", "#101820ff");

    map
      .selectAll(".country")
      .data(json.features)
      .join("path")
      .attr("class", "country")
      .attr("fill", function (d) {
        switch (d.properties.iso_a2) {
          case props.countryIds[0]:
          case props.countryIds[1]:
          case props.countryIds[2]:
            return "white";
          default:
            return "#f3b059";
        }
      });

    map.selectAll(".country").attr("d", path).attr("stroke", "black");

    const dragged = (event: { dx: number; dy: number }) => {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      let lng = rotate[0] + event.dx * k;
      let lat = rotate[1] - event.dy * k;
      lat = lat > 89 ? 89 : lat < -89 ? -89 : lat;
      projection.rotate([lng, lat]);
      props.updateGlobeCoords([lng, lat]);
      map.selectAll("path").attr("d", path);
    };

    const drag = d3.drag().on("drag", dragged);
    svg.call(drag);
  });

  return (
    <div className="ml-12">
      <svg id="svgDiv">
        <g className="gDiv">
          <path className="ocean stroke-current text-black"></path>
        </g>
      </svg>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    countryIds: state.nameInfo.countryIds,
    mapCoords: state.coords.mapCoords,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<CoordsType>) => {
  return {
    updateGlobeCoords: (coords: number[]) =>
      dispatch(updateGlobeCoords(coords)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGlobe);
