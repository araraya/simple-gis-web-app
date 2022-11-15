import React from "react";
import { useState } from "react";
import "./sidebar.css";

function Accordion({ collapse }) {
  if (!collapse) {
    return <i className="bi bi-caret-right-square-fill"></i>;
  } else {
    return <i className="bi bi-caret-down-square-fill"></i>;
  }
}

function LayerList({ layers }) {
  return (
    <div className="pl-2 pb-0">
      <ul>
        {layers.map((l, i) => {
          if (l.type === "Feature") {
            return <li key={i}>{l.properties.name} </li>;
          }
          if (l.type === "FeatureCollection") {
            return <li key={i}>{l.features[0].properties.name}</li>;
          }
        })}
      </ul>
    </div>
  );
}

function Sidebar({ populateLayers, layerArray }) {
  const [collapse, setCollapse] = useState(false);

  function toogleCollapse() {
    if (collapse) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  }

  const [layers, setLayers] = useState([]);

  const pushLayer = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const feature = JSON.parse(e.target.result);
      layers.push(feature);
      setLayers((l) => [...layers]);
      // console.log(layers);
      populateLayers(feature);
      setCollapse(true);
    };
  };
  console.log(layerArray);
  return (
    <>
      <div className="pt-2 pb-2 m-0">
        <h2>
          <i>Rays Maps</i>
        </h2>
      </div>
      <div className="input-group input-group-sm">
        <input
          className="form-control"
          type="file"
          onChange={pushLayer}
          multiple
        />
      </div>

      <div className="pt-2">
        <span className="pb-0">
          &nbsp;
          <a onClick={toogleCollapse}>
            <Accordion collapse={collapse} />
          </a>
          &nbsp;Layers
        </span>
        <span className="upload-button"></span>
      </div>
      {collapse && layerArray.length > 0 && <LayerList layers={layerArray} />}
      <hr />
    </>
  );
}

export default Sidebar;
