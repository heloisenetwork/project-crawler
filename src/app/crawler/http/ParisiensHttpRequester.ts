///<reference path="HttpRequester.ts"/> 
module Requester{

export class ParisiensHttpRequester extends HttpRequester{

    constructor(){
		super();
		this.projectId = "PAR";
	}
}

}