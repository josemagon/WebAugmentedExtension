
class DuckDuckGoEngineTest extends SearchEngineTest{
    constructor(){
        super("https://html.duckduckgo.com/html/?q=", "duckduckgo.com", ".result");
    }

    createResultFrom(anHTMLElement){
        var text = "";
        var elementAnchor = "";
        var target = "";

        if ($(anHTMLElement).find("h2").length > 0){ //it is indeed a result and not the "more" button
            var text = $(anHTMLElement).find("h2")[0].textContent;
            var elementAnchor = $(anHTMLElement).find("a")[0];
            var target = $(elementAnchor).attr("href");
        }

        return new Result(target, this, text);
        
    }
}

var duckduckgoenginetest = new DuckDuckGoEngineTest();
duckduckgoenginetest.testRetrieveNews();