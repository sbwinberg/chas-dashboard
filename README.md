# chas-dashboard

## Reflektioner och resonemang
Den mesta strukturen i koden har minst en tanke bakom och all kod som skrivits i mindre krya tillstånd har iallfall kollats över i efterhand. Allting finns kommenterat i koden men tänker ge lite resonemang kring koden, uppifrån och ner om man vill hänga med. Nu kör vi!

* Har en upprepning rätt tidigt i koden där jag sätter tid och datum vid DOMContentLoaded, detta är för att inte behöva invänta tid i en sekund och datum i en minut innan den dyker upp.
* Har försökt så gott det går att undvika globala variabler och har landat i globala variabler för sånt som ska ha eventlisteners och sånt som jag behöver komma åt över flera funktioner(en variabel och en array vid links).
* För tiden och datumet har jag valt att göra två olika funktioner för att kunna ha två olika uppdateringsfrekvenser.
* Använde toLocaleTime/DateString för att det var ett otroligt smidigt sätt att displaya allt jag behövde utan arrayer för månader/dagar m.m.
* Försökte hitta ett smidigt sätt att göra input som dyker upp när man klickar, övervägde ett tag att bara styla en input för att slippa displaya och gömma inputs hela tiden. Detta hade varit enklare och krävt mindre kod men gillade inte att man kunde interagera med inputs direkt så höll mig till dolda inputs.
* Då jag inte ville att man skulle kunna interagera med inputs innan klick så valde jag att gömma alla inputs med display:none men för att allting skulle fungera smidigt behövde jag även gömma inputens föräldra-element när inputen var aktiv. Då display:none sabbade förälderns position: relative så fick jag göra en ny klass "hidden" som bara gömmer elementet utan att ta bort det från flödet. (Allt detta hade givetvis blivit enklare med bara stylade inputs)
* Det finns många olika eventListeners, bland annat för titelInput så jag vill ha möjligheten att kunna bekräfta sin input både genom att klicka någon annanstans OCH genom att klicka på enter, detta är en återkommande händelse och jag kunde inte hitta något snyggt sätt att applicera alla events till en listener(genom array med events eller liknande).
* Har använt mig en del av innerHTML funktioner i samband med inputs vilket jag har kommit att förstå innebär en säkerhetsrisk för sidan men har kollat över alla innerHTML funktioner och har if-conditions och manipulering av inputen som borde vara tillräckligt strikt för att förhindra alla illvilliga inputs (sen finns det ingen känslig information på min sida men tyckte det var spännande).
* Gjorde en array med objekt för alla länkar(som innehåller det valda namnet och URL) för att enkelt kunna hitta igen allting i LocalStorage. Det blev en del upprepning och lång kod för att parse listan vid hämtning och stringify vid postande, sökte runt lite för enklare sätt att göra detta på men hittade ingenting som var tillfredställande nog.
* För att kunna hålla koll på alla element och dess respektive ta bortknappar gav jag stängningsknappen ett data-attribut med URLen som matchade länken den tillhörde. Detta leder till att om du har två EXAKT likadana länkar så kommer båda att försvinna vid uppdatering av sidan då dessa tas bort samtidigt ur LocalStorage av filter-funktionen. Jag övervägde att skapa unika ID för varje stängningsknapp och länk men valde i slutändan bort det för att jag är lat och konsekvenserna för nuvarande lösning inte är förödande.
* För att kunna återanvända getWeather funktionen för både det lokala vädret(med lat och lon) och hämta från input(namn på på platsen), valde jag att ta in tre parametrar (lat, lon och URL) med standardvärden för alla för att inte springa på error om jag valde att använda bara en! (Standard URLen baseras på att lat och lon anges)
* I displayWeather kunde jag använt mig av new Date för att hämta alla datum för att undvika array med dagar och göra det smidigare med allt datumrelaterat men för att försäkra mig om att datan från APIn var korrekt så baserade jag allt i väder-widgeten på APIn. (Använder mig av Date() men med input för att göra att giltigt datum av datan från APIn)
* Datan som kom från weatherAPI var inte formaterad exakt som jag ville ha den så finns med en del if-satser för att få till outputen som jag ville ha den.
* För bakgrundsbilderna försökte jag hitta 1920x1080 bilder via APIn men hittade ingen perfekt query för det.
* getImage har en defaultURL som parameter för att funktionen ska fungerar med både randombilder och input! Man måste därför välja manuellt i koden vilken kvalitet man vill ha på bilden vilket inte är optimalt.
* För att ändra bakgrundsbilden har jag en root-variable i CSS som body har som värde på sin background-image och ändrar värdet på variabeln dynamiskt med setProperty.
* Sökte runt lite för ett sätt att uppdatera bakgrundsbilden först när den har laddat in så att användaren inte blir lämnad med en blank bakgrundsbild hur länge som helst. För att göra detta behövde jag göra en new Image() och sätta URLen till den jag ska använda sen och vänta på att den ska ladda in med img.complete. (Jag har även en lokal fallback som laddar om requesten inte går igenom.)

* Är inte världens vassaste på varken HTML eller CSS (Eller JS för den delen) så blev väldigt mycket klasser i HTML i ett försök att korta ner längden på CSS.

Överlag är jag nöjd med mitt arbete och tycker att jag har gjort det så bra jag kunde på de flesta punkter, sen är jag väl medveten om att det finns många områden jag kan utvecklas i och mycket saker som jag skulle kunna göra bättre. Sorry för den här väggen med text, hoppas kaffet är riktigt starkt för här kommer en sammanfattning!

## Negativt
#### Kod
* Många olika inputs och valideringar som blir kluriga att hålla koll på.
* Offentliga API-nycklar som tack och lov är gratisanvändning endast
#### Cat facts
* Cat facts är begränsade till 5 per dag och upprepas titt som tätt men var den första bästa APIn som hade obegränsade förfrågningar
* Cat fact displayen är rätt ful.

#### Bakgrundsbild
* Hittade inget sätt att hämta bilder med bra mått (Trots landscape och 1920x1080 query).
* Lösningen med att invänta bakgrundsbilden fungerar inte med länkarna som har "dpr=2"(och därmed högre kvalitet)
#### Deployment, browsers och responsiv design
* Sprang in i en del CSS-problem vid deployment som jag försökt åtgärda men stöter ännu på problem ibland mellan olika enheter.

## Positivt
* Jävla bra styling
* Allting funkar bra och har en smooth user experience
* Första interaktionen med många av dessa APIer, localStorage och mer som jag tycker att jag har löst bra även om jag tror det finns bättre och smidigare sätt på mycket av det jag gjort.
* Inga error i HTML validator.
* Favicons från url!!
* Visar dag och månad(på svenska) istället för en siffra 😲
* HTML title attribute som ger instruktioner för användning på hover.
* Bakgrundbilden har en default och en fallback!
* Försökt så gott jag kan att strukturera upp och kommentera min kod
* Bakgrundsbilden laddar in innan den uppdaterar och förhindrar att bakgrunden blir blank!!
* Lyckades lösa väderbeskrivning någorlunda men fortfarande en rätt ful lösning!

## Neutralt? (Svårt att bestämma om detta är bra eller dåligt)
* Link-input tar bara kompletta länkar, enligt regex(hämtad från nätet)(Positivt? kanske men jobbigt att skriva hela url:er)
* Går inte att ha repetition av länkar i shortcuts då funktionen tar bort alla items som delar EXAKT url
* Väderbeskrivning var svårt att få kortfattad. Nu är det bara sista ordet i beskrivningen som kommer med (funkar oftast men blir ibland "närheten" eller "molnighet")(Finns ingen kortfattad beskrivning i datan så måste isåfall lägga till massa if-statements och manuella beskrivningar).

## ??
* Försökt så gott det går att försöka få en konsekvent styling över webbläsare. Vet ännu bara 100% säkert att det fungerar på MIN enhet 😆
