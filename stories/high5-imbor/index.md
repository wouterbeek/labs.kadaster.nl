---
layout: story
title: DiS-Geo High 5 - IMBOR & BGT Data
---

# Samenhangende Objecten Registratie en aanvullende domein modellen

Deze datastory laat zien hoe de Samenhangende Objecten Registratie (SOR) kan werken in combinatie met aanvullende domein modellen.
Met linked data kunnen we gegevens uit de SOR in samenhang met aanvullende registraties gebruiken. In dit voorbeeld worden GWSW en IMBOR gebruikt in combinatie met de BGT.

[img](sor-houtskoolschets.png)

<figure id="figuur-1">
  <a href="/assets/images/sor-houtskoolschets.png">
    <img src="/assets/images/sor-houtskoolschets.png">
  </a>
  <figcaption>
    Figuur 1 ― Houtskoolschets van Samenhangende Objecten Registratie
  </figcaption>
</figure>

## Scenario

Er is een incident (brand) waar een grote hoeveelheid bluswater bij vrijkomt. We willen weten waar dit eventueel vervulde bluswater in de omgeving terecht komt.
Hiervoor beginnen we onze analyse in de SOR om de betreffende Put te vinden in IMGeo. Dan zoeken we aanvullende informatie in GWSW. De eerste stap is dan om via een linkset de corresponderende Rioolput in GWSW te vinden. Vervolgens gebruiken we de netwerktopologie in GWSW om via het Rioolstelsel de dichtstbijzijnde Overstortput te vinden. Dit is de plek waar het bluswater mogelijk in de omgeving terecht zal komen.
Vanaf deze plek zoeken we in de SOR over welke terreindelen het gaat. Tenslotte bevragen we via Ontodia de organisatie specifieke IMBOR kennisgraph over aanvullende informatie van dit terreindeel. 



### Queries

1) Zoek de corresponderende GWSW Rioolput bij de IMGEO put (gebruikt dus de linkset tussen IMGeo en GWSW)
(https://data.labs.kadaster.nl/disgeo/-/queries/Select-put-imbor-rioolput-gwsw/5)
<figure id="2">
  <query data-row data-config-ref="https://data.labs.kadaster.nl/disgeo/-/queries/Select-put-imbor-rioolput-gwsw/5">
  </query>
  <figcaption>
    Figuur 2 - Titel nader in te vullen
  </figcaption>
</figure>

2) Zoek in GWSW de dichtstbijzijnde Overstortput die via het rioolstelsel verbonden is met de betreffende rioolput (dus niet alleen hemelsbreed)
(gwsw-rioolput-stelsel-overstortput.rq)
<figure id="3">
  <query data-row data-config-ref="https://data.labs.kadaster.nl/disgeo/-/queries/Select-put-imbor-rioolput-gwsw/5">
  </query>
  <figcaption>
    Figuur 3 - Titel nader in te vullen
  </figcaption>
</figure>

3) Zoek in de BGT welke terreindelen er bij deze overstortput liggen (zou een gefedereerde geosparql query moeten zijn, maar die werkt dus niet...) 
    (https://data.labs.kadaster.nl/disgeo/-/queries/dichtstbijzijnde-vlak-bij-punt/2)
<figure id="4">
  <query data-row data-config-ref="https://data.labs.kadaster.nl/disgeo/-/queries/dichtstbijzijnde-vlak-bij-punt/2">
  </query>
  <figcaption>
    Figuur 4 - Titel nader in te vullen
  </figcaption>
</figure>

4) Zoek met Ontodia aanvullende informatie in IMBOR bij het betreffende BGT object
    (https://labs.kadaster.nl/demonstrators/graph-browser/ontodia-imbor?resource=http://bgt.basisregistraties.overheid.nl/bgt/id/Groenvoorziening/G0383.720d37e2ed1a4d918c683c7bdd4d11e3)
<figure id="5">
  <query data-row data-config-ref="https://labs.kadaster.nl/demonstrators/graph-browser/ontodia-imbor?resource=http://bgt.basisregistraties.overheid.nl/bgt/id/Groenvoorziening/G0383.720d37e2ed1a4d918c683c7bdd4d11e3">
  </query>
  <figcaption>
    Figuur 5 - Titel nader in te vullen
  </figcaption>
</figure>

## KvK

Toon SBI codes voor een specifieke omgeving.

<figure>
  <query data-config-ref="https://data.labs.kadaster.nl/wouter/-/queries/test">
  </query>
  <figcaption>
    Figuur X ― TBD
  </figcaption>
</figure>