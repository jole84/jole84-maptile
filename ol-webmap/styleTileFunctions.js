import { Stroke, Style, Icon, Fill, Text } from "ol/style.js";

// --- Constants & Lookups ---
const degToRad = (deg) => (deg * Math.PI * 2) / 360;

const roadWidth = { "Småväg": 0.7, "Landsväg liten": 1.5, "Landsväg": 2, "Motortrafikled": 3, "Mötesfri väg": 3, "Motorväg": 4 };
const textAlign = { 1: "left", 3: "right", 4: "left", 5: "center", 6: "right", 7: "left", 9: "right" };
const textBaseline = { 1: "bottom", 2: "bottom", 3: "bottom", 4: "middle", 5: "middle", 6: "middle", 7: "top", 8: "top", 9: "top" };
const dashPolygon = ['Militärt övningsfält', "Kulturreservat"];

const colorArray = [
  // normal mapMode 0
  {
    "textColorFill": "black",
    "textColorStroke": "white",
    "Anlagt vatten": "#bfe6ffff",
    "Barr- och blandskog": "#d4eeb7ff",
    "Bebyggelse": "#eebf8fff",
    "belagd": "#000000",
    "forbud": "#000000",
    "bidrag": "#ac7c45",
    "Djurskyddsområde": "#77e250a6",
    "Ej karterat område": "#bfe6ffff",
    "Elljusspår": "#fff201ff",
    "Fjällbjörkskog": "#d9f5d1ff",
    "Fruktodling": "#fff7a6ff",
    "Glaciär": "#ffffffff",
    "grus": "#ac7c45",
    "Gångstig": "#6e6e6eff",
    "Hav": "#bfe6ffff",
    "Hög bebyggelse": "#eebf8fff",
    "Industri- och handelsbebyggelse": "#f0f0f0ff",
    "Kalfjäll": "#fffff2ff",
    "Kulturreservat": "#0000007e",
    "Låg bebyggelse": "#f2cf9bff",
    "Lövskog": "#e3f7c7ff",
    "Militärt skjutfält": "#00a6e6ff",
    "Militärt övningsfält": "#00a6e6ff",
    "Nationalpark": "#77e250a6",
    "Naturreservat": "#77e250a6",
    "Naturvårdsområde": "#4fba2898",
    "ovrigvag": "#d94c26",
    "rondell": '#007dff',
    "Sjö": "#bfe6ffff",
    "Skog": "#d4eeb7ff",
    "Sluten bebyggelse": "#d99461ff",
    "Start- och landningsbana, linje": "#7d7d7d",
    "Start- och landningsbana": "#7d7d7d",
    "stratvag": "#000000",
    "Traktorväg": "#ac7c45ff",
    "Vattendrag": "#00a6ff",
    "Vattendragsyta": "#bfe6ffff",
    "Vattenyta": "#bfe6ffff",
    "Åker": "#f8fbdfff",
    "Öppen mark": "#ffffeaff",
  },
  {
    // vägkarta mapMode 1
    "textColorFill": "black",
    "textColorStroke": "white",
    "Anlagt vatten": "#b7d5e5ff",
    "Barr- och blandskog": "#ededed",
    "Bebyggelse": "#d4d4d4",
    "belagd": "#000000",
    "forbud": "#ff0000ff",
    "bidrag": "#bababa",
    "Ej karterat område": "#b7d5e5ff",
    "Elljusspår": "#fff201ff",
    "Fjällbjörkskog": "#ededed",
    "Fruktodling": "#ededed",
    "Glaciär": "#ffffff",
    "grus": "#bababa",
    "Gångstig": "#6e6e6eff",
    "Hav": "#b7d5e5ff",
    "Hög bebyggelse": "#d4d4d4",
    "Industri- och handelsbebyggelse": "#dddddd",
    "Kalfjäll": "#fcfcfc",
    "Kulturreservat": "black",
    "Låg bebyggelse": "#d4d4d4",
    "Lövskog": "#ededed",
    "Militärt skjutfält": "#00a6e6ff",
    "Militärt övningsfält": "#00a6e6ff",
    "ovrigvag": "#d94c26",
    "rondell": '#007dff',
    "Sjö": "#b7d5e5ff",
    "Skog": "#ededed",
    "Sluten bebyggelse": "#d4d4d4",
    "Start- och landningsbana, linje": "#7d7d7d",
    "Start- och landningsbana": "#7d7d7d",
    "stratvag": "#2ab52aff",
    "Traktorväg": "#bababa",
    "Vattendrag": "#b7d5e5ff",
    "Vattendragsyta": "#b7d5e5ff",
    "Vattenyta": "#b7d5e5ff",
    "Åker": "#fcfcfc",
    "Öppen mark": "#fcfcfc",
  },
  {
    // dark mapMode 2
    "textColorFill": "#e9e9e9ff",
    "textColorStroke": "black",
    "Anlagt vatten": "#00263F",
    "Barr- och blandskog": "#121212",
    "Bebyggelse": "#2B2B2B",
    "belagd": "#e9e9e9ff",
    "forbud": "#ff0000ff",
    "bidrag": "#454545",
    "Ej karterat område": "#030303",
    "Elljusspår": "#fff201ff",
    "Fjällbjörkskog": "#121212",
    "Fruktodling": "#121212",
    "Glaciär": "#030303",
    "grus": "#454545",
    "Gångstig": "#6e6e6eff",
    "Hav": "#00263F",
    "Hög bebyggelse": "#2B2B2B",
    "Industri- och handelsbebyggelse": "#2B2B2B",
    "Kalfjäll": "#030303",
    "Kulturreservat": "black",
    "Låg bebyggelse": "#2B2B2B",
    "Lövskog": "#121212",
    "Militärt skjutfält": "#00a6e6ff",
    "Militärt övningsfält": "#00a6e6ff",
    "ovrigvag": "#d94c26",
    "rondell": '#007dff',
    "Sjö": "#00263F",
    "Skog": "#121212",
    "Sluten bebyggelse": "#2B2B2B",
    "Start- och landningsbana, linje": "#7d7d7d",
    "Start- och landningsbana": "#7d7d7d",
    "stratvag": "#31bd31",
    "Traktorväg": "#454545",
    "Vattendrag": "#00263F",
    "Vattendragsyta": "#00263F",
    "Vattenyta": "#00263F",
    "Åker": "#030303",
    "Öppen mark": "#030303",
  }
]

const kartsymboler = {
  "Badplats": "https://jole84.se/kartsymboler/badplats.svg",
  "Bollplan": "https://jole84.se/kartsymboler/idrott_fotbollsplan.svg",
  "Campingplats": "https://jole84.se/kartsymboler/camping.svg",
  "Fotbollsplan": "https://jole84.se/kartsymboler/idrott_fotbollsplan.svg",
  "Galoppbana": "https://jole84.se/kartsymboler/idrott_anlaggning.svg",
  "Gästhamn": "https://jole84.se/kartsymboler/gasthamn.svg",
  "Hamn": "https://jole84.se/kartsymboler/gasthamn.svg",
  "Skjutbana, mindre": "https://jole84.se/kartsymboler/idrott_skjutbana_liten.svg",
  "Skjutbana": "https://jole84.se/kartsymboler/idrott_skjutbana.svg",
  "Småbåtshamn": "https://jole84.se/kartsymboler/gasthamn.svg",
  "Travbana": "https://jole84.se/kartsymboler/idrott_anlaggning.svg",
  1042: "https://jole84.se/kartsymboler/kyrka.svg",
  1044: "https://jole84.se/kartsymboler/kata.svg",
  1045: "https://jole84.se/kartsymboler/torn.svg",
  1046: "https://jole84.se/kartsymboler/vindskydd2.svg",
  1047: "https://jole84.se/kartsymboler/vaderkvarn.svg",
  1051: "https://jole84.se/kartsymboler/fyr.svg",
  1742: "https://jole84.se/kartsymboler/transformator.svg",
  1922: "https://jole84.se/kartsymboler/slussport.svg",
  1923: "https://jole84.se/kartsymboler/dammbyggnad.svg",
  2016: "https://jole84.se/kartsymboler/cistern.svg",
  2019: "https://jole84.se/kartsymboler/mast.svg",
  2022: "https://jole84.se/kartsymboler/skorsten.svg",
  2025: "https://jole84.se/kartsymboler/vindkraft.svg",
  2033: "https://jole84.se/kartsymboler/fjallstation.svg",
  2034: "https://jole84.se/kartsymboler/hus_herrgard.svg",
  2035: "https://jole84.se/kartsymboler/kärnkraftverk.svg",
  2037: "https://jole84.se/kartsymboler/kyrka_liten.svg",
  2038: "https://jole84.se/kartsymboler/hus_slott.svg",
  2042: "https://jole84.se/kartsymboler/sjukhus.svg",
  2045: "https://jole84.se/kartsymboler/hus1.svg",
  2046: "https://jole84.se/kartsymboler/hus2.svg",
  2047: "https://jole84.se/kartsymboler/hus3.svg",
  2049: "https://jole84.se/kartsymboler/hus_gard.svg",
  2203: "https://jole84.se/kartsymboler/vagbom.svg",
  2205: "https://jole84.se/kartsymboler/vandplats.svg",
  2511: "https://jole84.se/kartsymboler/fornlamning.svg",
  2512: "https://jole84.se/kartsymboler/cistern.svg",
  2513: "https://jole84.se/kartsymboler/milstolpe.svg",
  2514: "https://jole84.se/kartsymboler/ruin.svg",
  2515: "https://jole84.se/kartsymboler/minnessten.svg",
  2516: "https://jole84.se/kartsymboler/kulturminne.svg",
  2517: "https://jole84.se/kartsymboler/gruvhal.svg",
  2518: "https://jole84.se/kartsymboler/kulturminne.svg",
  2852: "https://jole84.se/kartsymboler/helikopterlandning.svg",
};

// --- Style Caches ---
const cache = {
  fill: new Map(),
  stroke: new Map(),
  icon: new Map()
};

const getFill = (color) => {
  if (!cache.fill.has(color)) cache.fill.set(color, new Fill({ color }));
  return cache.fill.get(color);
};

const getStroke = (color, width, lineDash, lineCap = "round") => {
  const key = `${color}|${width}|${lineDash}|${lineCap}`;
  if (!cache.stroke.has(key)) {
    cache.stroke.set(key, new Stroke({ color, width, lineDash, lineCap }));
  }
  return cache.stroke.get(key);
};

const getIcon = (src, scale = 1, rotation = 0, rotateWithView = false, displacement = [0, 0]) => {
  const key = `${src}|${scale}|${rotation}|${rotateWithView}|${displacement.join(',')}`;
  if (!cache.icon.has(key)) {
    cache.icon.set(key, new Icon({ src, scale, rotation, rotateWithView, displacement, declutterMode: "none" }));
  }
  return cache.icon.get(key);
};

const getTextFont = (feature) => {
  const italicText = ["Administrativ indelning", "Fjällupplysningstext", "Hydrografi", "Kulturhistorisk lämning", "Skyddad natur", "Terrängnamn", "Upplysningstext"];
  const isItalic = italicText.includes(feature.get("textkategori")) ? "italic " : "";
  const size = (feature.get("textstorleksklass") * 2.5) + 6;
  return `${isItalic}${size}px arial, sans-serif`;
};

// --- Layer Handlers ---
const handlers = {
  "TNE_FT_VAGDATA": (feature, res, mode) => {
    const vagtyp = feature.get("vagtyp");
    const width = feature.get("width") / 8;
    const styles = [new Style({
      zIndex: vagtyp === 'rondell' ? 100 : vagtyp === 'stratvag' ? 50 : vagtyp === 'forbud' ? 40 : vagtyp === 'belagd' ? 20 : 0,
      stroke: getStroke(colorArray[mode][vagtyp], width, vagtyp === 'ovrigvag' ? [10, 12] : undefined)
    })];

    if (mode == 0 && res < 80) {
      if (vagtyp === "bidrag") styles.push(new Style({ zIndex: 10, stroke: getStroke("black", width, [6, 12], "butt") }));
      if (vagtyp === "grus" && feature.get("Klass_181") <= 7) styles.push(new Style({ zIndex: 10, stroke: getStroke("red", width, [6, 12], "butt") }));
    }

    if (res < 9) {
      styles.push(new Style({
        zIndex: 10,
        text: new Text({
          text: feature.get("Namn_132") || feature.get("Namn_130"), font: "12px arial, sans-serif", placement: "line",
          fill: getFill("#000000"), stroke: getStroke("#ffffff", 4)
        })
      }));
    }

    const huvnr = feature.get("Huvnr_556_1");
    if (huvnr < 500 && !feature.get("Namn_130")) {
      const isEuropa = feature.get("Evag_555") == -1;
      styles.push(new Style({
        zIndex: isEuropa ? 10 : 9,
        text: new Text({
          text: (isEuropa ? "E" : "") + String(huvnr), font: "bold 16px arial, sans-serif", padding: [75, 75, 75, 75],
          fill: getFill("white"), stroke: getStroke(isEuropa ? "#4daf4a" : "#377eb8", 10)
        })
      }));
    }
    return styles;
  },

  "traktor": (feature, res, mode) => mode == 0 ? new Style({ stroke: getStroke(colorArray[mode][feature.get("objekttyp")], 3, [10, 10], "square") }) : null,
  "markkantlinje": (f, r, mode) => mode == 0 ? new Style({ zIndex: 2, stroke: getStroke("#00a6ff", 1) }) : null,
  "kurvighet": (f, r, mode) => mode == 0 ? new Style({ zIndex: 2, stroke: getStroke("#df006840", 12) }) : null,
  "hojdlinje": (feature, r, mode) => mode == 0 ? new Style({ stroke: getStroke("rgba(150, 127, 105, 0.6)", feature.get("stodkurva") == "Ja" ? 2 : 1) }) : null,
  "ledningslinje": () => new Style({ stroke: getStroke("#000000a2", 2) }),

  "vaglinje": (feature, res, mode) => {
    let vagNummer = "";
    let isEuropa = false;
    const rawNum = feature.get("vardvagnummer");
    if (rawNum && (rawNum[0] == "E" || rawNum < 500)) {
      vagNummer = String(rawNum).split(".")[0];
      isEuropa = rawNum[0] == "E";
    }
    return new Style({
      zIndex: isEuropa ? 10 : 3,
      stroke: getStroke(colorArray[mode][feature.get("objekttyp")], roadWidth[feature.get("objekttyp")] || 3),
      text: new Text({
        text: vagNummer, font: "bold 14px arial, sans-serif", padding: [50, 50, 50, 50],
        fill: getFill("white"), stroke: getStroke(isEuropa ? "#4daf4a" : "#377eb8", 10)
      })
    });
  },

  "ralstrafik": () => [
    new Style({ stroke: getStroke("black", 3) }),
    new Style({ stroke: getStroke("white", 2, [10, 10], "square") })
  ],

  "hydrolinje": (feature, res, mode) => new Style({
    stroke: getStroke(colorArray[mode][feature.get("objekttyp")], Number(feature.get("storleksklass")) || 3, undefined, "round")
  }),

  "skyddadnatur": (feature, res, mode) => mode == 0 ? new Style({
    zIndex: 5, stroke: getStroke(colorArray[mode][feature.get("objekttyp")], 4, dashPolygon.includes(feature.get("objekttyp")) ? [10, 10] : undefined)
  }) : null,

  "militart_omrade": (feature, res, mode) => new Style({
    zIndex: 5, stroke: getStroke(colorArray[mode][feature.get("objekttyp")], 4, dashPolygon.includes(feature.get("objekttyp")) ? [10, 10] : undefined)
  }),

  "byggnad": () => new Style({ zIndex: 5, fill: getFill("#7d7d7d") }),
  "landningsbana": (feature, res, mode) => new Style({ zIndex: 15, fill: getFill(colorArray[mode][feature.get("objekttyp")]) }),
  // "mark": (feature) => new Style({ fill: getFill(`var(--map-land-${feature.get("objekttyp")})`) }),
  "mark": (feature, res, mode) => new Style({ fill: getFill(colorArray[mode][feature.get("objekttyp")]) }),

  "textpunkt": (feature, res, mode) => {
    const kategori = feature.get("textkategori");
    const kategoriColor = { "Hydrografi": "#0070ff", "Fjällupplysningstext": "#c44982", "Skyddad natur": "#419821" }[kategori];
    return new Style({
      zIndex: (feature.get("textstorleksklass") * 10) || 100,
      text: new Text({
        text: feature.get("textstrang"), textAlign: textAlign[feature.get("textlage")], textBaseline: textBaseline[feature.get("textlage")],
        rotation: degToRad(360 - feature.get("textriktning")), rotateWithView: !!feature.get("textriktning"), font: getTextFont(feature),
        fill: getFill(kategoriColor || "#000000"), stroke: getStroke("#ffffff", (feature.get("textstorleksklass") * 0.3) + 3)
      })
    });
  },

  "Rastplats": () => new Style({ zIndex: 18, image: getIcon("https://jole84.se/kartsymboler/h13-1.svg", 0.05) }),

  "anlaggningsomradespunkt": (feature) => {
    const src = kartsymboler[feature.get("andamal")];
    return src ? new Style({ image: getIcon(src, 1, degToRad(360 - feature.get("rotation")), !!feature.get("rotation")) }) : null;
  },

  "Trafikplats": (feature) => new Style({
    zIndex: 20,
    text: new Text({ offsetX: 12, offsetY: 1, text: feature.get("trafikplatsnummer"), font: "bold 16px arial, sans-serif", fill: getFill("black") }),
    image: getIcon("https://jole84.se/kartsymboler/f27-1.svg", 0.18)
  }),

  "atk": (feature) => {
    const bearing = degToRad(feature.get("Bearing")) - Math.PI;
    return [
      new Style({ zIndex: 20, image: getIcon("https://jole84.se/kartsymboler/e24-1.svg", 0.06, bearing, true, [15, 0]) }),
      new Style({
        zIndex: 20, image: getIcon("https://jole84.se/kartsymboler/c31-3.svg", 0.07, bearing, true, [15, 28]),
        text: new Text({ offsetX: 15, offsetY: -26, text: feature.get("HTHAST"), rotateWithView: true, rotation: bearing, font: "bold 19px arial, sans-serif", fill: getFill("black") })
      })
    ];
  }
};

// --- Main Export ---
export function styleStuff(feature, currentResolution) {
  const layerName = feature.get("layer");
  const mode = localStorage.mapMode || 0;

  const handler = handlers[layerName];
  if (handler) return handler(feature, currentResolution, mode);


  // Fallback for Point Icons
  const objKey = feature.get("objekttypnr") || feature.get("andamal");
  const iconSrc = kartsymboler[objKey];
  if (iconSrc) {
    const rotation = degToRad(360 - feature.get("rotation")) || 0;
    return new Style({
      image: getIcon(iconSrc, 1.5, rotation, !!feature.get("rotation"))
    });
  }
}