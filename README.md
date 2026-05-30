Oefeningen voor de Selectieproeven Defensie 

Een interactieve webapplicatie voor iedereen die bij defensie gaat soliciteren.
Deze oefeningen bereiden je specifiek voor op het computer gedeelte van de selectieproeven. 

De applicatie bestaat uit 6 cognitieve testen die kandidaten ook zullen afleggen bij hun solicitatie.

- plaatsbepalingstest
- woordgeheugentest
- foutdetectietest
- getalvaardigheidstest
- redeneertest
- reactiesnelheid

Het doel van dit project was 
  1) Om de oefeningen zo goed mogelijk na te bouwen.
  2) De opgaven en antwoorden automatisch te genereren, zodat er eindeloze varietie ontstond zonder bias in de antwoorden.
  3) Het geven van feedback zodat kandidaten hun prestatie konden inschatten en hun vordering kunnen beoordelen.

Features webapplicatie

-6 interactieve oefeningen die nauw verwant zijn aan de testen die een solicitant zal afleggen 
-Dynamisch gegenereerde vragen en antwoordmogelijkheden
-tijdslimieten voor de oefeningen met een vast tijdslimiet
-eerlijke spreiding van de correct antwoorden

De applicatiecode
HTML5 / CSS3 / JavaScript

Projectstructuur 
Selectieproeven Defensie/
│
├── webpaginas/
│   ├── foutdetectie.html 
│   ├── getalvaardigheid.html
│   ├── Hoofdpagina.html
│   ├── plaatsbepaling.html
│   ├── reactiesnelheid.html
│   ├── redeneer.html
│   └── woordgeheugen.html 
├── styles/
│   ├── foutdetectie.css
│   ├── getalvaardigheid.css
│   ├── hoofdpagina.css
│   ├── plaatsbepaling.css
│   ├── reactiesnelheid.css
│   ├── redeneertest.css
│   └── woordgeheugen.css
├── scripts/
│   ├── foutdetectie/
│   │   ├── foutdetectie.js
│   │   └── stringPool.js
│   ├── getalvaardigheid.js
│   ├── plaatsbepaling.js
│   │   ├── pijltjes.je
│   │   └── plaatsbepaling.je
│   ├── reactiesnelheid.js
│   ├── redeneer.js
│   │   ├── redeneertest.js
│   │   └── vergelijkingen.js
│   └── woordgeheugen.js
│       ├── woordgeheugen.js
│       └── categorieen.js
└── README.md


<p align="center">    
  #Programmalogica en Ontwerpkeuzes
</p>

### # foutdetectie
Hier krijgt de gebruiker 2 Strings te zien, zoals (email adressen, woorden of willekeurige tekens) 
en is het aan de gebruiker om zo snel mogelijk het aantal afwijkingen te selecteren. 
De antwoorden gaan van 0 tot en met 4.
Eerst wordt er een willekeurige string uit de dataset "stringPool.js" gehaald. 
Vervolgens wordt een tweede string gemaakt door de eerste string een x-aantal mutaties te geven, waarbij
x een getal is van 0 tot en met 4 en tevens het juiste antwoord op de vraag. Hierbij is bewust gekozen
om van een gegeven aantal 'mutaties' te vertrekken en dan de string aan te passen ipv de string op
een willekeurige wijze aan te passen om vervolgens de mutaties te tellen. 
De reden hiervoor is tweedelig. 
Ten eerste mag het aantal mutaties maximaal 4 bedragen.
Bovendien kan er bias ontstaan in de antwoorden als je willekeurige karakters uit de string gaat bewerken.
Aangezien bij 4 mutaties er gestopt moet worden, zal bij een (Math.random() < 0.5) de verdeling van mutaties zich sterk naar voor verschuiven. 
Als de kans verkleint wordt, bv (Math.random() < 0.2) zullen minder lange strings zelden 4 mutaties hebben.
Daarom is er gekozen om vanuit het aantal mutaties te vertrekken en dit als parameter te gebruiken voor het bewerken van de oorspronkelijke string.
Wel zou het voor een toekomstige sprint nuttig zijn om het beste van beide werelden te nemen. Waarbij er vertrokken wordt 
van X mutaties (waarbij X tevens het correcte antwoord voorstelt) maar de mutaties ook worden nageteld voor extra robuustheid.
Wanneer de telling niet overeenkomt met X, zou de oorspronkelijke string opnieuw bewerkt worden.
Het biasvrije mutatie mechanisme gaat als volgt:
Eerst wordt het aantal mutaties gekozen (van 0 t.e.m. 4)
Dan worden de posities willekeurig gekozen. speciale tekens zijn gevrijwaard, om de structuur te bewaren (bv. een email adress).
De vervanging gebeurt per categorie (letter, hoofdletter, cijfer) en willekeurig
Nadat er is nagetrokken of het geretourneerde karakter weldegelijk verschilt van het oorspronkelijke, gebeurt de vervanging.
De gemuteerde string wordt geretouneerd als waarde voor string2
De gebruiker krijgt string1 en string2 te zien.

### woordgeheugen
Deze test evalueert werkgeheugen. Er moeten drie categoriën onthouden worden en op het volgend scherm beoordeeld worden hoeveel woorden overeenkomen met de categorie op dezelfde positie. Volgorde is dus van belang.
Het antwoord varieert van 0 tot en met 3.
Ook hier is er gekozen om te vertrekken vanuit het aantal matches, om bias in de antwoorden te voorkomen. 
opgave aanmaken:
1) Het aantal matches wordt willekeurig gegenereed met Math.floor(Math.random() * 4), dit is tevens het juiste antwoord
2) Bij een match wordt een woord een dezelfde categorie gekozen.
3) Bij een afwijking maakt het programma gebruik van een modulus operator om een willekeurige categorie te selecteren die niet overeenkomt met de gegeven categorie. Uit deze afwijkende categorie wordt willekeurig een woord gekozen.
4) Omdat de opgave woorden in een array zitten die eerst wordt gevuld met matching-koppels, dan met mismatch-koppels, moet de array geschud worden.
6) De gebruiker krijgt eerst 3 categoriën te zien, daarna 3 woorden
Het volgende scherm wordt bijgehouden in een globale variabel.
In een latere sprint zou het Fisher-Yates algoritme toegepast moeten worden voor het schudden van de array met categorie-woord koppels.
De dynamische debug mode zou later uitgebreid kunnen worden naar de UI.

# getalvaardigheid
Deze test meet zowel getalvaardigheid als werkgeheugen.
De gebruiker krijgt twee schermen voorgeschoteld. In eerste instantie zal het bovenste scherm een wiskundige opgave bevatten. Wanneer de gebruiker op de knop 'volgende' drukt, verdwijnt de opgave en toont het onderste scherm een nieuwe opgave.
De bedoeling is beide uitkomsten te onthouden en op een ander scherm te selecteren welke uitkomst het grootste was. De antwoorden zijn hier boven, onder, of is gelijk aan.
opgave aanmaken:
1) Eerst worden er twee operanden geselecteerd voor de opgaves (voor optelling, aftrekking, vermenigvuldiging of deling)
2) Voor opgave 1 wordt de willekeurige opgave simpelweg aangemaakt met kans.
3) Voor opgave 2 wordt er gekeken naar de uitkomst van opgave 1, zodat de tweede uitkomst in de buurt van opgave 1 komt. Conform met de testen van defensie.
4) Beide uitkomsten worden opgeslagen in een globale variabele
5) de functie mark correct bepaalt het juiste antwoord door de twee uitkomsten te vergelijken.
In een latere sprint zou de antwoordenbias zeker weggewerkt moeten worden. Momenteel is een gelijke uitkomst (antwoord '=') zeldzamer dan de andere twee antwoorden. Ook hier zou vertrokken moeten worden vanuit het correcte antwoord (Math.random < 0.33)
  
