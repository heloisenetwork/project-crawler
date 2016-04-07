///<reference path="../../system/system.ts"/> 
module Parser{

export class HeloiseParser{

	protected cheerio = require('cheerio');
	
	public getNumberOfIndexPages(htmlBody:string): number{
		console.log("Call of Abstract Method");
		return 0; 
	}
	public parseIndexPage(htmlBody:string): DTO.ProfDto[]{
		console.log("Call of Abstract Method");
		return [];
	}
	public parseDetailPage(htmlBody:string, profDto: DTO.ProfDto){
		console.log("Call of Abstract Method");
	}
}

}
