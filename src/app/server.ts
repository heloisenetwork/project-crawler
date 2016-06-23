///<reference path="../typings/restify/restify.d.ts" />
///<reference path="../typings/express/express.d.ts" />
///<reference path="../typings/multer/multer.d.ts" />
///<reference path="config/uploadStorage.ts" />
///<reference path="crawler/ParisiensCrawler.ts" />

module Server{
					
	export class UploadServer{
		private express = require('express');
		private multer = require('multer');
		private server; 
		private csvUpload:any;
		constructor(){
				this.server = this.express();
				this.init();
		}

		private init(): void{
			var storage = this.multer.diskStorage({
				destination: Configuration.UploadConfiguration.HELOISE_UPLOAD_DIR, 
				filename : function(req, file,cb){
					cb(null,  Configuration.UploadConfiguration.FILE_NAME);
				}
			});

			this.csvUpload = this.multer({storage:storage}).single('fileToLoad');

			this.server.use(this.csvUpload);
			this.server.post('/upload', this.uploadFile);
			
			this.server.listen(8667);
		}

		private uploadFile = (req, res, next) => {
			console.log(req.file);
			
			let crawler = new Crawler.ParisiensCrawler();
			crawler.crawlIndex();
			
			res.status(200).send('Your Upload succeded. The Crawling of it starts instantly. Go back to your main site <a href="'+Configuration.UploadConfiguration.REDIRECT_URL+'">here</a>');
			return next();
					
		}


	}

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
			//this.restServer.post('/upload', this.uploadFile);
			
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
		private uploadFile = (req, res, next) => {
			console.log(req);
			console.log(res);
			return next();			
		}
	}
}
