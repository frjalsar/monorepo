# Kóði

Allt kóðasafn er inn á [https://github.com/frjalsar/monorepo.git](https://github.com/frjalsar/monorepo.git), svæðið er opið og hver sem er getur náð í kóðasafnið.  Til að ýta út breytingum þarf skrifréttindi en hægt er að óska eftir þeim á skraning@fri.is

Í rót kóðasafnsins eru pakkar sem passa upp á að samræma útlit kóðans (e. linting and formatting). Hvert verkefni er síðan geymt í sér möppu.

## api-service

Vefþjónustulag skrifað í nodeJs sem talar við Postgres og Redis. Í dag tala stjórnkerfið og umsóknarkerfið við þetta lag en það er opið og hverjum sem er heimilt að tengjast því. Sjá nánar [API flokkinn](../api/fyrstu-skref.md)

## admin

Stjórnkerfi FRÍ skrifað í VueJS sem talar við API þjónustulagið.

## umsokn

Vefviðmót til að sækja um mót eða götuhlaup. Skrifað í VueJS og talar við API þjónustulagið.
