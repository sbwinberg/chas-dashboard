# chas-dashboard

## Negativt
#### Kod
* Många olika inputs och valideringar som blir kluriga att hålla koll på.
* Offentliga API-nycklar som tack och lov är gratisanvändning endast
#### Cat facts
* Cat facts är begränsade till 5 per dag och upprepas titt som tätt men var den första bästa APIn som hade obegränsade förfrågningar
* Cat fact displayen är rätt ful.
#### Väder
* Väderbeskrivning var svårt att få kortfattad. Nu är det bara sista ordet i beskrivningen som kommer med (funkar oftast men blir ibland "närheten" eller "molnighet")(Finns ingen kortfattad beskrivning i datan så måste isåfall lägga till massa if-statements och manuella beskrivningar).
#### Bakgrundsbild
* Hittade inget sätt att hämta bilder med bra mått (Trots landscape och 1920x1080 query).
* Lösningen med att invänta bakgrundsbilden fungerar inte med länkarna som har "dpr=2"(och därmed högre kvalitet)
#### Deployment, browsers och responsiv design
* Strular med deployment av sidan så den visas olika på olika enheter.
* Oklart nog fungerar den felfritt i mitt chrome men inte i andras chrome.
* Många funktionaliteter går bara i Chrome
* CSSen blir konstig i andra webbläsare
* Ser bara bra ut på desktop, ingen tablet- eller mobilversion


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

## Neutralt? (Svårt att bestämma om detta är bra eller dåligt)
* Link-input tar bara kompletta länkar, enligt regex(hämtad från nätet)(Positivt? kanske men jobbigt att skriva hela url:er)
* Går inte att ha repetition av länkar i shortcuts då funktionen tar bort alla items som delar EXAKT url
  
## Att göra
* Funktionell i andra webbläsare
  
