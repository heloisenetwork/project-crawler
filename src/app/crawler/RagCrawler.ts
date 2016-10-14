///<reference path="HeloiseCrawler.ts"/> 
///<reference path="http/RagHttpRequester.ts"/> 
///<reference path="html/CplHeloiseParser.ts"/> 
module Crawler{
    export class RagCrawler extends HeloiseCrawler{
        private profs: DTO.ProfDto[] = [];
        private requestIndexItemsLimit:number = 10; 
        constructor(){
            super();
            this.requester = new Requester.RagHttpRequester(this.requestIndexItemsLimit);
            this.requester.registerObserver(this);
            //this.parser = new Parser.CplHeloiseParser();
        }

        public update(dto: DTO.JsonDto):void{
            if(dto.type == DTO.PageType.INDEX){
              console.log(typeof dto.obj);
              let numberOfResults:number = dto.obj["iTotalDisplayRecords"];
              let numberOfRequests = Math.floor(numberOfResults / this.requestIndexItemsLimit);
              console.log(numberOfResults + " : " + numberOfRequests);
              this.crawlFurtherIndexPages(numberOfRequests);

            }else if(dto.type == DTO.PageType.SINGLE_INDEX){
              console.log(dto.obj);
            }else if(dto.type == DTO.PageType.DETAIL){
            //  this.updateDetailsOf(dto.profDto,dto.body);
            }
	    }

        public crawlIndex(){
		    this.requester.requestIndexPage();
	    }

        private crawlFurtherIndexPages(numberOfRequests: number){
            if(numberOfRequests > 0 ){
                //this.requester.requestIndexPage(index);
                setTimeout(() => {this.crawlFurtherIndexPages(--numberOfRequests);},3000);
		        console.info("processe Index Page: " + numberOfRequests);
            }
        }

    } 
}