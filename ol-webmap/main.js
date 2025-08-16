import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import TileDebug from 'ol/source/TileDebug.js';
import { styleStuff } from './styleTileFunctions';

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
  center: [1580736, 7925420],
  zoom: 12
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
  if (document.getElementById("layerSelector").value == "remote") {
    localVector.setVisible(false);
    remoteVector.setVisible(true);
  } else {
    localVector.setVisible(true);
    remoteVector.setVisible(false);
  }
}

document.getElementById("layerSelector").addEventListener("change", () => {
  switchMap();
});

view.addEventListener("change:resolution", () => {
  document.getElementById("info1").innerHTML = view.getZoom().toFixed(1);
  document.getElementById("info2").innerHTML = view.getResolution().toFixed(1);
});

document.getElementById("checkbox1").checked = JSON.parse(sessionStorage.vagkarta || "false");
document.getElementById("checkbox1").addEventListener("change", () => {
  sessionStorage.vagkarta = document.getElementById("checkbox1").checked;
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
  if (event.key == "1") {
    document.getElementById("layerSelector").value = "local";
    switchMap();
  }
  if (event.key == "2") {
    document.getElementById("layerSelector").value = "remote";
    switchMap();
  }
});
