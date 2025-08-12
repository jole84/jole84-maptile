#!/bin/sh

INPUT="$HOME/Karta/NVDB/vagnat.gdb"
OUTPUT="$HOME/Karta/NVDB/vagnat.gpkg"
OUTPUT_UNION="$HOME/Karta/NVDB/vagnat_union.gpkg"

echo "Skapar vägnät..."
ogr2ogr $OUTPUT \
    -nln "TNE_FT_VAGDATA" \
    -progress \
    -skipfailures \
    -t_srs "EPSG:3857" \
    -where "Vagtr_474 = 1" \
    $INPUT

echo "Skapar vägnät union..."
ogr2ogr $OUTPUT_UNION \
    -nln "TNE_FT_VAGDATA" \
    -nlt MULTILINESTRING \
    -progress \
    -skipfailures \
    -sql @/home/johan/git/jole84-maptile/vagnat_union.sql \
    $OUTPUT

echo "Skapar höjdhinderlager"
ogr2ogr $OUTPUT \
    -t_srs "epsg:3857" \
    -dialect sqlite \
    -append \
    -sql "select Line_Interpolate_Point(SHAPE,0.5), Azimuth(StartPoint(SHAPE), EndPoint(SHAPE)) as rotation, Fri_h_143 as Fri_hojd from TNE_FT_VAGDATA where Fri_h_143 is not null and Vagtr_474 = 1 AND Shape_Length > 0.4" \
    -nln NVDB_DK_O_24_Hojdhinder45dm \
    -nlt MULTIPOINT \
    -update \
    $INPUT

# -spat_srs "EPSG:4236" -spat 14 57.5 15 58 \