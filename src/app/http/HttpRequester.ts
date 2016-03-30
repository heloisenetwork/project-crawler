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

	protected doRequest = (url: string, pageType: DTO.PageType, attempts: number = 1): void =>  
	{
		this.request(url, (error, response, body) =>  {
			if(error){
				console.log(error);
				console.log("Attempts: " + attempts);
				
				if(attempts < 11){
					this.doRequest(url, pageType, attempts++);
				}
			}else{
				var htmlDto = new DTO.HtmlDto(pageType, body);
				super.notifyObservers(htmlDto);
			}
		});
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
			this.doRequest(this.indexPageUrl, DTO.PageType.INDEX);
		}else if(typeof numberOfPage == "number"){
			var pageUrl = this.indexPagePrefix + numberOfPage + this.indexPageSuffix;
			this.doRequest(pageUrl, DTO.PageType.SINGLE_INDEX);
		}
	}

	public requestDetailPage(detailPageUrl:string):void{
		this.doRequest(detailPageUrl, DTO.PageType.DETAIL);	
	}
}

}
