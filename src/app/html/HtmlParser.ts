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
		private linkProcessor =  function(arr:string[]):void{}; 
		private indexLoop =  function(nr:number):void{}; 
		private config: CPLIndexPageConfig; 
		private detailPageConfig: CPLIndexPageConfig;
		private indexPageNumberConfig:CPLDetailPageConfig;


		/**
		The Constructor
		*/
		constructor(html: string){
			this.html = html;
		}	
		/**
			API-Function to get the Links of all Index - Entries.
			Uses JSDOM-Callback to get the Links. Links are processed by linkProcesser Argument
			Deprecated
		*/
		public findDetailLinkList = function(linkProcessor:(arr:string[])=>void){
			this.config = new CPLIndexPageConfig(this.html, this.jquery, this.getUrlsFromIndexList);
			this.jsparser.env(this.config);
			this.linkProcessor = linkProcessor; 
		
			}

			/**
			API-Function to Parse the IndexPage of an CPL-Professor to a DTO.Prof.
			Uses JSDOM-Callback to parse the page. ProfessorDTOS are processed by profProcessor  Argument	
			*/	
		public parseIndexToProfs = function(profProcessor:(prof: DTO.Prof)=> void){
			this.profProcessor = profProcessor;
			this.config = new CPLIndexPageConfig(this.html, this.jquery, this.parseIndexEntriesToProfInfos);
			this.jsparser.env(this.config);
		
			}

		
			/**
			API-Function to Parse the DetailPage of an CPL-Professor to a DTO.Prof.
			Uses JSDOM-Callback to parse the page. ProfessorDTOS are processed by profProcessor  Argument
			
			*/	
		public parseDetails(profProcessor:(prof: DTO.Prof)=> void){
			this.profProcessor = profProcessor;
			var config:CPLDetailPageConfig = new CPLDetailPageConfig(this.html, this.jquery, this.parseDetailPage);
			this.jsparser.env(config);
			
		}

	public getNumberOfIndexPages(indexLoop: (nr:number) => void){
		this.indexLoop = indexLoop; 
		this.indexPageNumberConfig = new CPLDetailPageConfig(this.html, this.jquery, this.parsePageForNumberOfIndexPages);
		this.jsparser.env(this.indexPageNumberConfig);
	}
		
		private parseDetailPage : (x: any, y: any) => void =  (error, dom) => {
			var $ = dom.$; 
			var vitaDiv = $('#Lebenslauf');
			var prof: DTO.Prof = new DTO.Prof() ; 
			prof.name = $('#Lebenslauf h1').text();
			this.profProcessor(prof);
			console.log($('#Leben p').html().split("<br>"));
			}

		private parsePageForNumberOfIndexPages : (x: any, y: any) => void =  (error, dom) => {
			var $ = dom.$; 
			var pageLinks =  $('.seiten a')
			var numberOfPageLinks = $(pageLinks[pageLinks.length - 1]).text();
			this.indexLoop(numberOfPageLinks);
			}
		
		public parseIndexEntriesToProfInfos: (x: any, y: any) => void = (err, dom)=>{
			var $ = dom.$;
			if(err){
				console.log(err);
			}
			$.each($('#content li a'),(index, value) => {
				var prof: DTO.Prof = new DTO.Prof();
				var labelString = $(value).text();
				var name = labelString.split('(')[0].split(',');
				prof.name = name[1] + name[0];
				prof.url = $(value).attr('href'); 
				prof.projectId = "CPL";
				this.profProcessor(prof);
			});
		}
		 
		public getUrlsFromIndexList: (x: any, y: any) => void =  (error, dom) => {

				var $ = dom.$; 
				console.log("start Iteration");
				var listElements =  $("#content li a");
				$.each(listElements, (index, value) => {
						this.detailLinkList[index] = $(value).attr('href');

					});
				this.linkProcessor(this.detailLinkList);
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
