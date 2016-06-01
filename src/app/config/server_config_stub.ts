module Configuration{
	
	export class UrlConfiguration{
		
		/*URL to Elasticsearch. If the app is started by docker-compose and links to a project called "elasticsearch" just luse "elasticsearch:port" inhere.*/
		public static ELASTICSEARCH_URL:string = "http://elasticsearch:9200/";

		public static CPL_URL:string = "http://www.uni-leipzig.de";
		public static CPL_INDEXPAGE_URL:string = UrlConfiguration.CPL_URL + "/unigeschichte/professorenkatalog/gesamtliste/seite1.html";
		public CPL_INDEXPAGE_PREFIX: string = "http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste/seite";
		public CPL_INDEXPAGE_SUFFIX: string = ".html";
	}
}
