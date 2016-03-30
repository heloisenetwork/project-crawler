module DTO{

	export class HtmlDto{
		constructor(public type:PageType, public body:string){}
	}

export class ProfDto{
	name: string; 
	url: string;
	birthDate: string;
	deathDate: string;
	projectId: string;

	}
	
export enum PageType{INDEX,DETAIL,SINGLE_INDEX};
} 

module Observer{
	export interface Observer{
		update(arg:any);
	}

	export class Observable{
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
}
