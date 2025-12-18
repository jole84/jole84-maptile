with open("ol-webmap/styleTileFunctions.js", "rt") as infile:
    styleTileFunctions = infile.read()
    splitString = "export function styleStuff(feature, currentResolution) {"
    styleTileFunctions = splitString + styleTileFunctions.split(splitString)[1]

with open("test.js", "w") as outfile:
    outfile.write(
         styleTileFunctions
            .replace("new Style(", "new ol.style.Style(")
            .replace("new Icon(", "new ol.style.Icon(")
            .replace("new Text(", "new ol.style.Text(")
            .replace("new Fill(", "new ol.style.Fill(")
            .replace("new Stroke(", "new ol.style.Stroke(")
    )