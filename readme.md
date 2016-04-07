# Allgemein

Der Project-Scraper ist ein Tool zum automatisierten Bereitstellen der Daten eines Heloise-Projektpartners innerhalb einer Elasticsearch Instanz.
Er bezieht die Daten direkt von der Homepage des jeweiligen Projektpartners und parst die Html-Seiten dementsprechend.
Jedem Projekt soll ein eigener Project-Scraper bereitgestellt werden.
Momentan steht der Scraper für folgende Projekte zur Verfügung:
1. Professorenkatalog Uni Leipzig - CplScraper

__Momentan ist kein Elasticsearch Konfigurierbar. Damit der Scraper läuft muss eine Instanz auf localhost:9200 laufen.__

# Tools
* Build Tool - Grunt
* Sprache - Typescript
* Typings - Definitelty Typed
* Framework - Node
* Module
	* request
	* cheerio - jquery
	* grunt-run
	* grunt-ts
	* grunt-watch

# Installation

    #grunt installieren
	sudo apt-get install grunt-cli

    # Optional: installiere Node-Module
    npm install --save-dev

    # Optional: installiere Typings (An richtige Stelle)
    tsd install cheerio request --save

	# Baue Projekt in js/app.js
	grunt ts:app

# Inbetriebnahme

## BuildTool:

  //IndexScraping
  grunt run:cpl_index

	//DetailScraping
	grunt run:cpl_details

## Konsole

    //IndexScraping
	node app.js cpl
	//DetailScraping
    node app.js cpl details


# Codedoku

## Struktur

* Scraper
* Parser
* Requester

Jeweilige Module sind erweiterbar.

## Erweiterung

* Erstellung neuer Files:
	* ProjectHtmlParser
	* ProjectHttpRequester
	* ProjecScraper

Parser und Requester müssen dabei das Modul HttpRequester oder HtmlParser deklarieren und die jeweiligen ts-Files includen

	///<reference path="html/HeloiseParser.ts"/>

Der Scraper importiert lediglich den ProjektParser und ProjektRequester. Ihm stehen alle geerbeten Funktionen zur Verfügung.

### Beispiel:
--

## Projektspezifische Implementationen

### Scraper
*Beispiel: CPL-HeloiseScraper*

Klasse definiert allgemeinen Workflow.

* Initiale Requests
* Ablauf nach Initialem Request
* Wartezeit zwischen einzelnen Requests
* Beinhaltet definierte Parser und Requester

Es muss implementiert sein:

* UpdateMethode
	* Bestandteil des Observerpattern
	* Wird benachrichtigt sobald ein http-request erfolgreich abgeschlossen wurde.
	* Switch anhand des PageDto was passiert
		* INDEX
			* Herausfinden der Anzahl Index-Seiten anhand der Einstiegsseite
			* Anfrage dieser
		* SINGLE\_INDEX
			* Parsen der einzelnen IndexSeite
			* Generiert ein ProfDto
			* Senden dieses an ES
        * DETAIL
        	* Parsen der Detailseite
        	* Erweiterung des dazugehörigen ProfDto's (Ist im HtmlDto enthalten)
        	* Senden dieses an ES
* Einstiegspunkte (API)
	* ScrapeIndex
		* Initialer Request an die Einstiegsseite
		* Requester triggert bei Erfolg Event mit DTO-INDEX oder eben SINGLE\_INDEX
	* ScrapeDetails
		* Initialer Request an ES zum Parsen der Details einzelner Profs
		* Request muss den Index-Typen beinhalten
		* Menge der Professoren pro Index feststellen ?

### HTTPRequester

Zuständig für HTTP-Requests. Dabei unterscheiden sich vor Allem folgende Gesichtspunkte:

* URLs
	* IndexPage
		* Einstiegspunkt für initialen Request
    * Erstellung einzelner Indexseiten
    	* bspw IndexSeitenPrefix/-Suffix
    * BaseUrl des Heloise-Projektpartners
    * ProjektId des Projektpartners

Es muss implementiert werden:

* requestIndexPage()
	* Methode für den Initialen Request
	* Triggert Event mit PageType.INDEX bei vielen indexseiten, PageType.SINGLE\_INDEX bei einer Indexseite
* requestIndexPage(nrOfIndexPage)
	* Request nach eine bestimmte Detailseite zum Parsen
	* Triggert Event mit PageType.SINGLE\_INDEX
* requestDetailPage()
	* Request nach Detailseite eines Professors eines Profektpartners
	* Basiert auf bereits indiziertem Professor
	* Nutzt die im ES hinterlegte URL
	* Eventuelle Abstraktion möglich
	* Triggert Event mit PageType.Detail

Es wird zur Verfügung gestellt:

* Allgemeine doRequest(url:string, pageType:PageType, attempts:number = 1, prof?:ProfDto)-Methode
	* Führt getRequest aus
	* Führt Request solange aus, bis kein Fehler und statusCode 200 zurückgegeben wird
	* 100 Versuche (Konfiguration)
	* Clientseitiges Timout von 20 Sekunden
	* Erstellt bei Erfolg HtmlDto mit body der Response, übergebenem PageType und übergebenem Prof
		* Prof ist optional, kann undefined sein
    * Triggert bei Erfolg ein Event mit erstelltem HtmlDTO
* fetchListFromEs(nrOfResults: number, updater: (esResult: EsDTO)=>void)
	* Request an ES für eine Liste der Länge nrOfResults
	* Request ist mit der ProjektId eingeschränkt
	* esResult wird in der übergebenen Prozedur updater Behandelt
	* Es gibt keine Fehlerbehandlung
	* Es findet ein hartes Casting statt
* postToEs(profDto:ProfDto, attempts:number = 1)
	* PUT-Request an ES um übergebenen Prof zu indzieren oder upzudaten
	* Dabei wird die gleiche URL aufgerufen
		* EsUrl/index/typ/id
    * Response bei Erfolg ist 200 oder 201
    * Request wird 100 mal wiederholt bis er erfolgreich ist
    * Bei Fehlschlag werden 20 Sekunden gewartet, bis der Request wiederholt wird

### HTMLParser

Stellt Methoden zum Parsen der einzelnen Seiten bereit. Hat dabei einen imperativen Charakter und arbeitet nicht asynchron.
Methoden werden jedoch parallel aufgerufen.

Jede Methode bekommt einen HTML-Body in Form eines Strings übergeben. Dieser kann via cheerio geparst werden. Cheerio basiert wiederum auf Jquery, sodass die Handhabung sehr ähnlich ist.

Es muss implementiert werden:

* getNumberOfIndexPages(htmlBody:string): number
	* Gibt die Anzahl der IndexSeiten zurück (insofern mehrere vorhanden sind)
* parseIndexPage(htmlBody:string): ProfDto
	* parst einzelne Indexseite nach relevanten Daten der verlinkten Professoren
	* relevante Daten sind im ProfDto definiert
	* besonderem Wert hat dabei
		* id
		* url
    	* Ohne diese Werte kann der Scraper nicht weiter machen
    * Gibt eine Liste aller auf der Indexseite befindlichen ProfDto's zurück
* parseDetailPage(htmlDto:string, profDto: ProfDto): void
	* parst mittels cheerio die Detailseite eines Professors nach relevanten Daten
	* relevante Daten sind im ProfDto definiert
	* Fügt die gefunden Werte dem ProfDto hinzu -> Direkte Anpassung des Objektes
	* überschreibt gegegebenefalls bereits im ProfDto befindliche Daten

