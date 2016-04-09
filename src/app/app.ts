///<reference path="crawler/CplCrawler.ts"/> 

var appArgLength: number = process.argv.length;
var execution: boolean = true;
if(!(appArgLength > 2)){
	console.error("Arguments are missing.");
}else{
	
	//switch Crawler
	if(process.argv[2] == "cpl"){
		var crawler = new Crawler.CplHeloiseCrawler();
	}else{
		console.log("No Crawler for arg %s found.", process.argv[2]);
		execution = false;
		}
		if(execution){
			// start crawling
			if(process.argv[3] == "details"){
				crawler.crawlDetails();	
			}else{
				crawler.crawlIndex();
			}
		}

}
