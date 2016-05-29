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
		 	this.restify.CORS.ALLOW_HEADERS.push('accept');
	    this.restify.CORS.ALLOW_HEADERS.push('sid');
		  this.restify.CORS.ALLOW_HEADERS.push('lang');
		  this.restify.CORS.ALLOW_HEADERS.push('origin');
		  this.restify.CORS.ALLOW_HEADERS.push('withcredentials');
		  this.restify.CORS.ALLOW_HEADERS.push('x-requested-with');		 
			this.restServer.use(this.restify.CORS());

			this.restServer.get('cpl/index', this.crawlCplIndex);
			this.restServer.get('cpl/details', this.crawlCplDetails);
			
			this.restServer.listen(8666);
		}
		private crawlCplIndex = (req, res, next)=>{
		
			var crawler = new Crawler.CplHeloiseCrawler();
			crawler.crawlIndex();
			res.status(200);
			res.send({state:'ok',message:'crawling started'});
			return next();
		}
		private crawlCplDetails = (req, res, next)=>{
		
			var crawler = new Crawler.CplHeloiseCrawler();
			crawler.crawlDetails();
			res.status(200);
			res.send({state:'ok',message:'crawling started'});
			return next();
		}
	}
}
