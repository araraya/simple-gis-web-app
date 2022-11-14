import React, { useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Polyline,
  Polygon,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
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

function Basemap({ basemapUrl }) {
  return <TileLayer url={basemapUrl} />;
}

export default function Map({ addLayer, basemap }) {
  console.log(addLayer);
  const layers = addLayer;
  const basemapUrl = [
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
  ];
  const [activeBasemap, setActiveBasemap] = useState(0);
  const [basemapIdx, setBasemap] = useState(basemapUrl[activeBasemap]);

  return (
    <MapContainer
      center={[-6.3343, 106.8373]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
    >
      {/* <Basemap basemapUrl={basemapIdx} /> */}
      {/* <TileLayer url={basemapUrl[0]} /> */}
      {/* http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z} */}
      {/* <Layer addLayer={addLayer} /> */}
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
    </MapContainer>
  );
}
