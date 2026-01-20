#!/usr/bin/python3
from os import system, chdir
from shutil import rmtree

# minzoom 12 syns på >13 (+1)
# maxzoom 8 släcks på >10 (+2)

chdir('/home/johan/git/jole84-maptile/ol-webmap')
# chdir('/home/johan/Karta')

# clipsrc = ""
clipsrc = "-clipsrc 1550000 7900000 1650000 8000000" # jönköping  128s 19,9mb (simp0 125s 22,3mb)
# clipsrc = "-clipsrc 1450000 7800000 1700000 8100000" # jönköping++    150s 180mb   
# clipsrc = "-clipsrc 1200000 7400000 2200000 8350000" # götaland      
# sverige   48min   2,7gb   43min 2,3gb

try:
    rmtree('tiles')
except OSError as e:
    print(e.strerror + ":", e.filename)

cmd = " ".join([
    'time',
    'ogr2ogr tiles/ -f MVT',
    clipsrc,
    '-t_srs "EPSG:3857"',
    '-skipfailures',
    '-dsco MINZOOM=5',
    '-dsco MAXZOOM=14',
    '-dsco SIMPLIFICATION=5',
    # '-dsco SIMPLIFICATION_MAX_ZOOM=2',
    '-dsco COMPRESS=NO',
    '-dsco conf=/home/johan/git/jole84-maptile/mvt/layerconf.json',
    '/home/johan/git/jole84-maptile/mvt/layers.vrt',
    ])

system(cmd)

if clipsrc == "":
    runRsync = input("kör rsync? [y] ").lower()
    if (runRsync == "y"):
        system("rsync -aPhz --info=progress2 --progress tiles root@192.46.232.175:/var/www/html/ --delete")



# minzoom 12 syns på >13 (+1)
# maxzoom 8 släcks på >10 (+2)

# rsync -aPhz --info=progress2 --progress tiles root@192.46.232.175:/var/www/html/ --delete