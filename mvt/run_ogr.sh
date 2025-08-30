#!/bin/bash

rm tiles/ -r

# clipsrc = "-clipsrc 1550000 7900000 1600000 7950000" # jönköping      31s 8,4mb
# clipsrc = "-clipsrc 1450000 7800000 1700000 8100000" # jönköping++    150s 180mb      166s 155mb
# clipsrc = "-clipsrc 1200000 7400000 2200000 8350000" # götaland      
# sverige   48min   2,7gb   43min 2,3gb
# -dsco SIMPLIFICATION=50 \

ogr2ogr tiles/ -f MVT \
    -clipsrc 1450000 7800000 1700000 8100000 \
    -t_srs "EPSG:3857" \
    -dsco MINZOOM=0 \
    -dsco MAXZOOM=14 \
    -dsco SIMPLIFICATION=5 \
    -dsco SIMPLIFICATION_MAX_ZOOM=2 \
    -dsco COMPRESS=NO \
    -dsco conf=$HOME/git/jole84-maptile/mvt/layerconf.json \
    $HOME/git/jole84-maptile/mvt/layers.vrt


# TNE_FT_VAGDATA_SIMPLIFIED

# minzoom 12 syns på >13 (+1)
# maxzoom 8 släcks på >10 (+2)

# rsync -aPhz --info=progress2 --progress --include '*.pbf' tiles root@192.46.232.175:/var/www/html/ --delete