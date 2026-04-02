#!/bin/bash

ogr2ogr \
    "Trafikplats_vag.gpkg" \
    -t_srs "EPSG:3857" \
    -nln "Trafikplats_3857" \
    -update \
    "Trafikplats_vag.gpkg"

ogr2ogr \
    "Rastplats.gpkg" \
    -t_srs "EPSG:3857" \
    -nln "Rastplats_3857" \
    -update \
    "Rastplats.gpkg"