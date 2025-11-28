#!/usr/bin/python3
import os, shutil

os.chdir('/home/johan/git/jole84-maptile/ol-webmap')
# os.chdir('/home/johan/Karta')

try:
    shutil.rmtree('tiles')
except OSError as e:
    print(e.strerror + ":", e.filename)

clipsrc = ""
clipsrc = "-clipsrc 1550000 7900000 1650000 8000000" # jönköping      31s 8,4mb
# clipsrc = "-clipsrc 1450000 7800000 1700000 8100000" # jönköping++    150s 180mb      166s 155mb
# clipsrc = "-clipsrc 1200000 7400000 2200000 8350000" # götaland      
# sverige   48min   2,7gb   43min 2,3gb

cmd = " ".join([
    'time',
    'echo',
    'ogr2ogr tiles/ -f MVT',
    clipsrc,
    '-t_srs "EPSG:3857"',
    '-skipfailures',
    '-dsco MINZOOM=5',
    '-dsco MAXZOOM=14',
    '-dsco SIMPLIFICATION=5',
    '-dsco SIMPLIFICATION_MAX_ZOOM=2',
    '-dsco COMPRESS=NO',
    '-dsco conf=layerconf.json',
    '$HOME/git/jole84-maptile/mvt/layers.vrt',
    ])

os.system(cmd)

# minzoom 12 syns på >13 (+1)
# maxzoom 8 släcks på >10 (+2)

# rsync -aPhz --info=progress2 --progress tiles root@192.46.232.175:/var/www/html/ --delete

runRsync = input("kör rsync? [y] ").lower()

if (runRsync == "y"):
    os.system("rsync -aPhz --info=progress2 --progress tiles root@192.46.232.175:/var/www/html/ --delete")