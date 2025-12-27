#!/usr/bin/python3
import requests, json
import geopandas as gpd
from shapely import wkt

# Checks what speed the road closest to speedcamera have
# 1. Downloads all cameras
# 2. Apply getSpeedLimit function
# 3.    Get elementId from cameras roadNumber
# 4.    If failed, get elementId from road name
# 5.    Get speedlimit with elementId
# 6.    If no elementId, get speedlimit by camera coordinate
# 7. Save to geopackage

url = "https://api.trafikinfo.trafikverket.se/v2/data.json"
headers = {'Content-Type': 'application/xml'}
authenticationkey = "fa68891ca1284d38a637fe8d100861f0"
timeout = 2

def searchByRoadNumber(long, lat, vagnummer):
    xmlpayload = f"""
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
    response = requests.post(url, data=xmlpayload.encode('utf-8'), headers=headers, timeout=timeout)
    data = json.loads(response.content)
    return data['RESPONSE']['RESULT'][0]["Vägnummer"][0]["Element_Id"]

def searchByGatunamn(long, lat, gatunamn):
    xmlpayload = f"""
        <REQUEST>
            <LOGIN authenticationkey="{authenticationkey}"/>
            <QUERY objecttype="Gatunamn" namespace="vägdata.nvdb_dk_o" schemaversion="1.2" limit="10">
                <FILTER>
                <NEAR name='Geometry.WKT-WGS84-3D' value="{long} {lat}" maxdistance="20m" />
                <EQ name="Namn" value="{gatunamn}" />
                </FILTER>
            </QUERY>
        </REQUEST>
    """
    response = requests.post(url, data=xmlpayload.encode('utf-8'), headers=headers, timeout=timeout)
    data = json.loads(response.content)
    return data['RESPONSE']['RESULT'][0]["Gatunamn"][0]["Element_Id"]

def searchSpeedlimitByCoordinate(long, lat):
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
    response = requests.post(url, data=xmlpayload.encode('utf-8'), headers=headers, timeout=timeout)
    data = json.loads(response.content)
    return data['RESPONSE']['RESULT'][0]['Hastighetsgräns'][0]["Högsta_tillåtna_hastighet"]

def searchSpeedlimitByElementId(long, lat, elementId):
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
    response = requests.post(url, data=xmlpayload.encode('utf-8'), headers=headers, timeout=timeout)
    data = json.loads(response.content)
    return data['RESPONSE']['RESULT'][0]['Hastighetsgräns'][0]["Högsta_tillåtna_hastighet"]

def getSpeedLimit(row):
    global current_number
    lat = row["geometry"].y # 64
    long = row["geometry"].x # 15
    name = row["Name"]
    roadNumber = row["RoadNumber"]
    errorString = ""

    try:
        try:
            roadNumber = int(row["RoadNumber"].replace("E", ""))
            elementId = searchByRoadNumber(long, lat, roadNumber)
            errorString = "vägnummer OK"
        except:
            errorString = "söker på vägnamn"
            elementId = searchByGatunamn(long, lat, roadNumber)
        speedLimit = searchSpeedlimitByElementId(long, lat, elementId)
    except:
        errorString = "elementId saknas"
        speedLimit = searchSpeedlimitByCoordinate(long, lat)
    
    print("{:<15}{:<35}{:<25}{:<15}{:<15}".format(
        str(current_number) + "/" + total_cameras_number,
        row["Name"],
        "väg: " + str(roadNumber),
        str(speedLimit) + "km/h",
        errorString
    ))
    current_number += 1
    return speedLimit


# <EQ name="RoadNumber" value="Häradsvägen" />
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

response = requests.post(url, data=xmlpayloadatk.encode('utf-8'), headers=headers, timeout=timeout + 5)
# print(response.text)
data = json.loads(response.content)

for camera in data['RESPONSE']['RESULT'][0]["TrafficSafetyCamera"]:
    camera['geometry'] = wkt.loads(camera['Geometry']['WGS84'])

gdf = gpd.GeoDataFrame(data['RESPONSE']['RESULT'][0]["TrafficSafetyCamera"])
gdf = gdf.drop(columns=['Geometry'])
# gdf.rename(columns={'Bearing':'vinkel'}, inplace=True)

total_cameras_number = str(len(gdf))
current_number = 1

gdf = gdf.set_crs(4326)
gdf["HTHAST"] = gdf.apply(getSpeedLimit, axis=1)

# print(gdf)
gdf = gdf.to_crs(3857)
gdf.to_file('ATK.gpkg', driver='GPKG')