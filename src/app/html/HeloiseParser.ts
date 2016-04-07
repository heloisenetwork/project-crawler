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
	public parseDetailPage(htmlBody:string, profDto: DTO.ProfDto){
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
			var prof: DTO.ProfDto = new DTO.ProfDto();
			var labelString = $(value).text();
			var name = labelString.split('(')[0].split(',');
			prof.name = (name[1] + name[0]).trim();
			prof.url = this.baseUrl + $(value).attr('href'); 
			prof.firstName = name[1].trim();
			prof.lastName = name[0].trim(); 
			if(labelString.split('(')[1]){
				prof.title = labelString.split('(')[1].replace(")","").trim();
			}
			profList[index] = prof; 
		});

			return profList;
	}
	public parseDetailPage(htmlBody:string, prof: DTO.ProfDto){

	 	var $ = this.cheerio.load(htmlBody);
		var vitaDiv = $('#Lebenslauf');
		prof.name = $('#Lebenslauf h1').text();
		var baseDiv = $($('#Leben').children('p')[0]).html();
		var baseData:string[] = [];
		if(baseDiv){
			baseData = baseDiv.split("<br>");
		}
		for(var i = 0; i < baseData.length; i++){
			var line:string = baseData[i];
			if(this.isBirthDate(line)){
				var lineArr:string[] = line.replace("geb.","").split("in");
				if(lineArr[0]){
					prof.birthDate = lineArr[0].trim();
				}
				if(lineArr[1]){
					prof.birthCity = lineArr[1].trim();
				}
			}else if(this.isDeathDate(line)){
				var lineArr:string[] = line.replace("gest.","").split("in");
				if(lineArr[0]){
					prof.deathDate = lineArr[0].trim();
				}
				if(lineArr[1]){
					prof.deathCity = lineArr[1].trim();
				}
			}
		}
		
	}

	private isBirthDate(line:string):boolean{
		var isBirthDate:boolean = line.search("geb.") != -1;
		return isBirthDate;
	}
	private isDeathDate(line:string):boolean{
		var isDeathDate:boolean = line.search("gest.") != -1;
		return isDeathDate;
	}
}
}
