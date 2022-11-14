import React from "react";
import "./App.css";
import { useState } from "react";
import Sidebar from "./Component/Sidebar/Sidebar";
import "leaflet/dist/leaflet.css";
import Map from "./Component/Map";

export default function App() {
  const [layer, setLayer] = useState([]);
  const [addLayer, setAdd] = useState({});
  const [basemap, setBase] = useState(0);
  const populateLayers = (data) => {
    layer.push(data);
    setLayer((l) => [...layer]);
    console.log(layer);
    setAdd(data);
    console.log(addLayer);
  };

  const toogleBasemap = (basemap) => {
    console.log(basemap);
    setBase(basemap);
  };

  return (
    <div>
      <div className="sidebar">
        <Sidebar
          populateLayers={populateLayers}
          tooglebasemap={toogleBasemap}
        />{" "}
      </div>
      <Map addLayer={layer} basemap={basemap} />
    </div>
  );
}
