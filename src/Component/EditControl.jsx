import React from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

function Edit({ populateLayers }) {
  const _onCreated = (e) => {
    let layerType = e.layerType;
    let _coordinates = e.layer._latlng;
    let _name = "";
    if (
      layerType === "marker" ||
      layerType === "circle" ||
      layerType === "circlemarker"
    ) {
      layerType = "Point";
      _coordinates = [e.layer._latlng.lng, e.layer._latlng.lat];
      _name = "new " + layerType;
    }
    if (layerType === "polyline") {
      layerType = "LineString";
      _coordinates = e.layer._latlngs.map((e) => {
        return [e.lng, e.lat];
      });
      _name = "new " + layerType;
    }
    if (layerType === "polygon") {
      layerType = "Polygon";
      _coordinates = [];
      e.layer._latlngs.forEach((e) => {
        const _coord = [];
        e.forEach((ev) => {
          const getCoord = [ev.lng, ev.lat];
          _coord.push(getCoord);
        });
        _coordinates.push(_coord);
      });
      _name = "new " + layerType;
    }

    const geoJson = {
      type: "Feature",
      geometry: {
        type: layerType,
        coordinates: _coordinates,
      },
      properties: {
        name: _name,
        shapeFromMap: true,
      },
    };
    populateLayers(geoJson);
  };
  const _onEdited = (e) => {};
  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onEdited={_onEdited}
        onCreated={_onCreated}
        // onDeleted={this._onDeleted}
        draw={{
          rectangle: false,
        }}
      />
    </FeatureGroup>
  );
}

export default Edit;
