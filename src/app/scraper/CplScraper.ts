///<reference path="HeloiseScraper.ts"/> 
///<reference path="http/CplHttpRequester.ts"/> 
///<reference path="html/CplHeloiseParser.ts"/> 
module Scraper{

export class CplHeloiseScraper extends HeloiseScraper{
	private profs: DTO.ProfDto[] = [];
	constructor(){
	super();
	this.requester = new Requester.CplHttpRequester();
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
		this.requestIndexPage(numberOfIndexPages);
	}

	private requestIndexPage(numberOfIndexPages: number, index:number=1){
		if(!(index > numberOfIndexPages)){	
			this.requester.requestIndexPage(index);
			setTimeout(() => {this.requestIndexPage(numberOfIndexPages, index+1);},2000);
		  console.info("processe Index Page: " + index);
		}
	}

	private scrapeSingleIndexPage(htmlBody: string): void{
	 	var profList: DTO.ProfDto[] = this.parser.parseIndexPage(htmlBody);
		this.postProfsToEs(profList);
	}

	private postProfsToEs(profList: DTO.ProfDto[],index:number=0){
		if(profList.length > index){
			this.requester.postToEs(profList[index]);
			setTimeout(()=>{this.postProfsToEs(profList, index+1);}, 2000);
			}
	}

	public scrapeDetails(){
		this.requester.fetchListFromES(2000,this.requestDetailsOf);

	}
	private requestDetailsOf = (esResult : DTO.EsDto, index :number= 0):void => {
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
