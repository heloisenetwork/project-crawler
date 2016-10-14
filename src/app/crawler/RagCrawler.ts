///<reference path="HeloiseCrawler.ts"/> 
///<reference path="http/RagHttpRequester.ts"/> 
///<reference path="html/CplHeloiseParser.ts"/> 
module Crawler{
    export class RagCrawler extends HeloiseCrawler{
        private profs: DTO.ProfDto[] = [];
        private requestIndexItemsLimit:number = 50; 
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
              this.indexItems(RagItemFactory.createRagItems(dto.obj.aaData));
              this.crawlFurtherIndexPages(numberOfRequests);

            }else if(dto.type == DTO.PageType.SINGLE_INDEX){
              this.indexItems(RagItemFactory.createRagItems(dto.obj.aaData));
            }else if(dto.type == DTO.PageType.DETAIL){
            //  this.updateDetailsOf(dto.profDto,dto.body);
            }
	    }

        public crawlIndex(){
		    this.requester.requestIndexPage();
	    }

        private crawlFurtherIndexPages(numberOfRequests: number, site:number = 1){
            if(numberOfRequests > 0 ){
                this.requester.requestIndexPage(site);
                setTimeout(() => {this.crawlFurtherIndexPages(--numberOfRequests, ++site);},3000);
		        console.info("processe Index Page: " + numberOfRequests);
            }
        }

        private indexItems(ragItems: Array<RagItem>):void{
            
            if(ragItems.length > 0 ){
                this.requester.postToEs(ragItems.shift());
                
                setTimeout(() => {this.indexItems(ragItems);},2000);
            }
            
        }

    }

    class RagItem extends DTO.ProfDto{
       public constructor( public id: string, public firstName: string, public lastName: string){
           super();
       };
    } 

    class RagItemFactory{
        public static createRagItems(arrayOfRawItems: any): Array<RagItem>{
            let ragItems: Array<RagItem> = [];
            let i = 0;
            while(arrayOfRawItems.length > 0){
                let currItem: any = arrayOfRawItems.shift();
                ragItems[i] = new RagItem(currItem.main_id, currItem.pers_first_name1,currItem.pers_norm_name);
                i++;
            }
           
            return ragItems;
        }
    }
}