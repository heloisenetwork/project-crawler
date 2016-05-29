///<reference path="../typings/restify/restify.d.ts" />

module Server{
	export class RestCommander{
		private restify = require('restify');
		private restServer ;
		
		constructor(){
			this.restServer = this.restify.createServer({
				name: 'Heloise Crawler Commander'
				});
				this.init();
		}
		
		private init(): void{
			
			this.restServer.get('cpl/index', this.crawlCplIndex);
			
			this.restServer.listen(8666);
		}
		private crawlCplIndex = (req, res, next)=>{
		
			res.header("Access-Control-Allow-Origin", "*");
	 		res.header("Access-Control-Allow-Headers", "X-Requested-With");	
			var crawler = new Crawler.CplHeloiseCrawler();
			crawler.crawlIndex();
			res.status(200);
			res.send({state:'ok',message:'crawling started'});
			return next();
		}
	}
}
