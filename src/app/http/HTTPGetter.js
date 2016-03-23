///<reference path="../../typings/request/request.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPGetter;
(function (HTTPGetter_1) {
    var HTTPGetter = (function () {
        /**
        The Constructor
        */
        function HTTPGetter(indexPage) {
            this.request = require('request');
            this.indexPage = indexPage;
        }
        HTTPGetter.prototype.doGet = function () {
            this.request(this.indexPage, function (error, response, body) {
                this.bd = body;
            });
            return this.bd;
        };
        return HTTPGetter;
    }());
    var CPLGetter = (function (_super) {
        __extends(CPLGetter, _super);
        /**
        The Constructor - instantiates with indexPage of CPL
        */
        function CPLGetter() {
            _super.call(this, "http://www.uni-leipzig.de/unigeschichte/professorenkatalog/gesamtliste.html");
        }
        return CPLGetter;
    }(HTTPGetter));
    HTTPGetter_1.CPLGetter = CPLGetter;
})(HTTPGetter || (HTTPGetter = {}));
