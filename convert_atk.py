#!/usr/bin/python3
import requests, json
import geopandas as gpd
from shapely import wkt

url = "https://api.trafikinfo.trafikverket.se/v2/data.json"
headers = {'Content-Type': 'application/xml'}
authenticationkey = "fa68891ca1284d38a637fe8d100861f0"

def getSpeedLimit(row):
    global current_number
    lat = row["geometry"].y # 64
    long = row["geometry"].x # 15

    try:
        vagnummer = int(row["RoadNumber"].replace("E", ""))

        xmlpayloadvagnummer = f"""
        <REQUEST>
            <LOGIN authenticationkey="{authenticationkey}"/>
            <QUERY objecttype='Vägnummer' namespace='vägdata.nvdb_dk_o' schemaversion='1.2' limit='1'>
                <FILTER>
                    <NEAR name='Geometry.WKT-WGS84-3D' value="{long} {lat}" maxdistance="20m" />
                    <EQ name="Huvudnummer" value="{vagnummer}" />
                </FILTER>
                <INCLUDE>Element_Id</INCLUDE>
            </QUERY>
        </REQUEST>
        """
        response = requests.post(url, data=xmlpayloadvagnummer.encode('utf-8'), headers=headers)
        data = json.loads(response.content)
        elementId = data['RESPONSE']['RESULT'][0]["Vägnummer"][0]["Element_Id"]
        
        xmlpayload = f"""
        <REQUEST>
            <LOGIN authenticationkey="{authenticationkey}"/>
            <QUERY objecttype='Hastighetsgräns' namespace='vägdata.nvdb_dk_o' schemaversion='1.3' limit='1'>
                <FILTER>
                    <NEAR name='Geometry.WKT-WGS84-3D' value="{long} {lat}" maxdistance="20m" />
                    <EQ name="Element_Id" value="{elementId}" />
                </FILTER>
                <INCLUDE>Högsta_tillåtna_hastighet</INCLUDE>
            </QUERY>
        </REQUEST>
        """
    except:
        print("    Error: " + row["Name"] + " " + row["RoadNumber"])
        xmlpayload = f"""
        <REQUEST>
            <LOGIN authenticationkey="{authenticationkey}"/>
            <QUERY objecttype='Hastighetsgräns' namespace='vägdata.nvdb_dk_o' schemaversion='1.3' limit='1'>
                <FILTER>
                    <NEAR name='Geometry.WKT-WGS84-3D' value="{long} {lat}" maxdistance="20m" />
                </FILTER>
                <INCLUDE>Högsta_tillåtna_hastighet</INCLUDE>
            </QUERY>
        </REQUEST>
        """
    response = requests.post(url, data=xmlpayload.encode('utf-8'), headers=headers)
    data = json.loads(response.content)
    print(str(current_number) + "/" + total_cameras_number + " " + row["Name"] + " " + str(data['RESPONSE']['RESULT'][0]['Hastighetsgräns'][0]["Högsta_tillåtna_hastighet"]) + "km/h")
    current_number += 1
    return data['RESPONSE']['RESULT'][0]['Hastighetsgräns'][0]["Högsta_tillåtna_hastighet"]

xmlpayloadatk = f"""
<REQUEST>
    <LOGIN authenticationkey="{authenticationkey}"/>
    <QUERY objecttype="TrafficSafetyCamera" namespace="road.infrastructure" schemaversion="1" >
        <FILTER></FILTER>
        <INCLUDE>Bearing</INCLUDE>
        <INCLUDE>Name</INCLUDE>
        <INCLUDE>Geometry.WGS84</INCLUDE>
        <INCLUDE>RoadNumber</INCLUDE>
    </QUERY>
</REQUEST>
"""

response = requests.post(url, data=xmlpayloadatk.encode('utf-8'), headers=headers)
data = json.loads(response.content)

for camera in data['RESPONSE']['RESULT'][0]["TrafficSafetyCamera"]:
    camera['geometry'] = wkt.loads(camera['Geometry']['WGS84'])

gdf = gpd.GeoDataFrame(data['RESPONSE']['RESULT'][0]["TrafficSafetyCamera"])
gdf = gdf.drop(columns=['Geometry'])
gdf.rename(columns={'Bearing':'vinkel'}, inplace=True) # to be fixed

total_cameras_number = str(len(gdf))
current_number = 1

gdf = gdf.set_crs(4326)
gdf["HTHAST"] = gdf.apply(getSpeedLimit, axis=1)

# print(gdf)
gdf = gdf.to_crs(3857)
gdf.to_file('ATK.gpkg', driver='GPKG')