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
			this.scrapeSingleIndexPage(dto.body);
		}else if(dto.type == DTO.PageType.DETAIL){
			this.updateDetailsOf(dto.profDto,dto.body);
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
			this.requester.postToEs(profList[i]);
		}
	}

	public scrapeDetails(){
		this.requester.fetchAllFromES(1000, 'CPL',this.requestDetailsOf);

	}
	public requestDetailsOf = (esResult : DTO.EsDto, index :number= 0):void => {
		if(index%10==0){console.log(index)}
		var hits: DTO.Hit[] = esResult.hits;
		if(hits.length == index){
			return;
		}
		this.requester.requestDetailPage(hits[index]._source);
			setTimeout(() => {this.requestDetailsOf(esResult, index + 1);}, 1000);
	}

	private updateDetailsOf(profDto: DTO.ProfDto, html:string):void{
		this.parser.parseDetailPage(html, profDto);
		this.requester.postToEs(profDto);
	}

}

}

var scraper = new Scraper.CplHeloiseScraper();
//scraper.scrapeIndex();
scraper.scrapeDetails();
