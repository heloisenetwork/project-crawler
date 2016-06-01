///<reference path="../../../typings/request/request.d.ts"/>
///<reference path="../../system/system.ts"/> 
///<reference path="../../config/server_config.ts"/> 

module Requester{

export class HttpRequester extends Observer.Observable{
	protected request = require('request');
	protected baseUrl:string;
	protected indexPageUrl:string;
	protected projectId: string;

//	private esUrl:string = "http://localhost:9200/heloise/";
	private esUrl:string = Configuration.UrlConfiguration.ELASTICSEARCH_URL;

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
			uri: this.esUrl+this.projectId + "/" + prof.id,
			json: prof
			},(err, resp, body) => {
					if(err || (resp.statusCode!=200 && resp.statusCode!=201)){
						console.log(err);
						console.log(resp);
						console.log("Attempts: " + attempts);
						if(attempts < 100){
							setTimeout(()=>{this.postToEs(prof, attempts+1);}, 20000);
						}
					}
		});
	}

public fetchListFromES(nrOfResults: number, updater: (esResult: DTO.EsDto)=>void){
		var profList: DTO.ProfDto[] = [];
		this.request({
			method: 'GET',
			uri: this.esUrl+this.projectId+'/_search?size='+nrOfResults
			
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
				
				if(attempts < 100){
					this.doRequest(url, pageType, attempts+1,prof);
				}
			
			}else{
				var htmlDto = new DTO.HtmlDto(pageType, body, prof);
				super.notifyObservers(htmlDto);
			}
		});
	}
}


}
