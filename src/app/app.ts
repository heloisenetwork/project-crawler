///<reference path="http/HTTPGetter.ts"/> 
///<reference path="html/HtmlParser.ts"/> 
interface Indicator{
	indicate(); 
	postToEs();
}
module DTO{
export class Prof{
	name: string; 

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
		if(html.type == HTTPGetter.PageType.DETAIL){
			this.parseDetail(html.body);
		}
	}
	
	private parseIndex(body: string){
		var parser : HtmlParser.CPLHtmlParser = new HtmlParser.CPLHtmlParser(body);
		parser.findDetailLinkList(this.fetchLinkList);

	}
	
	private parseDetail(body:string){
		var parser : HtmlParser.CPLHtmlParser = new HtmlParser.CPLHtmlParser(body);
		parser.parseDetails(this.addToProfList);
	}

	private addToProfList = (prof: DTO.Prof): void =>  {
	 this.profList[this.profList.length] = prof;
	 console.log(this.profList);
	}

	/**
		Closure to be passed to HTML-Parser
	*/	
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
