# chas-dashboard

## Negativt
* Link-input tar bara kompletta länkar, enligt regex(hämtad från nätet)
* Väderbeskrivning var svårt att få kortfattad. Nu är det bara sista ordet i beskrivningen som kommer med (funkar oftast men blir ibland "närheten").
* Stökigt med alla olika inputs, många if-statements och valideringar
* Går inte att ha repetition av länkar i shortcuts då funktionen tar bort alla items som delar exakt url
* Två eventlisteners för "notes" för att få någorlunda konsekvent sparande men sparar inte sista tecknet vid uppdatering.
* Stökigt med variabelnamn som blivit rätt lika och skiljer sig från HTML
* Inte speciellt responsiv samt ingen mobile-version
* Säkerhetsbrister i och med att innerHTML uppdateras med input
* Hittade inget sätt att hämta bilder med bra mått
* Cat facts är begränsade till 5 per dag men var den första bästa APIn som hade obegränsade förfrågningar
* Cat fact displayen är rätt ful
* Bakgrundbilden blir blank mellan uppdateringarna
* Ingen check för att kolla att platsen i väder-input finns
* Datum uppdateras endast när sidan uppdateras
  

## Positivt
* Jävla bra styling
* Allting funkar bra och har en smooth user experience
* Första interaktionen med många av dessa APIer, localStorage och mer som jag tycker att jag har löst bra även om jag tror det finns bättre och smidigare sätt
* Inga error i HTML validator
* Favicons från url!!
* Visar dag och månad(på svenska) istället för en siffra 😲
* HTML title attribute som ger instruktioner för användning på hover

## Att göra
* Håller på att försöka göra om koden så att användaren inte kan använda input för att ändra innerHTML
* Städa upp och flytta globala variabler
* Försöka städa upp if-satserna
* Försöka städa upp eventlisteners, om det går utan att sabba nuvarande funktionalitet
* Ha kvar nuvarande bakgrundsbild tills nästa laddat in
  
