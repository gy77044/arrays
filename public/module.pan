PVObject_=pvModule
  Version=6.85
  Flags=$00100043

  PVObject_Commercial=pvCommercial
    Comment=http//en.longi-solar.com   (China)
    Flags=$0041
    Manufacturer=Longi Solar
    Model=LR5-72HPH-545M
    DataSource=TÜV SÜD Certification and Testing (China) Co., Ltd. Shanghai Branch
    YearBeg=2020
    Width=1.133
    Height=2.256
    Depth=0.035
    Weight=27.200
    NPieces=100
    PriceDate=09/09/19 08:01
    Remarks, Count=5
      Str_1=Frame: Aluminum
      Str_2=Structure: Tempered AR glass
      Str_3=Connections: Glass-Foil, Jbox IP68, MC4 or mateable
      Str_4=PERC Half-cut
      Str_5
    End of Remarks
  End of PVObject pvCommercial

  Technol=mtSiMono
  NCelS=72
  NCelP=2
  NDiode=3
  SubModuleLayout=slTwinHalfCells
  FrontSurface=fsARCoating
  GRef=1000
  TRef=25.0
  PNom=545.0
  PNomTolLow=0.00
  PNomTolUp=0.90
  Isc=13.920
  Voc=49.65
  Imp=13.040
  Vmp=41.80
  muISC=7.72
  muVocSpec=-142.7
  muPmpReq=-0.331
  RShunt=267
  Rp_0=5523
  Rp_Exp=2.80
  RSerie=0.196
  Gamma=0.972
  muGamma=-0.0004
  VMaxIEC=1500
  VMaxUL=1500
  Absorb=0.90
  ARev=3.200
  BRev=3.200
  RDiode=0.010
  VRevDiode=-0.70
  AirMassRef=1.500
  CellArea=165.1
  SandiaAMCorr=50.000
  RelEffic800=0.36
  RelEffic600=0.43
  RelEffic400=0.46
  RelEffic200=-0.71

  PVObject_IAM=pvIAM
    Flags=$00
    IAMMode=UserProfile
    IAMProfile=TCubicProfile
      NPtsMax=9
      NPtsEff=9
      LastCompile=$B18D
      Mode=3
      Point_1=0.0,1.00000
      Point_2=30.0,1.00000
      Point_3=50.0,0.99800
      Point_4=60.0,0.99800
      Point_5=70.0,0.98600
      Point_6=75.0,0.96200
      Point_7=80.0,0.91100
      Point_8=85.0,0.81400
      Point_9=90.0,0.00000
    End of TCubicProfile
  End of PVObject pvIAM

  OperPoints, list of=13 tOperPoint
    Point_1=False,800,25.0,0.36,0.00,0.000,0.000,0.00
    Point_2=False,600,25.0,0.43,0.00,0.000,0.000,0.00
    Point_3=False,400,25.0,0.46,0.00,0.000,0.000,0.00
    Point_4=False,200,25.0,-0.71,0.00,0.000,0.000,0.00
    Point_5=False,100,25.0,-4.81,0.00,0.000,0.000,0.00
    Point_6=False,1100,25.0,-0.32,0.00,0.000,0.000,0.00
    Point_7=False,1000,15.0,3.20,0.00,0.000,0.000,0.00
    Point_8=False,800,15.0,3.88,0.00,0.000,0.000,0.00
    Point_9=False,600,15.0,3.99,0.00,0.000,0.000,0.00
    Point_10=False,400,15.0,3.85,0.00,0.000,0.000,0.00
    Point_11=False,200,15.0,2.47,0.00,0.000,0.000,0.00
    Point_12=False,100,15.0,-1.84,0.00,0.000,0.000,0.00
    Point_13=False,1000,25.0,0.00,0.00,0.000,0.000,0.00
  End of List OperPoints
End of PVObject pvModule
