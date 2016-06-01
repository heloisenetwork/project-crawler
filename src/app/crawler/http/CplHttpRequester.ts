///<reference path="HttpRequester.ts"/> 
///<reference path="../../config/server_config.ts"/> 
module Requester{

export class CplHttpRequester extends HttpRequester{

	private indexPageSuffix: string = Configuration.UrlConfiguration.CPL_INDEXPAGE_SUFFIX;
	private indexPagePrefix: string = Configuration.UrlConfiguration.CPL_INDEXPAGE_PREFIX;
	
	constructor(){
		super();
		this.baseUrl = Configuration.UrlConfiguration.CPL_URL;
		this.projectId = "CPL";
		this.indexPageUrl = Configuration.UrlConfiguration.CPL_INDEXPAGE_URL;
	}

	public requestIndexPage():void;
	public requestIndexPage(numberOfPage: number):void;
	public requestIndexPage(numberOfPage?:number):void
	{
		if(!numberOfPage){
			this.doRequest(this.indexPageUrl, DTO.PageType.INDEX);
		}else if(typeof numberOfPage == "number"){
			const pageUrl = this.indexPagePrefix + numberOfPage + this.indexPageSuffix;
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
