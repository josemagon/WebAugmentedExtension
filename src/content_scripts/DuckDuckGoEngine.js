

class DuckDuckGoEngine extends SearchEngine{

    constructor(){
        super("https://html.duckduckgo.com/html/?q=", "duckduckgo.com", ".result");
        console.log("DuckDuckGo instanciado.");
    }


    setIcon(){
        this.icon = browser.extension.getURL("resources/duckduckgoicon.png");
    }

    createResultFrom(anHTMLElement){
        var text = $(anHTMLElement).find("h2 > a")[0].textContent;
        var elementAnchor = $(anHTMLElement).find("a")[0];
        var target = $(elementAnchor).attr("href");

        return new Result(target, this, text);
    }

    createButton(aResult){
        return $("<div class=\"augmented-icons-results\" data-targeturl=\""+aResult.getTargetURL()+"\" data-title=\""+aResult.getText()+"\"></div>");
    }

}

var duckduckgoengine = new DuckDuckGoEngine();

browser.runtime.onMessage.addListener((request, sender) => {

    console.log("[content-side] calling the message: " + request.message);
    duckduckgoengine[request.message]();
});