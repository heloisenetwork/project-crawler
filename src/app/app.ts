///<reference path="scraper/CplScraper.ts"/> 

var appArgLength: number = process.argv.length;
var execution: boolean = true;
if(!(appArgLength > 2)){
	console.error("Arguments are missing.");
}else{
	
	//switch scraper
	if(process.argv[2] == "cpl"){
		var scraper = new Scraper.CplHeloiseScraper();
	}else{
		console.log("No Scraper for arg %s found.", process.argv[2]);
		execution = false;
		}
		if(execution){
			// start scraping
			if(process.argv[3] == "details"){
				scraper.scrapeDetails();	
			}else{
				scraper.scrapeIndex();
			}
		}

}
