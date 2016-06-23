///<reference path="HeloiseCrawler.ts"/> 
///<reference path="../system/system.ts"/> 
///<reference path="html/CplHeloiseParser.ts"/> 
///<reference path="http/ParisiensHttpRequester.ts"/> 
module Crawler{

export class ParisiensCrawler extends HeloiseCrawler{
	private profs: DTO.ProfDto[] = [];
	private Converter = require('csvtojson').Converter;
	private fs = require('fs');
	private csvConverter = new this.Converter({
		headers:['id','fullName','mediante','status','origine','diocèse','university','title','religion','professional','author'],
		charset:'utf8'
	});


	constructor(){
		super();
		this.csvConverter.on("end_parsed",this.parseCsv)
		this.csvConverter.on("record_parsed",this.test)
	}

	public update(dto: DTO.HtmlDto):void{
					console.log('No Update needed');
	}

	public crawlIndex(){
		let csvStream = this.fs.createReadStream("uploads/heloise.csv", {encoding:"binary"}).pipe(this.csvConverter);
	}

	private test = (row:any) => {
	//console.log(row);
	}

	private parseCsv = (jsonResult:any) => {
		let requester : Requester.HttpRequester = new Requester.ParisiensHttpRequester();
		for(var rowIndex in jsonResult){
			
			let rowObject = jsonResult[rowIndex];
			var prof: DTO.ProfDto = new DTO.ProfDto();
			var title :string  = rowObject.title;
			//console.log(title.split('\n').join("").replace(/\s+/g, ' ').replace(".",'').trim());
			prof.name = rowObject.fullName;
			prof.id = rowObject.id;
			prof.title = rowObject.title;
			//	console.log(prof);
			if(+rowIndex < 100 ){
			requester.postToEs(prof);
			}	
		}
	}
}

}
	
