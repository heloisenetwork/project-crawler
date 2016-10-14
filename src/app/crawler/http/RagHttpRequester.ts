///<reference path="HttpRequester.ts"/> 
///<reference path="../../config/server_config.ts"/> 
module Requester{

export class RagHttpRequester extends HttpRequester{

    private limitOfResutsPerPage:number;

    constructor(limitOfResultsPerPage: number){
		super();
		this.limitOfResutsPerPage = limitOfResultsPerPage;
        this.baseUrl = Configuration.UrlConfiguration.RAG_URL;
		this.projectId = "RAG";
		this.indexPageUrl = Configuration.UrlConfiguration.RAG_SEARCH_URL;
	}

    public requestIndexPage():void;
	public requestIndexPage(numberOfPage: number):void;
	public requestIndexPage(numberOfPage?:number):void
	{
        let formData:FormData;
        let pageType : DTO.PageType;
		if(!numberOfPage){
			formData = new FormData(0, this.limitOfResutsPerPage);
            
            pageType = DTO.PageType.INDEX;    
        }else if(typeof numberOfPage == "number"){
            formData = new FormData(numberOfPage * this.limitOfResutsPerPage, (numberOfPage++) * this.limitOfResutsPerPage);
            
            pageType = DTO.PageType.SINGLE_INDEX;
        }

        this.doUrlenCodedFormPostRequest(this.indexPageUrl,formData,pageType);
    }

}

class FormData{
    public start:number = 0;
    public limit:number = 20;
    public optionen:string[] = [];
    public argumente:string[] = [];

    /**
    * Creates Defualt FormData with limits.
    * Default Means: optionen = Nachname && argumente = *
    */ 
    public constructor(start:number, limit:number){
        this.start = start;
        this.limit = limit;
        this.optionen[0] = "Nachname";
        this.argumente[0] = "*";
    }

}

}