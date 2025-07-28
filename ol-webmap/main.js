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
    // url: 'https://jole84.se/tiles/{z}/{x}/{y}.pbf',
    minZoom: 6,
    maxZoom: 14,
  }),
  style: styleStuff
});

const tileDebug = new TileLayer({
  source: new TileDebug({
    template: 'z:{z} x:{x} y:{y} -y:{-y}'
  }),
  visible: false,
});

const view = new View({
    center: [1580736, 7925420],
    zoom: 14
  });

const map = new Map({
  target: 'map',
  layers: [localVector, tileDebug],
  view: view,
});

map.on("singleclick", function (evt) {
  map.forEachFeatureAtPixel(evt.pixel, feature => {
    console.table(feature.getProperties())
  });
});

view.addEventListener("change:resolution", () => {
  console.log(view.getZoom().toFixed(1));
})
