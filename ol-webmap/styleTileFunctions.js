
import { Stroke, Style, Icon, Fill, Text } from "ol/style.js";

function degToRad(deg) {
  return (deg * Math.PI * 2) / 360;
}

function radToDeg(rad) {
  return rad * (180 / Math.PI);
}

const textColor = {
  "Hydrografi": "#0070ff",
  "Fjällupplysningstext": "#c44982",
  "Skyddad natur": "#419821",
}

const roadWidth = {
  "Småväg": 1,
  "Landsväg liten": 1,
  "Landsväg": 2,
  "Motortrafikled": 3,
  "Mötesfri väg": 3,
  "Motorväg": 4,
}

const textAlign = {
  1: "left",
  3: "right",
  4: "left",
  5: "center",
  6: "right",
  7: "left",
  9: "right",
}

const kartsymboler = {
  // 1052:	"Skyddsvärn",
  // 1050:	"https://jole84.se/kartsymboler/" + "Raststuga" + ".svg",
  // 2016:	"https://jole84.se/kartsymboler/" + "Klockstapel" + ".svg",
  // 2032:	"https://jole84.se/kartsymboler/" + "Enslig stuga i fjällen" + ".svg",
  // 2048:	"https://jole84.se/kartsymboler/" + "Forskningsstation" + ".svg",
  // 2041:	"https://jole84.se/kartsymboler/" + "Turiststuga/övernattningsstuga" + ".svg",
  // 2050:	"https://jole84.se/kartsymboler/" + "Naturum" + ".svg",
  // 2512:	"Fornlämning, mindre",
  // 2516:	"Övrig kulturhistorisk lämning, mindre",
  // "Sjöräddningsstation": "https://jole84.se/kartsymboler/ ",

  "Badplats": "https://jole84.se/kartsymboler/badplats.svg",
  "Bollplan": "https://jole84.se/kartsymboler/idrott_fotbollsplan.svg",
  "Campingplats": "https://jole84.se/kartsymboler/camping.svg",
  "Fotbollsplan": "https://jole84.se/kartsymboler/idrott_fotbollsplan.svg",
  "Galoppbana": "https://jole84.se/kartsymboler/idrott_anlaggning.svg",
  "Gästhamn": "https://jole84.se/kartsymboler/gasthamn.svg",
  "Hamn": "https://jole84.se/kartsymboler/gasthamn.svg",
  "Idrottsanläggning": "https://jole84.se/kartsymboler/idrott_anlaggning.svg",
  "Skjutbana, mindre": "https://jole84.se/kartsymboler/idrott_skjutbana_liten.svg",
  "Skjutbana": "https://jole84.se/kartsymboler/idrott_skjutbana.svg",
  "Småbåtshamn": "https://jole84.se/kartsymboler/gasthamn.svg",
  "Travbana": "https://jole84.se/kartsymboler/idrott_anlaggning.svg",
  1042: "https://jole84.se/kartsymboler/kyrka.svg",
  1044: "https://jole84.se/kartsymboler/kata.svg",
  1045: "https://jole84.se/kartsymboler/torn.svg",
  1046: "https://jole84.se/kartsymboler/vindskydd1.svg",
  1047: "https://jole84.se/kartsymboler/vaderkvarn.svg",
  1051: "https://jole84.se/kartsymboler/fyr.svg",
  1742: "https://jole84.se/kartsymboler/transformator.svg",
  1922: "https://jole84.se/kartsymboler/slussport.svg",
  1923: "https://jole84.se/kartsymboler/dammbyggnad.svg",
  2016: "https://jole84.se/kartsymboler/cistern.svg", // Klockstapel
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
  2512: "https://jole84.se/kartsymboler/cistern.svg", // Fornlämning, mindre
  2513: "https://jole84.se/kartsymboler/milstolpe.svg",
  2514: "https://jole84.se/kartsymboler/ruin.svg",
  2515: "https://jole84.se/kartsymboler/minnessten.svg",
  2516: "https://jole84.se/kartsymboler/kulturminne.svg", // Övrig kulturhistorisk lämning, mindre
  2517: "https://jole84.se/kartsymboler/gruvhal.svg",
  2518: "https://jole84.se/kartsymboler/kulturminne.svg",
  2852: "https://jole84.se/kartsymboler/helikopterlandning.svg",
}

const textBaseline = {
  1: "bottom",
  2: "bottom",
  3: "bottom",
  4: "middle",
  5: "middle",
  6: "middle",
  7: "top",
  8: "top",
  9: "top",
}

const colorArray = {
  "Anlagt vatten": "#bfe6ffff",
  "Barr- och blandskog": "#d4eeb7ff",
  "Bebyggelse": "#eebf8fff",
  "Djurskyddsområde": "#77e250a6",
  "Ej karterat område": "#bfe6ffff",
  "Elljusspår": "#fff201ff",
  "Fjällbjörkskog": "#d9f5d1ff",
  "Fruktodling": "#fff7a6ff",
  "Glaciär": "#ffffffff",
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
  "rondell": '#007dff',
  "Sjö": "#bfe6ffff",
  "Skog": "#d4eeb7ff",
  "Sluten bebyggelse": "#d99461ff",
  "Start- och landningsbana, linje": "#7d7d7d",
  "Start- och landningsbana": "#7d7d7d",
  "Traktorväg": "#ac7c45ff",
  "Vattendrag": "#bfe6ffff",
  "Vattendragsyta": "#bfe6ffff",
  "Vattenyta": "#bfe6ffff",
  "Åker": "#fff7a6ff",
  "Öppen mark": "#ffffeaff",
}

const colorArrayVagkarta = {
  "Anlagt vatten": "#bfe6ffff",
  "Barr- och blandskog": "#ededed",
  "Bebyggelse": "#d4d4d4",
  "Ej karterat område": "#bfe6ffff",
  "Elljusspår": "#fff201ff",
  "Fjällbjörkskog": "#ededed",
  "Fruktodling": "#ededed",
  "Glaciär": "#ffffff",
  "Gångstig": "#6e6e6eff",
  "Hav": "#bfe6ffff",
  "Hög bebyggelse": "#cecece",
  "Industri- och handelsbebyggelse": "#dddddd",
  "Kalfjäll": "#fcfcfc",
  "Kulturreservat": "black",
  "Låg bebyggelse": "#d4d4d4",
  "Lövskog": "#ededed",
  "Militärt skjutfält": "#00a6e6ff",
  "Militärt övningsfält": "#00a6e6ff",
  "rondell": '#007dff',
  "Sjö": "#bfe6ffff",
  "Skog": "#ededed",
  "Sluten bebyggelse": "#b9b9b9",
  "Start- och landningsbana, linje": "#7d7d7d",
  "Start- och landningsbana": "#7d7d7d",
  "Traktorväg": "#bababa",
  "Vattendrag": "#bfe6ffff",
  "Vattendragsyta": "#bfe6ffff",
  "Vattenyta": "#bfe6ffff",
  "Åker": "#fcfcfc",
  "Öppen mark": "#fcfcfc",
}

const dashPolygon = [
  'Militärt övningsfält',
  "Kulturreservat",
]

export function styleStuff(feature, currentResolution) {
  const featureType = feature.getGeometry().getType();
  const vagkarta = JSON.parse(sessionStorage.vagkarta || "false");
  if (featureType == "LineString" || featureType == "MultiLineString") {
    if (feature.get("layer") == "TNE_FT_VAGDATA") {
      if (feature.get("bidrag") && !vagkarta) {
        return [
          new Style({
            zIndex: 10 - feature.get("Klass_181"),
            stroke: new Stroke({
              color: feature.get("color"),
              width: feature.get("width") / 10,
            }),
          }),
          new Style({
            zIndex: 10 - feature.get("Klass_181"),
            stroke: new Stroke({
              color: "black",
              width: (feature.get("width") / 8),
              lineDash: [5, 20],
              lineDashOffset: 10,
              lineCap: "square",
            }),
          }),
        ];
      }
      return new Style({
        zIndex: 10 - feature.get("Klass_181"),
        stroke: new Stroke({
          color: vagkarta ? feature.get("colorstratvag") : feature.get("color"),
          width: feature.get("width") / 10,
          lineCap: "round",
        }),
        text: new Text({
          text: feature.get("Namn_130"),
          font: "12px arial, sans-serif",
          placement: "line",
          fill: new Fill({
            color: "black",
          }),
          stroke: new Stroke({
            color: "white",
            width: 4,
          }),
        }),
      });
    } else if (feature.get("layer") == "markkantlinje" && !vagkarta) {
      return new Style({
        zIndex: 2,
        stroke: new Stroke({
          color: "#00a6ff",
          width: 1,
        }),
      });
    } else if (feature.get("layer") == "kurvighet" && !vagkarta) {
      return new Style({
        zIndex: 2,
        stroke: new Stroke({
          color: "#df006840",
          width: 8,
        }),
      });
    } else if (feature.get("layer") == "hojdlinje" && !vagkarta) {
      return new Style({
        stroke: new Stroke({
          color: "#00000049",
          width: 1,
        }),
      });
    } else if (feature.get("layer") == "ledningslinje") {
      return new Style({
        stroke: new Stroke({
          color: "#000000a2",
          width: 2,
        }),
      });
    } else if (feature.get("layer") == "traktor" && !vagkarta) {
      return new Style({
        stroke: new Stroke({
          color: "#ac7c45",
          width: 3,
          lineDash: [10, 10],
          lineDashOffset: 10,
          lineCap: "square",
        }),
      });
    } else if (feature.get("layer") == "vaglinje") {
      let vagNummer = "";
      let europaVag = false;
      if (feature.get("vardvagnummer")) {
        if (Array.from(feature.get("vardvagnummer"))[0] == "E" || feature.get("vardvagnummer") < 500) {
          vagNummer = feature.get("vardvagnummer");
          europaVag = Array.from(feature.get("vardvagnummer"))[0] == "E"
        }
      }
      return new Style({
        stroke: new Stroke({
          color: "black",
          width: roadWidth[feature.get("objekttyp")] || 3,
        }),
        text: new Text({
          declutterMode: "declutter",
          text: String(vagNummer),
          font: "14px arial, sans-serif",
          padding: [20, 20, 20, 20],
          placement: "point",
          fill: new Fill({
            color: "white",
          }),
          stroke: new Stroke({
            color: europaVag ? "#4daf4a" : "#377eb8",
            width: 10,
          }),
          // backgroundFill: new Fill({
          //   color: europaVag ? "#4daf4a" : "#377eb8",
          // }),
        }),
      });
    } else if (feature.get("layer") == "ralstrafik") {
      return [
        new Style({
          stroke: new Stroke({
            color: "black",
            width: 3,
          }),
        }),
        new Style({
          stroke: new Stroke({
            color: "white",
            width: 2,
            lineDash: [10, 10],
            lineDashOffset: 10,
            lineCap: "square",
          }),
        }),
      ];
    } else if (feature.get("layer") == "hydrolinje") {
      return new Style({
        stroke: new Stroke({
          color: colorArray[feature.get("objekttyp")],
          width: feature.get("storleksklass") * 2 || 3,
          lineCap: "butt",
        }),
      });
      // } else {
      //   console.table(feature.getProperties());
    }

  }

  if (featureType == "Polygon" || featureType == "MultiPolygon") {
    if (
      (feature.get("layer") == "skyddadnatur" && !vagkarta) ||
      feature.get("layer") == "militart_omrade"
    ) {
      // no fill only border
      return new Style({
        zIndex: 5,
        stroke: new Stroke({
          color: colorArray[feature.get("objekttyp")],
          lineDash: dashPolygon.includes(feature.get("objekttyp")) ? [10, 10] : undefined,
          width: 3,
        }),
      });
    } else if (feature.get("layer") == "byggnad") {
      return new Style({
        zIndex: 5,
        fill: new Fill({
          color: "#7d7d7d",
        }),

      });
    } else if (feature.get("layer") == "landningsbana") {
      return new Style({
        zIndex: 15,
        fill: new Fill({
          color: colorArray[feature.get("objekttyp")],
        }),

      });
    } else if (feature.get("layer") == "mark") {
      return new Style({
        fill: new Fill({
          color: vagkarta ? colorArrayVagkarta[feature.get("objekttyp")] : colorArray[feature.get("objekttyp")],
        }),
      });
      // } else {
      //   console.table(feature.getProperties());
    }
  }

  if (featureType == "Point") {
    if (feature.get("layer") == "textpunkt") {
      return new Style({
        text: new Text({
          declutterMode: "none",
          zIndex: (feature.get("textstorleksklass") * 10) || 100,
          text: feature.get("textstrang"),
          textAlign: textAlign[feature.get("textlage")],
          textBaseline: textBaseline[feature.get("textlage")],
          rotation: degToRad(360 - feature.get("textriktning")),
          rotateWithView: !!feature.get("textriktning"),
          font: (feature.get("textstorleksklass") * 4) + 5 + "px arial, sans-serif",
          fill: new Fill({
            color: textColor[feature.get("textkategori")] || "black",
          }),
          stroke: new Stroke({
            color: "white",
            width: 4,
          }),
        }),
      });
    } else if (feature.get("layer") == "Rastplats") {
      return new Style({
        zIndex: 18,
        image: new Icon({
          declutterMode: "none",
          // anchor: [0.5, 1],
          src: "https://www.transportstyrelsen.se/globalassets/global/vag/vagmarken2/h.-lokaliseringsmarken-for-upplysning-om-serviceanlaggningar/h13.-rastplats/h13-1.png",
          scale: 0.07,
        }),
      })
    } else if (feature.get("layer") == "anlaggningsomradespunkt") {
      try {
        return new Style({
          image: new Icon({
            rotation: degToRad(360 - feature.get("rotation")),
            rotateWithView: !!feature.get("rotation"),
            src: kartsymboler[feature.get("andamal")] || "https://jole84.se/kartsymboler/infotavla.svg",
          }),
        });
      } catch {
        console.log("error " + feature.get("objekttyp"));
        console.log(feature.getProperties());
      }
    } else if (feature.get("layer") == "Trafikplats") {
      return new Style({
        zIndex: 20,
        text: new Text({
          offsetX: 12,
          offsetY: 2,
          declutterMode: "none",
          text: feature.get("trafikplatsnummer"),
          font: "bold 16px arial, sans-serif",
          fill: new Fill({
            color: "black",
          }),
        }),
        image: new Icon({
          declutterMode: "none",
          src: "https://jole84.se/kartsymboler/f27-1.svg",
          scale: 0.18,
        }),
      })
    } else if (feature.get("layer") == "NVDB_DK_O_24_Hojdhinder45dm" && vagkarta) {
      return new Style({
        zIndex: 30,
        text: new Text({
          declutterMode: "none",
          text: feature.get("Fri_hojd").toFixed(1) + "m",
          rotateWithView: true,
          rotation: feature.get("rotation") - Math.PI,
          font: "bold 10px arial, sans-serif",
          fill: new Fill({
            color: "black",
          }),
        }),
        image: new Icon({
          declutterMode: "none",
          rotateWithView: true,
          rotation: feature.get("rotation") - Math.PI,
          src: "https://jole84.se/kartsymboler/c17-1.svg",
          scale: 0.07,
        }),
      });
    } else if (feature.get("layer") == "VIS_DK_O_90_P_ficka") {
      return new Style({
        zIndex: 18,
        image: new Icon({
          declutterMode: "none",
          src: "https://jole84.se/kartsymboler/e19-1.svg",
          scale: feature.get("Placering") == 'Avskild från vägen' ? 0.1 : 0.07,
        }),
      })
    } else if (feature.get("layer") == "atk") {
      return [
        new Style({
          zIndex: 20,
          image: new Icon({
            declutterMode: "none",
            // anchor: [0.5, 1],
            src: "https://jole84.se/kartsymboler/e24-1.svg",
            scale: 0.06,
            rotateWithView: true,
            rotation: degToRad(feature.get("vinkel")) - Math.PI,
            displacement: [17, 0],
          }),
        }),
        new Style({
          zIndex: 20,
          image: new Icon({
            declutterMode: "none",
            rotateWithView: true,
            rotation: degToRad(feature.get("vinkel")) - Math.PI,
            src: "https://jole84.se/kartsymboler/c31-3.svg",
            displacement: [17, 28],
            scale: 0.07,
          }),
          text: new Text({
            declutterMode: "none",
            offsetX: 17,
            offsetY: -26,
            text: feature.get("HTHAST"),
            rotateWithView: true,
            rotation: degToRad(feature.get("vinkel")) - Math.PI,
            font: "bold 19px arial, sans-serif",
            fill: new Fill({
              color: "black",
            }),
          }),
        }),
      ]
    } else if (feature.get("layer") == "byggnadspunkt" || feature.get("layer") == "kultur_lamning_punkt") {
      return new Style({
        // zIndex: 5,
        image: new Icon({
          rotation: degToRad(360 - feature.get("rotation")) || 0,
          rotateWithView: true,
          src: kartsymboler[feature.get("objekttypnr")] || "https://jole84.se/kartsymboler/infotavla.svg",
          scale: 1.5,
        }),
      });
      // } else {
      //   console.table(feature.getProperties());
    }
  }
}
