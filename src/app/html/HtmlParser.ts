///<reference path="../../typings/htmlparser2/htmlparser2.d.ts"/>

module HtmlParser{

	export class CPLHtmlParser{
		private  htmlparser = require('htmlparser2');
		private parser; 
		private html: string; 
		/**
		The Constructor
		*/
		constructor(html: string){
			this.parser = this.htmlparser.Parser({});
			this.html = html;
		}	

		getContent(){
		 	console.log(this.html);
			console.log(this.parser.write(this.html));

			}
		}
} 
