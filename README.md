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
Kóðinn  er skrifaður í NodeJS og dependency injection til að byggja upp módúlana. app.js setur upp boilerplate kóða í kringum expressjs sem síðan er nýttur í index.js þar sem gagnagrunnstengingar eins og redis og postgres eru settar upp ásamt logger. Mappa composition býr til dependency-tréð fyrir hvert entity sem síðan er notað í index.js

#### /server/index.js
Þetta er entry-pointið þar sem Postgres og Redis tengingarnar eru búnar til, routes eru sett upp og þjónustuna keyrð upp.

#### /server/app.js
Boilerplate kóði til að setja upp Express vefþjóninn, t.d. cors, helmet, etc.

#### /routes/clubs.js - etc
Endapunkturinn fyrir íþróttafélög. Það notar gagnagrunnsföll úr repo möppunni t.d. selectClubs og keyrir út niðurstöðurnar.

#### /repo/clubs - etc
Gagnagrunnskóði fyrir íþróttafélög. Hvert fall hefur sína skrá. Sem dæmi má nefna select.js sem sækir upplýsingar um íþróttafélag. Það er er einfalt fall sem heitir makeSelectClubs sem tekur inn gagnagrunnstenginguna sem dependency og skilar falli sem sækir gögnin.

### Aðgangur og leyfi
Kerfið er opið til að skoða í vafra en hefur tvennskonar læsingar.

## Ytri kerfi
Kerfið leyfir bara fyrirfram ákveðnum þjónustum/kerfum að tala við sig. Í kóðanum er til whitelist fyrir production og developpment umhverfi.  Til að fá development umhverfið til að virka er nóg að bæta við local.fri.is í host skrána þar sem api-service leyfir það fyrir development umhverfi.

## Innskráning
Til að breyta upplýsingum þarf að skrá sig inn. Hægt er að skrá sig inn á /user/login með því að senda username og password. Við það gerast eftirfarandi hlutir:

1. Kerfið flettir upp notendanum í postgres gagnagrunninum.
2. Notendanafn og lykilorð eru borin saman.
3. Gögn um notendann eru vistuð í Redis grunni útfrá lykli.
4. Kerfið sendir kökuna FRI_API sem er httpOnly, secure og með 10 ára líftíma til baka. 
5. Kerfið sendir almennar notendaupplýsingar til baka sem JSON.

Athugið að þetta auðkennir bara notandann fyrir api-service. Þú þarft að halda utan um session á þinni síðu. API þjónustan er "stateless" og heldur ekki utan um sessions heldur tekur bara á móti token í formi köku eða Bearer til að auðkenna fyrirspurn. Kerfið sendir notendaupplýsingarnar líka sem JSON þegar viðkomandi skráir sig inn og því auðvelt að halda utan um slíkt í clientinum með köku eða storage (td. session eða local). Þær upplýsingar eru ekki viðkvæmar (nafn, félag) og innihalda engar upplýsingar sem api-service notar til að auðkenna notendann. Þær upplýsingar eru í FRI_API kökunni sem er httpOnly og secure. Þessi token ætti aldrei að vera geymdur á clientinum þar sem hægt er að stela honum.

Það er hægt að senda fyrirspurn á http://api.fri.is/user með kökunni til að sjá hvaða notandi er bakvið tokenið. Ef þú ert að smíða nýtt kerfi er ráðlagt að 

### Coding rules
Kóðasafnið notar eslint-standard til að viðhalda sama kóðastíl af öllum sem snerta á verkefninu. Með því verður allur kóðu samræmdur og við lendum ekki í óþarfa breytingasögum sem snúast um formatting. 

Gott er að reynda halda sömu uppsetningu á öllu. Til dæmis:
1. Sér mappa fyrir nýtt entity. T.d. /repo/meets
2. Sér skrá fyrir hvert fall. T.d. /repo/meets/insert
3. Föll sem taka inn dependency fá forskeytið make. T.d. makeInsertMeet(db)

#### Pre-commit krókar (e. hooks)
Kóðasafnið hefur pre-commit krók sem keyrir linter til að vera viss um að ekkert sé brotið áður en kóðinn er sendur inn á github.

### Continuous Deployment
Þegar ný útgáfa kemur inn á master branchið þá fer breytingin strax live. Allar stærri breytingar ættu að fara fyrst inn á sér branch sem er síðan mergað inn á masterinn.

### Test
Þeim er ábótavant.
