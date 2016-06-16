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
		/*this.restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin')
		 	this.restify.CORS.ALLOW_HEADERS.push('accept');
	    this.restify.CORS.ALLOW_HEADERS.push('sid');
		  this.restify.CORS.ALLOW_HEADERS.push('lang');
		  this.restify.CORS.ALLOW_HEADERS.push('origin');
		  this.restify.CORS.ALLOW_HEADERS.push('withcredentials');
			this.restify.CORS.ALLOW_HEADERS.push('X-Requested-With');*/		 
			this.restServer.use(this.allowCrossDomain);

			this.restServer.get('cpl/index', this.crawlCplIndex);
			this.restServer.get('cpl/details', this.crawlCplDetails);
			
			this.restServer.listen(8666);
		}
		private allowCrossDomain = (req, res, next) => {
		  res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
					 
			next();
		};
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
