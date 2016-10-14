///<reference path="HeloiseCrawler.ts"/> 
///<reference path="http/RagHttpRequester.ts"/> 
///<reference path="html/CplHeloiseParser.ts"/> 
module Crawler{
    export class RagCrawler extends HeloiseCrawler{
        private profs: DTO.ProfDto[] = [];

        constructor(){
            super();
            this.requester = new Requester.RagHttpRequester(50);
            this.requester.registerObserver(this);
            //this.parser = new Parser.CplHeloiseParser();
        }

        public update(dto: DTO.JsonDto):void{
            if(dto.type == DTO.PageType.INDEX){
              console.log(dto.obj);
            }else if(dto.type == DTO.PageType.SINGLE_INDEX){
              console.log(dto.obj);
            }else if(dto.type == DTO.PageType.DETAIL){
            //  this.updateDetailsOf(dto.profDto,dto.body);
            }
	    }

        public crawlIndex(){
		    this.requester.requestIndexPage();
	    }

    } 
}