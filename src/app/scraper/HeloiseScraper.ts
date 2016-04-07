///<reference path="../system/system.ts"/> 
///<reference path="http/HttpRequester.ts"/> 
///<reference path="html/HeloiseParser.ts"/> 
module Scraper{

export class HeloiseScraper implements Observer.Observer{
	protected requester : Requester.HttpRequester; 
	protected parser : Parser.HeloiseParser;
	public update(dto: DTO.HtmlDto):void{
		console.log("Abstract Method Called");
	}
}


}

