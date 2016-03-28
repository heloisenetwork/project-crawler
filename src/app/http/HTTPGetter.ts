///<reference path="../../typings/request/request.d.ts"/>

module HTTPGetter{
	
	export interface Observer{
		update(arg:any);
	}

	class Observable{
		private observers : Observer [];
		
		constructor() {
			this.observers = [];
		}

		registerObserver (observer : Observer) : void {
			this.observers.push(observer);
		}

    removeObserver (observer : Observer) : void {
		  this.observers.splice(this.observers.indexOf(observer), 1);
		}

		notifyObservers (arg : any) : void {

		this.observers.forEach((observer : Observer)=> {
			observer.update(arg);
		});
		}
	}

	export class HtmlDto{
		constructor(public type:PageType, public body:string){}
	}

	export enum PageType{INDEX,DETAIL,SINGLE_INDEX};

	class HTTPGetter extends Observable{
		private request	= require('request');
		private indexPage: string;
		protected baseUrl : string; 
		/**
		The Constructor
		*/
		constructor(indexPage: string){
			super();
			this.indexPage = indexPage; 
		}	

		public doGet(){
			this.request(this.indexPage, (error, response, body) =>  {
				var htmlDto = new HtmlDto(PageType.INDEX, body);
				super.notifyObservers(htmlDto);
			});
		}

		public getDetailPage(url: string){
			this.request(this.getBaseUrl() + url , (error, response, body) =>  {
				var htmlDto = new HtmlDto(PageType.DETAIL, body);
				super.notifyObservers(htmlDto);
			});
			
		}
	
		protected setBaseUrl(baseUrl:string){
			this.baseUrl = baseUrl; 
		}
	
		protected getBaseUrl(): string{
			return this.baseUrl;
		}
		protected getRequest(){
			return this.request; 
		}
	}
	
	export class CPLGetter extends HTTPGetter{
	
		/**
		The Constructor - instantiates with indexPage of CPL
		*/
		constructor(){
			super("http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste.html");
			super.setBaseUrl("http://www.uni-leipzig.de");
			}

		public getSingleIndexPage(nr: number, nrOfAttempts:number = 1){
			super.getRequest()("http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste/seite" + nr + ".html", (error, response, body) =>  {
				if(error){
					console.log("Number of Attempts: " + nrOfAttempts);
					console.log(error);
					if(nrOfAttempts < 11){
						this.getSingleIndexPage(nr, nrOfAttempts++);
					}
				}else{
					var htmlDto = new HtmlDto(PageType.SINGLE_INDEX, body);
					super.notifyObservers(htmlDto);
				}
			});
		}
	}
	
}
