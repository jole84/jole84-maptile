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

	Vägslag/Typ
	Vägtyp/typ
	Vägkategori/Kategori
	

|-----------------------|-------------------------------------------------------------------|------|  
| Korfa_524 			|	(Antal körfält2/Körfältsantal)									| 1-9|  
| F_Cirkulationsplats 	|	(Cirkulationsplats (F))| |  
| B_Cirkulationsplats 	|	(Cirkulationsplats (B))| |  
| Vagde_10379 			|	(Driftbidrag statligt/Vägdelsnr)| |  
| Klass_181 			|	(FunkVägklass/Klass)											| 0-9|  
| Namn_130 				|	(Gatunamn/Namn)| |  
| Typ_512 				|	(Gatutyp/Typ) 													| 10-100|  
| F_Hogst_225 			|	(Hastighetsgräns/Högsta tillåtna hastighet (F))| |  
| B_Hogst_225 			|	(Hastighetsgräns/Högsta tillåtna hastighet (B))| |  
| Fri_h_143 			|	(Höjdhinder45dm/Fri höjd)| |  
| Slitl_152 			|	(Slitlager/Slitlagertyp)| |  
| Vagna_406 			|	(Strateg VN tyngretranspo/Vägnät för tyngre transporter)| |  
| TattbebyggtOmrade 	|	(Tättbebyggt område)| |  
| Bredd_156 			|	(Vägbredd/Bredd)| |  
| Evag_555 				|	(Vägnummer/Europaväg)| |  
| Huvnr_556_1 			|	(Vägnummer/Huvudnummer (1))| |  
| Vagtr_474 			|	(Vägtrafiknät/Nättyp)											| 1-1|  
| korfa_52 				|	(Vägtyp/körfältsbeskrivning)									| 1-4 ("2+1" = 3)|  
| bidrag				|	Vagde_10379, Slitl_152| |  
| Typ_369				|	Vägslag/typ	|	10 - 160	|
| vagty_41				|	Vägtyp/typ	|	1 - 6 motorväg/vanlig väg	|
| Kateg_380				|	Vägkategori/Kategori			|	1 - 4 europaväg, övrig länsväg |
| color					|	F_Cirkulationsplats, B_Cirkulationsplats, Vagna_406, Slitl_152| |  
| width					|	Slitl_152, Bredd_156, F_Hogst_225| |  
| 2+1	offset			|	"Korfa_524" = 2 AND  "korfa_52"  = 3| |
|-----------------------|-------------------------------------------------------------------|------|  

#### Source files
	Karta/NVDB/ATK.gpkg
	Karta/NVDB/kurvighet.gpkg
	Karta/NVDB/Rastplats.gpkg
	Karta/NVDB/Stratvag.gpkg
	Karta/NVDB/Trafikplats_vag.gpkg
	Karta/NVDB/vagnat_union.gpkg
	Karta/NVDB/vagnat.gpkg

	Karta/topografi1M/kommunikation.gpkg
	Karta/topografi1M/mark.gpkg
	Karta/topografi1M/text.gpkg

	Karta/topografi250/anlaggningsomrade.gpkg
	Karta/topografi250/hojd.gpkg
	Karta/topografi250/hydrografi.gpkg
	Karta/topografi250/kommunikation.gpkg
	Karta/topografi250/ledningar.gpkg
	Karta/topografi250/mark.gpkg
	Karta/topografi250/militartomrade.gpkg
	Karta/topografi250/naturvard.gpkg
	Karta/topografi250/text.gpkg
	
	Karta/topografi100/anlaggningsomrade.gpkg
	Karta/topografi100/byggnadsverk.gpkg
	Karta/topografi100/hojd.gpkg
	Karta/topografi100/hydrografi.gpkg
	Karta/topografi100/kommunikation.gpkg
	Karta/topografi100/ledningar.gpkg
	Karta/topografi100/mark.gpkg
	Karta/topografi100/militartomrade.gpkg
	Karta/topografi100/naturvard.gpkg
	Karta/topografi100/text.gpkg
	
	Karta/topografi50/anlaggningsomrade.gpkg
	Karta/topografi50/byggnadsverk.gpkg
	Karta/topografi50/hydrografi.gpkg
	Karta/topografi50/kommunikation.gpkg
	Karta/topografi50/kulturhistorisklamning.gpkg
	Karta/topografi50/text.gpkg