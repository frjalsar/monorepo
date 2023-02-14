# Api-Service

Kerfið er byggt upp sem einfalt REST API og er skrifað í nodeJS með Postgres gagnagrunn sem bakenda. Vefurinn er hýstur á Render. Til að fá kerfið keyrandi locally þarf að fara í gegnum eftirfarandi skref.

1. Settu upp nodeJS og npm á tölvunni.
2. Afritaðu (e. clone) monorepo kóðasafnið (e. repository)
3. Fáðu umhverfisbreyturnar frá Render eða skráninganefnd og settu í .env skjal undir api-service möppunni.&#x20;
4. Sláðu inn npm install í terminal
5. Sláðu inn npm run start terminal
6. Opnaðu vafrann á [http://localhost:3000](http://local.fri.is:3000/)

{% hint style="danger" %}
**ATH:** Umhverfisbreyturnar innihalda aðganga að gagnagrunnum, lykilorð og tengingar sem má ekki deila eða vista í clear-text.&#x20;
{% endhint %}

## Uppsetning

Kóðinn er skrifaður í NodeJS og notar dependency injection til að byggja upp módúlana. _app.js_ setur upp boilerplate kóða í kringum expressjs sem síðan er nýttur í _index.js_ þar sem gagnagrunnstengingar eins og redis og postgres eru settar upp ásamt logger. Mappan _composition_ býr til dependency-tréð fyrir hvert entity sem síðan er notað í _index.js_

**/server/app.js**\
****Boilerplate kóði til að setja upp Express vefþjóninn, t.d. cors, helmet, etc.

**/server/index.js**\
****Þetta er entry-pointið þar sem Postgres og Redis tengingarnar eru búnar til, routes eru sett upp og þjónustuna keyrð upp.

**/routes/clubs.js - etc**\
****Endapunkturinn fyrir íþróttafélög. Það notar gagnagrunnsföll úr repo möppunni t.d. selectClubs og keyrir út niðurstöðurnar.

**/repo/clubs**\
****Gagnagrunnskóði fyrir íþróttafélög. Hvert fall hefur sína skrá. Sem dæmi má nefna select.js sem sækir upplýsingar um íþróttafélag. Það er er einfalt fall sem heitir makeSelectClubs sem tekur inn gagnagrunnstenginguna sem dependency og skilar falli sem sækir gögnin.
