///<reference path="../../typings/jsdom/jsdom.d.ts" />										
///<reference path="../app.ts" />										
module HtmlParser{

	export class CPLHtmlParser{
		private  jsparser = require('jsdom');
		private fs = require("fs");
		private jquery = this.fs.readFileSync("./js/jquery_1.12.1.js", "utf-8");
		private html: string; 
		private detailLinkList: string[] = new Array<string>();  
		private profProcessor =  function(prof: DTO.Prof):void{};
		private callBack =  function(arr:string[]):void{}; 
		private config: CPLIndexPageConfig; 
		private detailPageConfig: CPLIndexPageConfig; 


		/**
		The Constructor
		*/
		constructor(html: string){
			this.html = html;
		}	

		public findDetailLinkList = function(callBack:(arr:string[])=>void){
			console.log('start');
			this.config = new CPLIndexPageConfig(this.html, this.jquery, this.getIndexList); 	
			this.jsparser.env(this.config);
			this.callBack = callBack; 
		
		}

		public parseDetails(profProcessor:(prof: DTO.Prof)=> void){
			console.log("start Processing Detail");
			this.profProcessor = profProcessor;
			var config:CPLDetailPageConfig = new CPLDetailPageConfig(this.html, this.jquery, this.getDetails);
			this.jsparser.env(config);
			
		}
		
		private getDetails : (x: any, y: any) => void =  (error, dom) => {
			var $ = dom.$; 
			var vitaDiv = $('#Lebenslauf');
			var prof: DTO.Prof = new DTO.Prof() ; 
			prof.name = $('#Lebenslauf h1').text();
			this.profProcessor(prof);
		}
		
		getIndexList: (x: any, y: any) => void =  (error, dom) => {

				var $ = dom.$; 
				console.log("start Iteration");
				var listElements =  $("#content li a");
				$.each(listElements, (index, value) => {
						this.detailLinkList[index] = $(value).attr('href');
					});
				this.callBack(this.detailLinkList);
				console.log("end Iteration");

			}
	}
	

		class CPLIndexPageConfig{
		constructor(public html: string, public src:string, public done: Function){}
		}
		class CPLDetailPageConfig{
		constructor(public html: string, public src:string, public done: Function){}
		}


	
} 
