///<reference path="http/HTTPGetter.ts"/> 
///<reference path="html/HtmlParser.ts"/> 

interface Indicator{
	indicate(); 
	postToEs();
}

class IndicatorCPL implements HTTPGetter.Observer, Indicator {
	
	indicate(): void {
		var cplGetter : HTTPGetter.CPLGetter = new HTTPGetter.CPLGetter(); 
		cplGetter.registerObserver(this); 
		cplGetter.doGet();
	}
	
	postToEs(){}
	
	update(html: HTTPGetter.HtmlDto):void {
		if(html.type == HTTPGetter.PageType.INDEX){
			this.parseIndex(html.body);
		}
	}
	
	private parseIndex(body: string){
		var parser : HtmlParser.CPLHtmlParser = new HtmlParser.CPLHtmlParser(body);
		parser.getContent();
	}
}
var indicator = new IndicatorCPL();
indicator.indicate();
