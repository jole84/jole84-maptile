#!/usr/bin/python3
import requests, json
import geopandas as gpd

# needs ATK_matplats.gpkg file

url = "https://api.trafikinfo.trafikverket.se/v2/data.json"
headers = {'Content-Type': 'application/xml'}

def getSpeed(geom):
    global current_number
    xmlpayload = f"""
    <REQUEST>
        <LOGIN authenticationkey="fa68891ca1284d38a637fe8d100861f0"/>
        <QUERY objecttype='Hastighetsgräns' namespace='vägdata.nvdb_dk_o' schemaversion='1.3' limit='1'>
            <FILTER>
                <NEAR name='Geometry.WKT-WGS84-3D' value="{geom.x} {geom.y}" maxdistance="20m" />
            </FILTER>
            <INCLUDE>Högsta_tillåtna_hastighet</INCLUDE>
        </QUERY>
    </REQUEST>
    """
    response = requests.post(url, data=xmlpayload.encode('utf-8'), headers=headers)
    data = json.loads(response.content)
    print(str(current_number) + "/" + total_cameras_number)
    current_number += 1
    return data['RESPONSE']['RESULT'][0]['Hastighetsgräns'][0]["Högsta_tillåtna_hastighet"]

gdf = gpd.read_file("ATK_matplats.gpkg")
total_cameras_number = str(len(gdf))
current_number = 1

gdf["HTHAST"] = gdf["geometry"].apply(lambda x: getSpeed(x))

gdf = gdf.set_crs(4326)
print(gdf)
gdf = gdf.to_crs(3857)
gdf.to_file('ATK.gpkg', driver='GPKG')
