///<reference path="HeloiseCrawler.ts"/> 
///<reference path="../system/system.ts"/> 
///<reference path="html/CplHeloiseParser.ts"/> 
///<reference path="http/ParisiensHttpRequester.ts"/> 
module Crawler{

export class ParisiensCrawler extends HeloiseCrawler{
	private profs: DTO.ProfDto[] = [];
	private Converter = require('csvtojson').Converter;
	private csvConverter = new this.Converter({headers:['id','fullName','mediante','status','origine','diocèse','university','title','religion','professional','author']});


	constructor(){
		super();
		//this.csvConverter.on("end_parsed", this.parseCsv)	
		//this.parser = new Parser.CplHeloiseParser();
	}

	public update(dto: DTO.HtmlDto):void{
					console.log('No Update needed');
	}

	public crawlIndex(){
 //		let csvString = this.fs.readFile("uploads/heloise.csv").pipe(this.csvConverter);
			this.csvConverter.fromFile("uploads/heloise.csv", this.parseCsv);
	}

	private parseCsv = (err, jsonResult:any) => {
		let requester : Requester.HttpRequester = new Requester.ParisiensHttpRequester();
		for(var rowIndex in jsonResult){
			let rowObject = jsonResult[rowIndex];
			var prof: DTO.ProfDto = new DTO.ProfDto();
			var title :string  = rowObject.title;
			console.log(title.split('\n').join("").replace(/\s+/g, ' ').replace(".",'').trim());
			prof.title = title.split('\n').join("").trim() ;
			prof.name = rowObject.fullName;
			prof.id = rowObject.id;
			prof.title = rowObject.title;
			requester.postToEs(prof);
		}
	}
}

}
	
