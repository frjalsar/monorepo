# API þjónusta FRÍ

## Markmið
Eitt af stóru markmiðum skráningarnefndar FRÍ er að brjóta niður félagatal, mótaforrit og afrekaskrá niður í smærri einingar. Hugmyndin er að útbúa vefþjónustu sem þjónustar þessi kerfi, sem aðrir geta nýtt sér. Þannig væri hægt að búa til sér viðmót fyrir félagatal og vinna með það án þess að hafa áhrif á önnur kerfi. Auk þess sem hægt er að bjóða upp á tengingar við ytri kerfi.

## Uppsetning
Kerfið er byggt upp sem einfalt REST API og er skrifað í nodeJS með Postgres gagnagrunn sem bakenda.  Vefurinn er hýstur á Heroku. Til að fá kerfið keyrandi locally þarf að fara í gegnum eftirfarandi skref.

1. Settu upp nodeJS og npm á tölvunni
2. Afritaðu (e. clone) þetta kóðasafn (e. repository)
3. Fáðu umhverfisbreyturnar sendar frá einhverjum úr hópnum.
4. Sláðu inn npm install í terminal
4. Sláðu inn npm run start terminal
5. Settu 127.0.0.1  local.fri.is í hosts skrána hjá þér
6. Opnaðu vafrann á http://local.fri.is:3000

### Kóði
Kóðinn  er skrifaður í NodeJS og notar blöndu af require og dependency injection. Á neðsta lagi (index.js) er redis og postgres tengingar settar upp og injectað inn í service.js sem hendir þeim áfram inn í express routera. Þar er notað require til að taka inn repo/lib módúla sem taka inn gagnagrunnstengingarnar. Db poolinu er því injectað en ekki repo-um.

#### /server/index.js
Þetta er entry-pointið þar sem Postgres og Redis tengingarnar eru búnar til og þar sem þjónustan er sótt og keyrð upp með þeim tengingum.

#### /server/service.js
Express vefþjóninn sjálfur. Hann tekur inn Postgres og Redis tengingar, stillir upp vefþjóninum, sækir Routes og sendir tengingarnar áfram. Þjónustan skilgreinir mismunandi endapunkta fyrir keppendur, félög, íþróttahéruð og svo framvegis. Hver hluti af kerfinu hefur sína möppu.

#### /routes/clubs.js - etc
Endapunkturinn fyrir íþróttafélög. Það sækir repo/módúla frá lib möppunni t.d. selectClubs, sendir inn á þá gagnagrunnstengingunni og keyrir út niðurstöðurnar. 

#### /lib/clubs - etc
Gagnagrunnskóði fyrir írþóttafélög. Hvert fall hefur sína skrá. Sem dæmi má nefna select.js sem sækir upplýsingar um íþróttafélag. Það er er einfalt fall sem heitir makeSelectClubs sem tekur inn gagnagrunnstenginguna sem dependency og skilar falli sem sækir gögnin.

### Aðgangur og leyfi
Kerfið er lokað bakvið innskráningu. Hægt er að skrá sig inn á /login með því að senda username og password. Við það gerast eftirfarandi hlutir:

1. Kerfið flettir upp notendanum í gagnagrunni.
2. Ef notandinn er til býr kerfið til API lykill.
3. Lykillinn er vistaður í Redis grunni ásamt notendaupplýsingum.
4. Notendaupplýsingar eru sendar til baka.
5. Það er ábyrgð kerfisins sem skráði sig inn að halda utan um API lykilinn. 
6. Hægt er að senda API lykilinn sem Bearer eða köku.

### Coding rules
Kóðasafnið notar eslint-standard til að viðhalda sama kóðastíl af öllum sem snerta á verkefninu. Með því verður allur kóðu samræmdur og við lendum ekki í óþarfa breytingasögum sem snúast um formatting. 

Gott er að reynda halda sömu uppsetningu á öllu. Til dæmis:
1. Sér mappa fyrir nýtt entity. T.d. /lib/meets
2. Sér skrá fyrir hvert fall. T.d. /lib/meets/insert
3. Föll sem taka inn dependency fá forskeytið make. T.d. makeInsertMeet(db)

#### Pre-commit krókar (e. hooks)
Kóðasafnið hefur pre-commit krók sem keyrir linter til að vera viss um að ekkert sé brotið áður en kóðinn er sendur inn á github.

### Continuous Deployment
Þegar ný útgáfa kemur inn á master branchið þá fer breytingin strax live. Allar stærri breytingar ættu að fara fyrst inn á sér branch sem er síðan mergað inn á masterinn.

### Test
Það eru til nokkur test undir /test möppunni. Þeim er ábótavant.
