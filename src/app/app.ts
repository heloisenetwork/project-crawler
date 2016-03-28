///<reference path="http/HTTPGetter.ts"/> 
///<reference path="html/HtmlParser.ts"/> 
interface Indicator{
	indicate(); 
	postToEs();
}
module DTO{
export class Prof{
	name: string; 
	url: string;
	birthDate: string;
	deathDate: string;
	projectId: string;

	}
}

class IndicatorCPL implements HTTPGetter.Observer, Indicator {
	private linkList; 	
	private cplGetter : HTTPGetter.CPLGetter = new HTTPGetter.CPLGetter(); 
	 private profList : DTO.Prof[] = []; 

	indicate(): void {
		this.cplGetter.registerObserver(this); 
		this.cplGetter.doGet();
	}
	
	postToEs(){}
	
	public update(html: HTTPGetter.HtmlDto):void {
		if(html.type == HTTPGetter.PageType.INDEX){
		this.parseIndex(html.body);
		}
		if(html.type == HTTPGetter.PageType.SINGLE_INDEX){
		this.parseIndexPage(html.body);
		}
		if(html.type == HTTPGetter.PageType.DETAIL){
			this.parseDetail(html.body);
		}
	}


	private parseIndex(body:string){
		var parser : HtmlParser.CPLHtmlParser = new HtmlParser.CPLHtmlParser(body);
		parser.getNumberOfIndexPages(this.loopIndexPages);	
	}
	
	private parseIndexPage(body: string){
		var parser : HtmlParser.CPLHtmlParser = new HtmlParser.CPLHtmlParser(body);
		//parser.findDetailLinkList(this.fetchLinkList);
		parser.parseIndexToProfs(this.addToProfList);
	}
	
	private parseDetail(body:string){
		var parser : HtmlParser.CPLHtmlParser = new HtmlParser.CPLHtmlParser(body);
		parser.parseDetails(this.addToProfList);
	}


	/**
		Closures to be passed to HTML-Parser
	*/	
	private loopIndexPages = (nrOfPages: number): void =>  {
		for(var i = 1; i <= nrOfPages; i++){
			this.cplGetter.getSingleIndexPage(i);
		} 
	}
	private addToProfList = (prof: DTO.Prof): void =>  {
	 this.profList[this.profList.length] = prof;
	 console.log(this.profList[this.profList.length - 1]); 
	 console.log(" of " + this.profList.length);
	}
	
	private fetchLinkList = (arr: string[], getPages = this.getDetailPages): void =>  {
		this.linkList = arr;
		getPages();
	}

	private getDetailPages = (): void =>{
	this.linkList.forEach((element,index,array):void =>{
			this.cplGetter.getDetailPage(element); 
		});
	}
}

var indicator = new IndicatorCPL();
indicator.indicate();
