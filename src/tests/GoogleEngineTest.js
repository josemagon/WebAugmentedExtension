class GoogleEngineTest extends SearchEngineTest{
    constructor(){
        super("https://google.com/search?q=", "www.google.com", ".rc");
    }

    createResultFrom(anHTMLElement){
        var elementAnchor = $(anHTMLElement).find("a")[0];
        var text = $(anHTMLElement).find("h3")[0].textContent;
        var target = $(elementAnchor).attr("href");

        return new Result(target, this, text);
    }
}

var googleenginetest = new GoogleEngineTest();
googleenginetest.testRetrieveNews();