# API þjónusta FRÍ

## Markmið
Eitt af stóru markmiðum skráningarnefndar FRÍ er að brjóta niður mótaforrit og afrekaskrá niður í smærri einingar. Hugmyndin er að útbúa vefþjónustu sem hefði mismunandi endapunkta fyrir félagatal, mótaforrit og afrekaskrá, sem önnur kerfi gætu nýtt sér. Þannig væri hægt að búa til sér viðmót fyrir félagatal og vinna með það án þess að hafa áhrif á önnur kerfi. Auk þess sem hægt er að bjóða upp á tengingar við ytri kerfi.

## Uppsetning
Kerfið er byggt upp sem einfalt REST API og er skrifað í nodeJS með Postgres gagnagrunn sem bakenda.  Til að fá kerfið keyrandi locally þarf að fara í gegnum eftirfarandi skref.

1. Settu upp nodeJS og npm á tölvunni
2. Afritaðu (e. clone) þetta kóðasafn (e. repository)
3. Sláðu inn npm install í terminal/console
4. Sláðu inn npm run start terminal/console

### Kóði
#### db.js
Tengingin við gagnagrunninn. Vertu viss um að hafa allar umhverfisbreytur uppsettar og að azure-postgres þjónastan sé með opið fyrir ip-töluna þína.
#### index.js
Þetta er expressJS server sem hleður inn mismunandi endapunkta (e. routes) fyrir keppendur, félög og svo framvegis. Hver hluti af kerfinu hefur sína möppu. Kerfið er flokkað eftir einingum (athletes, clubs, etc) en ekki tegund (routes, library, etc)
#### /athletes - /clubs - etc
Hver hluti af kerfinu hefur sína möppu sem inniheldur allt sem við kemur þeim hluta. 
  - Föll sem sækja, uppfæra og setja inn gögn. Hvert fall ætti að hafa sína skrá og hver skrá ætti að hafa test t.d. *find.js* og *find.spec.js*
  - Controller/route sem skilgreinir slóðir/endapunkta og kallar á viðeigandi föll.

### Lint
Kóðasafnið notar eslint-standard til að viðhalda sama kóðastíl af öllum sem snerta á verkefninu. Með því verður allur kóðu samræmdur og við lendum ekki í óþarfa breytingasögum sem snúast um formatting. 

### Pre-commit krókar (e. hooks)
Kóðasafnið hefur pre-commit krók sem keyrir linter og test til að vera viss um að ekkert sé brotið áður en kóðinn er sendur inn á github.

### Github
Þegar ný útgáfa kemur inn á master branch þá fer breytingin strax live. Allar stærri breytingar ættu að fara fyrst inn á sér branch sem er síðan mergað inn á masterinn.
