///<reference path="../../typings/htmlparser2/htmlparser2.d.ts"/>
var HtmlParser;
(function (HtmlParser) {
    var CPLHtmlParser = (function () {
        /**
        The Constructor
        */
        function CPLHtmlParser(html) {
            this.htmlparser = require('htmlparser2');
            this.parser = this.htmlparser.Parser({});
            this.html = html;
        }
        CPLHtmlParser.prototype.getContent = function () {
            console.log(this.html);
            console.log(this.parser.write(this.html));
        };
        return CPLHtmlParser;
    }());
    HtmlParser.CPLHtmlParser = CPLHtmlParser;
})(HtmlParser || (HtmlParser = {}));
