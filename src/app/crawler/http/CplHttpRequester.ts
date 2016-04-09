///<reference path="HttpRequester.ts"/> 
module Requester{

export class CplHttpRequester extends HttpRequester{

	private indexPageSuffix: string = ".html";
	private indexPagePrefix: string = "http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste/seite";	
	
	constructor(){
		super();
		this.baseUrl = "http://www.uni-leipzig.de";
		this.projectId = "CPL";
		this.indexPageUrl = "http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste/seite1.html";
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

	/**
		Eventuelle Abstratkion in HttpRequester möglich
	*/
	public requestDetailPage(prof:DTO.ProfDto):void{
		this.doRequest(prof.url, DTO.PageType.DETAIL, 1,prof);
	}
	
}
}
