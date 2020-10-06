class BingEngineTest extends SearchEngineTest{
    constructor(){
        super("https://www.bing.com/search?q=", "www.bing.com", ".b_algo");
    }

    createResultFrom(anHTMLElement){
        var text = $(anHTMLElement).find("a")[0].textContent;
        var elementAnchor = $(anHTMLElement).find("a")[0];
        var target = $(elementAnchor).attr("href");

        return new Result(target, this, text);
    }
}

var bingenginetest = new BingEngineTest();
bingenginetest.testRetrieveNews();