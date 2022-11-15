import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Polygon,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
});

const { BaseLayer } = LayersControl;

function Point({ layer }) {
  const coordinates = [
    layer.geometry.coordinates[1],
    layer.geometry.coordinates[0],
  ];
  const redOptions = { color: "red" };
  return <Marker position={coordinates}></Marker>;
}

function Line({ layer }) {
  const coordinates = layer.geometry.coordinates.map((c) => {
    return [c[1], c[0]];
  });
  return <Polyline positions={coordinates} />;
}

function Poly({ layer }) {
  const coordinates = [];
  layer.geometry.coordinates.forEach((c) => {
    c.forEach((co) => {
      coordinates.push([co[1], co[0]]);
    });
  });
  return <Polygon positions={coordinates} />;
}

export default function Map({ addLayer }) {
  console.log(addLayer);
  const layers = addLayer;
  const _onCreated = (e) => {
    console.log(e);
  };

  return (
    <MapContainer
      center={[-6.3343, 106.8373]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
    >
      <LayersControl>
        <BaseLayer checked name="OSM">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        <BaseLayer name="Google Sattelite">
          <TileLayer url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}" />
        </BaseLayer>
      </LayersControl>
      {layers.map((l, i) => {
        if (l.type === "Feature") {
          if (l.geometry.type === "Point") {
            return <Point key={i} layer={l} />;
          }
          if (l.geometry.type === "LineString") {
            return <Line key={i} layer={l} />;
          }
          if (l.geometry.type === "Polygon") {
            return <Poly key={i} layer={l} />;
          }
        }
      })}

      <FeatureGroup>
        <EditControl
          position="topright"
          // onEdited={this._onEditPath}
          onCreated={_onCreated}
          // onDeleted={this._onDeleted}
          draw={{
            rectangle: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
