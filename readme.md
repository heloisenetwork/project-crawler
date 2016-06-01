# Allgemein

Der Project-Crawler ist ein Tool zum automatisierten Bereitstellen der Daten eines Heloise-Projektpartners innerhalb einer Elasticsearch Instanz.
Er bezieht die Daten direkt von der Homepage des jeweiligen Projektpartners und parst die Html-Seiten dementsprechend.
Jedem Projekt soll ein eigener Project-Crawler bereitgestellt werden.
Momentan steht der Crawler für folgende Projekte zur Verfügung:
1. Professorenkatalog Uni Leipzig - CplCrawler

__Momentan ist kein Elasticsearch Konfigurierbar. Damit der Crawler läuft muss eine Instanz auf localhost:9200 laufen.__

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

# Troubleshooting

Die mitgelieferten Nodemodule scheinen fehlerhaft zu sein. Zumindest führen sie im Docker-Container zu Fehlern.