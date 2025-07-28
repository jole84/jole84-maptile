#!/bin/sh

INPUT="$HOME/Karta/NVDB/vagnat.gpkg"
OUTPUT="$HOME/Karta/NVDB/vagnat_SIMPLE_TEST.gpkg"

echo "Skapar vägnät..."
ogr2ogr $OUTPUT \
    -nln "TNE_FT_VAGDATA" \
    -clipsrc 1450000 7800000 1700000 8100000 \
    -skipfailures \
    -t_srs "EPSG:3857" \
    -sql @simple.sql \
    $INPUT


# vagnat.gpd
    # -clipsrc 435000 6400000 500000 6450000 \

# -spat_srs "EPSG:4236" -spat 14 57.5 15 58 \
# TattbebyggtOmrade = 0

# Typ_512 IN (10, 20)

# Typ_512 (10 övergripande länk - 100 småväg)