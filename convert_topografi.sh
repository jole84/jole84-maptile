#!/bin/bash

if [ -n "$1" ]; then
    cd $1
fi

unzip "*.zip"

for FILE in *_sverige.gpkg
do
    LAYERNAME=$(basename -s _sverige.gpkg $FILE)
    OUTPUT=$LAYERNAME".gpkg"
    echo "Konverterar " $FILE
    ogr2ogr $OUTPUT \
        -t_srs "EPSG:3857" \
        -progress \
        -overwrite \
        $FILE
    rm $LAYERNAME"_sverige.zip"
done

rm *_sverige.gpkg
