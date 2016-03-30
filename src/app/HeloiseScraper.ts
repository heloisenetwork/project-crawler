///<reference path="system/system.ts"/> 
///<reference path="http/HttpRequester.ts"/> 
module Scraper{

class HeloiseScraper implements Observer.Observer{
	protected requester : Requester.HttpRequester; 
	public update(dto: DTO.HtmlDto):void{
		console.log("Abstract Method Called");
	}
}

export class CplHeloiseScraper extends HeloiseScraper{
	
	constructor(){
	super();
	this.requester = new Requester.CplHttpRequester("http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste/seite1.html");
	this.requester.registerObserver(this);
	}

	public update(dto: DTO.HtmlDto):void{
		console.log(typeof dto == "object");
	}

	public scrapeIndexPages(){
		this.requester.requestIndexPage();
	}
}

}

var scraper = new Scraper.CplHeloiseScraper();
scraper.scrapeIndexPages();
