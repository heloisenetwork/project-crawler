# Allgemein

Der Project-Crawler ist ein Tool zum automatisierten Bereitstellen der Daten eines Heloise-Projektpartners innerhalb einer Elasticsearch Instanz.
Er bezieht die Daten direkt von der Homepage des jeweiligen Projektpartners und parst die Html-Seiten dementsprechend.
Jedem Projekt soll ein eigener Project-Crawler bereitgestellt werden.
Momentan steht der Crawler für folgende Projekte zur Verfügung:
1. Professorenkatalog Uni Leipzig - CplCrawler

Weiterhin stellt der Project-Crawler eine RESTful API zur Verfügung, über die der Crawlingprozess gestartet werden kann.
Folgende URL's sind dabei nutzbar:

1. localhost:8666/cpl/index
2. localhost:8666/cpl/details


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
	* restify

# Installation

## Konfiguration

Um das Tool einzurichten muss zuerst eine grundlegende Konfiguration vorgenommen werden. Diese ist über eine Typescript-Konstantenklasse möglich. Zu finden ist sie unter

	src/app/configuration/server_config.ts

Darin werden in erster Linie URL's der Projektpartner gepflegt.

Damit der Crawlinprozess erfolgreich ist, muss eine laufende Elasticsearchinstanz konfiguriert sein.
Die Elasticsearchinstanz ist über eine Konfigurationsdatei konfigurierbar. Diese ist unter

	src/app/configuration/server_config.ts
zu finden.

Damit Konfigurationen greifen können, muss der Code nach der Konfiguration kompiliert werden.

## Systemvorbereitung und Konfiguration

    #grunt installieren
	sudo apt-get install grunt-cli

    # Optional: installiere Node-Module
    npm install --save-dev

    # Optional: installiere Typings (An richtige Stelle)
    tsd install cheerio request --save

	# Baue Projekt in js/app.js
	grunt ts:app

# Inbetriebnahme

## Reiner Crawlingprozess

### BuildTool:

	//IndexScraping
	grunt run:cpl_index

	//DetailScraping
	grunt run:cpl_details

### Konsole

    //IndexScraping
	node app.js cpl
	//DetailScraping
    node app.js cpl details


## Webserver mit RESTful API

### Buildtool

	grunt run:server

### Konsole
	node js/app.js

# Troubleshooting

Die mitgelieferten Nodemodule scheinen fehlerhaft zu sein. Zumindest führen sie im Docker-Container zu Fehlern.