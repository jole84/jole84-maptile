import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import TileDebug from 'ol/source/TileDebug.js';
import { styleStuff } from './styleTileFunctions';

localStorage.mapMode = localStorage.mapMode || 0;

const localVector = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url: './tiles/{z}/{x}/{y}.pbf',
    minZoom: 6,
    maxZoom: 14,
  }),
  declutter: true,
  style: styleStuff
});

const remoteVector = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url: 'https://jole84.se/tiles/{z}/{x}/{y}.pbf',
    minZoom: 6,
    maxZoom: 14,
  }),
  declutter: true,
  style: styleStuff,
  visible: false,
});

const tileDebug = new TileLayer({
  source: new TileDebug({
    template: 'z:{z} x:{x} y:{y} -y:{-y}'
  }),
  visible: false,
});

const view = new View({
  center: JSON.parse(localStorage.centerCoordinate || "[1580736, 7925420]"),
  zoom: JSON.parse(localStorage.centerZoom || "12"),
  maxZoom: 20,
});

const map = new Map({
  target: 'map',
  layers: [localVector, remoteVector, tileDebug],
  view: view,
  keyboardEventTarget: document,
});

map.on("singleclick", function (evt) {
  map.forEachFeatureAtPixel(evt.pixel, feature => {
    console.table(feature.getProperties());


    if (feature.get("layer") == "TNE_FT_VAGDATA") {
      console.log(feature.get("maxspeed"))
      return true;
    }
  });
});

function switchMap() {
  sessionStorage.layerSelector = document.getElementById("layerSelector").value;
  if (document.getElementById("layerSelector").value == "remote") {
    localVector.setVisible(false);
    remoteVector.setVisible(true);
  } else {
    localVector.setVisible(true);
    remoteVector.setVisible(false);
  }
}

document.getElementById("layerSelector").value = sessionStorage.layerSelector || "local";
document.getElementById("layerSelector").addEventListener("change", () => {
  switchMap();
});
switchMap();

window.onbeforeunload = function () {
  localStorage.centerCoordinate = JSON.stringify(view.getCenter());
  localStorage.centerZoom = view.getZoom();
}

document.getElementById("info1").innerHTML = view.getZoom().toFixed(1);
document.getElementById("info2").innerHTML = view.getResolution().toFixed(1);

view.addEventListener("change:resolution", () => {
  document.getElementById("info1").innerHTML = view.getZoom().toFixed(1);
  document.getElementById("info2").innerHTML = view.getResolution().toFixed(1);
});

document.getElementById("mapMode").value = localStorage.mapMode || 0;
document.getElementById("mapMode").addEventListener("change", () => {
  localStorage.mapMode = document.getElementById("mapMode").value;
  localVector.getSource().refresh({ force: true });
  remoteVector.getSource().refresh({ force: true });
});

document.addEventListener("keydown", function (event) {
  if (event.key == "z") {
    view.adjustRotation(0.2);
  }
  if (event.key == "x") {
    view.adjustRotation(-0.2);
  }
  if (event.key == "0") {
    localStorage.mapMode = 0;
    document.getElementById("mapMode").value = "0";
    localVector.getSource().refresh({ force: true });
    remoteVector.getSource().refresh({ force: true });
  }
  if (event.key == "1") {
    localStorage.mapMode = 1;
    document.getElementById("mapMode").value = "1";
    localVector.getSource().refresh({ force: true });
    remoteVector.getSource().refresh({ force: true });
  }
  if (event.code == "Space") {
    if (document.getElementById("layerSelector").value == "local") {
      document.getElementById("layerSelector").value = "remote";
    } else {
      document.getElementById("layerSelector").value = "local";
    }
    switchMap();
  }
});
