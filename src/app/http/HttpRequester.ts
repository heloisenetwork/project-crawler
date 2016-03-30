///<reference path="../../typings/request/request.d.ts"/>
///<reference path="../system/system.ts"/> 

module Requester{

export class HttpRequester extends Observer.Observable{
	protected request = require('request');
	protected baseUrl:string;
	protected indexPageUrl:string;

	public requestIndexPage():void;
	public requestIndexPage(numberOfPage: number):void;
	public requestIndexPage(numberOfPage?:number):void
	{
		
		console.log("Abstract Method called");
	}


	public requestDetailPage(detailPageUrl:string):void{
		console.log("Abstract Method called");
	}
}

export class CplHttpRequester extends HttpRequester{

	private indexPageSuffix: string = ".html";
	private indexPagePrefix: string = "http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste/seite";	
	constructor(indexPageUrl:string){
		super();
		this.baseUrl = "http://www.uni-leipzig.de";
		this.indexPageUrl = indexPageUrl;
	}

	public requestIndexPage():void;
	public requestIndexPage(numberOfPage: number):void;
	public requestIndexPage(numberOfPage?:number):void
	{
		if(!numberOfPage){
			this.request(this.indexPageUrl, (error, response, body) =>  {
				var htmlDto = new DTO.HtmlDto(DTO.PageType.INDEX, body);
				super.notifyObservers(htmlDto);
			});
		}else if(typeof numberOfPage == "number"){
			var pageUrl = this.indexPagePrefix + numberOfPage + this.indexPageSuffix;
			this.request(pageUrl, (error, response, body) =>  {
				var htmlDto = new DTO.HtmlDto(DTO.PageType.SINGLE_INDEX, body);
				super.notifyObservers(htmlDto);
			});
		}
	}

	public requestDetailPage(detailPageUrl:string):void{
		console.log("Not implemented yet")	
	}
}


}
