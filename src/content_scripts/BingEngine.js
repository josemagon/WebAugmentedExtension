
class BingEngine extends SearchEngine{

    constructor(){
        super("https://www.bing.com/search?q=", "www.bing.com", ".b_algo");
        console.log("BingEngine instanciado.");
    }

    setIcon(){
        this.icon = browser.extension.getURL("resources/bingicon.png");
    }
    
    createResultFrom(anHTMLElement){
        var text = $(anHTMLElement).find("a")[0].textContent;
        var elementAnchor = $(anHTMLElement).find("a")[0];
        var target = $(elementAnchor).attr("href");

        return new Result(target, this, text);
    }

}

var bingengine = new BingEngine();

browser.runtime.onMessage.addListener((request, sender) => {

    console.log("[content-side] calling the message: " + request.message);
    bingengine[request.message]();
});