///<reference path="system/system.ts"/> 
///<reference path="http/HttpRequester.ts"/> 
///<reference path="html/HeloiseParser.ts"/> 
module Scraper{

class HeloiseScraper implements Observer.Observer{
	protected requester : Requester.HttpRequester; 
	protected parser : Parser.HeloiseParser;
	public update(dto: DTO.HtmlDto):void{
		console.log("Abstract Method Called");
	}
}

export class CplHeloiseScraper extends HeloiseScraper{
	private profs: DTO.ProfDto[] = [];
	constructor(){
	super();
	this.requester = new Requester.CplHttpRequester("http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste/seite1.html");
	this.requester.registerObserver(this);
	this.parser = new Parser.CplHeloiseParser();
	}

	public update(dto: DTO.HtmlDto):void{
		if(dto.type == DTO.PageType.INDEX){
			this.scrapeIndexPages(dto.body);	
		}else if(dto.type == DTO.PageType.SINGLE_INDEX){
			console.log("Event");
			this.scrapeSingleIndexPage(dto.body);	
		}
	}

	public scrapeIndex(){
		this.requester.requestIndexPage();
	}
	
	private scrapeIndexPages(htmlBody: string): void{
	 	var numberOfIndexPages: number = this.parser.getNumberOfIndexPages(htmlBody);
		for(var i = 1; i<=numberOfIndexPages; i++){
			this.requester.requestIndexPage(i);
		}
	}

	private scrapeSingleIndexPage(htmlBody: string): void{
	 	var profList: DTO.ProfDto[] = this.parser.parseIndexPage(htmlBody);
		for(var i = 0; i<profList.length; i++){
			console.log(profList[i]);
			this.profs[this.profs.length] = profList[i];
			console.log(this.profs.length);
		}
	}
}

}

var scraper = new Scraper.CplHeloiseScraper();
scraper.scrapeIndex();
