
class GoogleEngine extends SearchEngine{

    constructor(){
        super("https://google.com/search?q=", "www.google.com", ".rc");
    }


    setIcon(){
        this.icon = browser.extension.getURL("resources/googleicon.jpg");
    }

    createResultFrom(anHTMLElement){
        var elementAnchor = $(anHTMLElement).find("a")[0];
        var text = $(anHTMLElement).find("h3")[0].textContent;
        var target = $(elementAnchor).attr("href");

        return new Result(target, this, text);
    }

    createButton(aResult){
        return $("<div class=\"augmented-icons-results\" data-title=\""+aResult.getText()+"\" data-targeturl=\""+aResult.getTargetURL()+"\" style=\"position:absolute; top:0px;right:0px;\"></div>");
    }

}

var googleengine = new GoogleEngine();

browser.runtime.onMessage.addListener((request, sender) => {

    console.log("[content-side] calling the message: " + request.message);
    googleengine[request.message]();
});