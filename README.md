# jole84-maptile
 
#### Beställning Trafikverket homogeniserade:
	Antal körfält2/Körfältsantal Korfa_524
	Cirkulationsplats(Bakriktningen)
	Cirkulationsplats(Framriktningen)
	Driftbidrag statligt/Vägdelsnr
	Funktionell vägklass/Klass
	Gatunamn/Namn
	Gatutyp/Typ?
	Hastighetsgräns/Högsta tillåtna hastighet (Bakriktningen)
	Hastighetsgräns/Högsta tillåtna hastighet (Framriktningen)
	Höjdhinder upp till 4,5 m/Fri höjd
	Slitlager/Slitlagertyp
	Strategiskt vägnät för tyngre transporter/Vägnät för tyngre transporter
	Tättbebyggt område
	Vägbredd/Bredd
	Vägnummer/Europaväg
	Vägnummer/Huvudnummer
	Vägtrafiknät/Nättyp
	Vägtyp/körfältsbeskrivning


Korfa_524 				(Antal körfält2/Körfältsantal)		1-9
F_Cirkulationsplats 	(Cirkulationsplats (F))
B_Cirkulationsplats 	(Cirkulationsplats (B))
Vagde_10379 			(Driftbidrag statligt/Vägdelsnr)
Klass_181 				(FunkVägklass/Klass)				0-9
Namn_130 				(Gatunamn/Namn)
Typ_512 				(Gatutyp/Typ) 						10-100
F_Hogst_225 			(Hastighetsgräns/Högsta tillåtna hastighet (F))
B_Hogst_225 			(Hastighetsgräns/Högsta tillåtna hastighet (B))
Fri_h_143 				(Höjdhinder45dm/Fri höjd)
Slitl_152 				(Slitlager/Slitlagertyp)
Vagna_406 				(Strateg VN tyngretranspo/Vägnät för tyngre transporter)
TattbebyggtOmrade 		(Tättbebyggt område)
Bredd_156 				(Vägbredd/Bredd)
Evag_555 				(Vägnummer/Europaväg)
Huvnr_556_1 			(Vägnummer/Huvudnummer (1))
Vagtr_474 				(Vägtrafiknät/Nättyp)				1-1
korfa_52 				(Vägtyp/körfältsbeskrivning)		1-4 ("2+1" = 3)

bidrag			Vagde_10379, Slitl_152
Klass_181
color			F_Cirkulationsplats, B_Cirkulationsplats, Vagna_406, Slitl_152
width			Slitl_152, Bredd_156, F_Hogst_225
2+1	offset		"Korfa_524" = 2 AND  "korfa_52"  = 3

qgis_process run native:dissolve --distance_units=meters --area_units=m2 --ellipsoid=EPSG:7030 --INPUT='/home/johan/Karta/NVDB/vagnat.gpkg|layername=TNE_FT_VAGDATA' --FIELD=F_Cirkulationsplats --FIELD=B_Cirkulationsplats --FIELD=Vagde_10379 --FIELD=Klass_181 --FIELD=Namn_130 --FIELD=F_Hogst_225 --FIELD=Slitl_152 --FIELD=Vagna_406 --FIELD=TattbebyggtOmrade --FIELD=Bredd_156 --FIELD=Evag_555 --FIELD=Huvnr_556_1 --SEPARATE_DISJOINT=true --OUTPUT=/home/johan/Karta/NVDB/test_dissolve.gpkg