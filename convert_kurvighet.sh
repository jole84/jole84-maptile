#!/bin/bash

rm extracted_slitlager_60.gpkg dissolved.gpkg kurvighet.gpkg

ogr2ogr extracted_slitlager_60.gpkg -nlt MULTILINESTRING -nln extracted -sql "SELECT *
  FROM TNE_FT_VAGDATA
  WHERE Slitl_152 = 1
  AND F_Hogst_225 >= 60" vagnat.gpkg

flatpak run --command=qgis_process org.qgis.qgis run native:dissolve --distance_units=meters --area_units=m2 --ellipsoid=EPSG:7030 --INPUT='/home/johan/Karta/NVDB/extracted_slitlager_60.gpkg|layername=extracted' --SEPARATE_DISJOINT=true --OUTPUT='ogr:dbname='\''/home/johan/Karta/NVDB/dissolved.gpkg'\'' table="dissolved" (geom)'

ogr2ogr kurvighet.gpkg -nlt MULTILINESTRING -nln kurvighet -sql "
SELECT geom, 
GLength(geom), 
GLength(geom) - GLength(Simplify(geom, 100)) as kurvighet
FROM 'dissolved'
WHERE GLength(geom) > 1000
AND kurvighet > 50
ORDER BY kurvighet DESC" dissolved.gpkg


# -spat 1564963 7908504 1619680 7955391
# -spat_srs "EPSG:4236" -spat 14 57.5 15 58 \
# -spat 445413 6403587 465311 6428948