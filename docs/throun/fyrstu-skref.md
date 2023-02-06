---
description: >-
  Þetta svæði er hugsað fyrir aðila sem vilja aðstoða við að þróa eða betrumbæta
  stafrænar lausnir FRÍ.
---

# Inngangur

Stærsta markmið skráninganefndar er að búa til stjórnendaviðmót sem gerir skrifstofu FRÍ kleift að vera sjálfbært þegar það kemur að rekstri og umsýslu, t.d. nafnabreytingar á iðkendum, félagaskipti, umsókna móta, umsýslu móta, lagfæringar, staðfesta úrslit og að koma úrslitum inn í afrekaskrá.

Í dag sér mótaforritið Þór um alla skráningu og vinnslu fyrir frjálsíþróttamót en þar er haldið utan um keppendur, mótið rekið og úrslit sett inn í afrekaskrá. Viðmóti og aðgerðum fyrir skrifstofu og mótshaldara er þó ábótavant.

Að auki er félagatal, mótautanumhald og afrekaskrá þétt vírað vegna þess að Þór sér um allt. Þetta gerir erfitt fyrir t.d. þegar skráning fer fram annarstaðar eða úrslit koma úr ytri forritum.

Markmið skráningnefndar er að brjóta ferlið upp í þrjár einingar:

1. Almenn skráning íþróttafélaga og iðkenda.
2. Mótaumsýsla, t.d. umsóknir móta, skráning keppenda og úrslit móta.
3. Úrslit inn í afrekaskrá

Hugmyndin er að skrifstofa FRÍ sjá um skráningu iðkanda, félagabreytingar - en mótautanumhald sé í höndum hvers og eins. Þannig væri hægt að nota hvaða forrit sem er svo lengi sem það getur skilað keppendalista og úrslitum á fyrirfram ákveðnu sniði.

## Kóðasafn

Allt kóðasafn er inn á [https://github.com/frjalsar/monorepo.git](https://github.com/frjalsar/monorepo.git), svæðið er opið og hver sem er getur náð í kóðasafnið.  Til að ýta út breytingum þarf skrifréttindi en hægt er að óska eftir þeim á skraning@fri.is

Í rót kóðasafnsins eru pakkar sem passa upp á að samræma útlit kóðans (e. linting and formatting). Hvert verkefni er síðan geymt í sér möppu.

Allur bakendakóði er skrifaður í nodeJS sem talar við Postgres og Redis. Framendi (viðmót) eru skrifuð í VueJS
