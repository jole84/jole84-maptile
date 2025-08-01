SELECT 
    ST_Union(Shape) AS Shape,
    Korfa_524,
    F_Cirkulationsplats,
    B_Cirkulationsplats,
    Vagde_10379,
    Klass_181,
    Namn_130,
    Typ_512,
    F_Hogst_225,
    B_Hogst_225,
    Fri_h_143,
    Slitl_152,
    Vagna_406,
    TattbebyggtOmrade,
    Bredd_156,
    -- Kateg_380,
    Vagtr_474,
    korfa_52,
    Evag_555,
    Huvnr_556_1

FROM TNE_FT_VAGDATA

GROUP BY
    Korfa_524,
    F_Cirkulationsplats,
    B_Cirkulationsplats,
    Vagde_10379,
    Klass_181,
    Namn_130,
    Typ_512,
    F_Hogst_225,
    B_Hogst_225,
    Fri_h_143,
    Slitl_152,
    Vagna_406,
    TattbebyggtOmrade,
    Bredd_156,
    -- Kateg_380,
    Vagtr_474,
    korfa_52,
    Evag_555,
    Huvnr_556_1,
    ROUTE_ID