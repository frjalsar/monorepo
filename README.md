# Félagatal FRÍ

## Markmið
Félagatal FRÍ er hluti af markmiði skráningarnefndar FRÍ til að brjóta niður mótaforrit og afrekaskrá niður í smærri einingar. Hugmyndin er að þarna sé vefþjónusta sem inniheldur alla keppendur FRÍ og skráningu/sögu þeirra í félögum. Með þessu móti gæti mótaforrit, hvort sem er utanaðkomandi eða heimasmíðað, flett upp keppendum. Auk þess væri hægt að bjóða upp á viðbmót fyrir skrifstofur FRÍ til að samþykkja félagaskipti.

### Vandamál
Stærsta vandamálið er uppsetning gamla grunnsins:
 - Afrek eru oftast skráð á það félag sem keppendur kepptu fyrir á viðkomandi móti. 
 - Erfitt er að finna út hvenær keppandi var skráður í ákveðið félag og hvenær hann hætti. 

Margar skráningar eru hreinlega vitlausar. Til dæmis getur keppandi aldrei veirð skráður beint í héraðssamband eins og HSÞ heldur verðu hann að vera skráður á íþróttafélag. Dæmi eru um í grunninum að keppendur séu skráðir beint á íþróttahéruð ÍSÍ.

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
Kóðasafnið hefur pre-commit krók sem keyrir linter og test til að vera viss um að ekkert sé brotið áður en kóðinn er sendur inn á github
