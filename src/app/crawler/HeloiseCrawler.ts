///<reference path="../system/system.ts"/> 
///<reference path="http/HttpRequester.ts"/> 
///<reference path="html/HeloiseParser.ts"/> 
module Crawler{

export class HeloiseCrawler implements Observer.Observer{
	protected requester : Requester.HttpRequester; 
	protected parser : Parser.HeloiseParser;
	public update(dto: DTO.HtmlDto):void{
		console.log("Abstract Method Called");
	}
	public crawlDetails(): void{
		console.log("Abstract Method Called");
	}
	public crawlIndex(): void{
		console.log("Abstract Method Called");
	}
}


}

