///<reference path="../system/system.ts"/> 
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
	public parseDetailPage(htmlBody:string){
		console.log("Call of Abstract Method");
	}
}

export class CplHeloiseParser extends HeloiseParser{
	private baseUrl="http://www.uni-leipzig.de";
	
	public getNumberOfIndexPages(htmlBody:string): number{
		var $ = this.cheerio.load(htmlBody);
		var pageLinks =  $('.seiten a')
		var numberOfPageLinks = $(pageLinks[pageLinks.length - 1]).text();
		return numberOfPageLinks
	}

	public parseIndexPage(htmlBody:string): DTO.ProfDto[]{
		var profList: DTO.ProfDto[] = []; 
	 	var $ = this.cheerio.load(htmlBody);
		$('#content li a').each((index, value) => {
			var prof: DTO.ProfDto = new DTO.Prof();
			var labelString = $(value).text();
			var name = labelString.split('(')[0].split(',');
			prof.name = name[1] + name[0];
			prof.url = this.baseUrl + $(value).attr('href'); 
			prof.projectId = "CPL";
			profList[index] = prof; 
		});

			return profList;
	}
	public parseDetailPage(htmlBody:string){
		console.log("Not implemented yet");
	}
}
}
