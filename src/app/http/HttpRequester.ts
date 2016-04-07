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


	public requestDetailPage(prof:DTO.ProfDto):void{
		console.log("Abstract Method called");
	}

	public postToEs(prof: DTO.ProfDto, attempts:number = 1):void{
		this.request({
			method: 'PUT',
			uri: 'http://127.0.0.1:9200/heloise/CPL/' + prof.url.split("/")[prof.url.split("/").length-1],
			json: prof
			}, function(err, resp, body){
					if(err || (resp.statusCode!=200 && resp.statusCode!=201)){
						console.log(resp.statusCode);
						console.log(body);
						console.log("Attempts: " + attempts);
						if(attempts < 11){
							console.log(this.request);
						}
					}
		});
	}

public fetchAllFromES(nrOfResults: number, project:String, updater: (esResult: DTO.EsDto)=>void){
		var profList: DTO.ProfDto[] = [];
		this.request({
			method: 'GET',
			uri: 'http://127.0.0.1:9200/heloise/'+project+'/_search?size='+nrOfResults
			
			}, function(err, resp, body:string){
					var esDto: DTO.EsDto = new DTO.EsDto();
					var rawResult = JSON.parse(body);
					esDto = <DTO.EsDto> rawResult.hits;
					updater(esDto);
		});
		return profList;
	}

	protected doRequest = (url: string, pageType: DTO.PageType, attempts: number = 1, prof?:DTO.ProfDto): void =>  
	{
		this.request(url,{timeout:20000}, (error, response, body) =>  {
			if(error || !(response.statusCode == 200)){
				console.log(error);
				console.log(url);
				console.log("Attempts: " + attempts);
				
				if(attempts < 101){
					this.doRequest(url, pageType, attempts+1,prof);
				}
			
			}else{
				var htmlDto = new DTO.HtmlDto(pageType, body, prof);
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

	public requestDetailPage(prof:DTO.ProfDto):void{
		this.doRequest(prof.url, DTO.PageType.DETAIL, 1,prof);
	}
	
}

}
