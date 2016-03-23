///<reference path="http/HTTPGetter.ts"/> 
///<reference path="html/HtmlParser.ts"/> 
var getter = new HTTPGetter.CPLGetter().doGet();
var html = getter.doGet();
console.log(html);
//var cplParser = new HtmlParser.CPLHtmlParser(html);
//cplParser.getContent();
