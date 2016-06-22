///<reference path="HeloiseCrawler.ts"/> 
///<reference path="html/CplHeloiseParser.ts"/> 
module Crawler{

export class ParisiensCrawler extends HeloiseCrawler{
	private profs: DTO.ProfDto[] = [];
	private Converter = require('csvtojson').Converter;
	private csvConverter = new this.Converter({});


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
		console.log(jsonResult);
	}
}

}
	
