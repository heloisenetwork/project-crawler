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

	export enum PageType{INDEX,DETAIL};

	class HTTPGetter extends Observable{
		private request	= require('request');
		private indexPage: string;
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
	
	}
	
	export class CPLGetter extends HTTPGetter{
		/**
		The Constructor - instantiates with indexPage of CPL
		*/
		constructor(){
			super("http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste.html");
		}
	}
	
}
