SELECT 
    ST_Simplify(ST_Union(Shape), 2) AS Shape,
    -- B_Hogst_225,
    -- Fri_h_143,
    -- korfa_52,
    -- Korfa_524,
    -- Vagtr_474,
    CASE
        WHEN F_Cirkulationsplats != 0 THEN 'rondell'
        WHEN B_Cirkulationsplats != 0 THEN 'rondell'
        WHEN Slitl_152 = 2 AND Vagde_10379 IS NOT NULL THEN 'bidrag'
        WHEN Slitl_152 = 2 AND Vagha_6 = 1 THEN 'bidrag'
        WHEN Slitl_152 = 1 AND Vagna_406 IS NOT NULL THEN 'stratvag'
        WHEN Slitl_152 = 1 AND F_ForbudTrafik = -1 THEN 'forbud'
        WHEN Slitl_152 = 1 AND B_ForbudTrafik = -1 THEN 'forbud'
        WHEN Slitl_152 = 1 THEN 'belagd'
        WHEN Slitl_152 = 2 THEN 'grus'
        ELSE 'ovrigvag'
    END vagtyp,
    CASE
        WHEN F_Cirkulationsplats != 0 THEN 40
        WHEN B_Cirkulationsplats != 0 THEN 40
        WHEN Slitl_152 = 2 AND Bredd_156 <= 6 THEN Bredd_156 * 9
        WHEN Slitl_152 = 1 THEN F_Hogst_225 / 2
        ELSE 20
    END width,
    -- B_Cirkulationsplats,
    -- Bredd_156,
    Evag_555,
    -- F_Cirkulationsplats,
    F_Hogst_225 AS maxspeed,
    Huvnr_556_1,
    -- Kateg_380,
    Klass_181,
    Namn_130,
    Namn_132,
    -- Slitl_152,
    TattbebyggtOmrade,
    Typ_369,
    -- Typ_512,
    Vagde_10379,
    -- Vagha_6,
    Vagna_406,
    vagty_41

FROM TNE_FT_VAGDATA

GROUP BY
    -- B_Hogst_225,
    -- Fri_h_143,
    -- korfa_52,
    -- Korfa_524,
    -- Vagtr_474,
    -- B_Cirkulationsplats,
    -- Bredd_156,
    Evag_555,
    -- F_Cirkulationsplats,
    -- F_Hogst_225,
    Huvnr_556_1,
    -- Kateg_380,
    Klass_181,
    Namn_130,
    Namn_132,
    ROUTE_ID,
    -- Slitl_152,
    -- TattbebyggtOmrade,
    -- Typ_369,
    -- Typ_512,
    -- Vagde_10379,
    -- Vagha_6,
    -- Vagna_406,
    -- vagty_41
    vagtyp,
    width