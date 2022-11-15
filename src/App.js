import React from "react";
import "./App.css";
import { useState } from "react";
import Sidebar from "./Component/Sidebar/Sidebar";
import "leaflet/dist/leaflet.css";
import Map from "./Component/Map";

export default function App() {
  const [layer, setLayer] = useState([]);
  const populateLayers = (data) => {
    layer.push(data);
    setLayer((l) => [...layer]);
    console.log(layer);
  };

  return (
    <div>
      <div className="sidebar">
        <Sidebar populateLayers={populateLayers} />{" "}
      </div>
      <Map addLayer={layer} populateLayers={populateLayers} />
    </div>
  );
}
