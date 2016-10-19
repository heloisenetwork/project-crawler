module Configuration{
	
	export class UrlConfiguration{
		
	/*URL to Elasticsearch. If the app is started by docker-compose and links to a project called "elasticsearch" just luse "elasticsearch:port/indexName" inhere.*/
	public static ELASTICSEARCH_URL:string = "http://localhost:9200/heloise/";

		public static CPL_URL:string = "http://www.uni-leipzig.de";
		public static CPL_INDEXPAGE_URL:string = UrlConfiguration.CPL_URL + "/unigeschichte/professorenkatalog/gesamtliste/seite1.html";
		public static CPL_INDEXPAGE_PREFIX: string = UrlConfiguration.CPL_URL + "/unigeschichte/professorenkatalog/gesamtliste/seite";
		public static CPL_INDEXPAGE_SUFFIX: string = ".html";
		public static RAG_URL:string = "http://www.rag-online.org//index.php";
		public static RAG_SEARCH_URL:string = UrlConfiguration.RAG_URL + "?option=com_person1&task=sucheAjax&view=json&layout=json";
	}
}
