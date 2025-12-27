import geopandas as gpd

fileName1 = "ATK.gpkg"
fileName2 = "ATK_old.gpkg"

def changeName(row):
    return row["Name"] + " " + row["_merge"]

gdf1 = gpd.read_file(fileName1, layer='ATK')
gdf2 = gpd.read_file(fileName2, layer='ATK')

merged = gdf1.merge(gdf2, how="outer", indicator=True) 

print("     Bara i " + fileName1 + ":", len(gdf1))
print(merged[merged["_merge"] == "left_only"].sort_values("Name").to_string())

print()
print("     Bara i " + fileName2 + ":", len(gdf2))
print(merged[merged["_merge"] == "right_only"].sort_values("Name").to_string())

merged = merged[merged["_merge"] != "both"]
merged["Name"] = merged.apply(changeName, axis=1)
merged.to_file("ATK_diff.gpkg", driver='GPKG')