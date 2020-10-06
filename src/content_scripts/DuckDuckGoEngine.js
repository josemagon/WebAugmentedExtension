

class DuckDuckGoEngine extends SearchEngine{

    constructor(){
        super("https://html.duckduckgo.com/html/?q=", "duckduckgo.com", ".result");
    }


    setIcon(){
        this.icon = browser.extension.getURL("resources/duckduckgoicon.png");
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
    
    createIconsDiv(){
        setTimeout(() => { //duckduckgo needs a little delay, body takes time to fully load
            var results = $(this.resultSelector);
            for (let index = 0; index < results.length; index++) {
                const element = results[index];

                var new_result = this.createResultFrom(element);

                if(new_result.getTargetURL() !== "") //double check if it s a result
                    $(element).after(this.createButton(new_result));
            }
            this.iconsDivReady();
        }, 3000);   
    }

    createMashup(){
        setTimeout(() => { //we need to wait for body to be fully loaded
            this.createMashupDiv();
            var myresults = $(this.resultSelector);
            for (let index = 0; index < myresults.length; index++) {
                const result = this.createResultFrom(myresults[index]);

                if(result.getTargetURL() !== "") //double check if it s a result
                    this.addToMashup(result,index+1);
            }
        }, 4000);

    }

}

var duckduckgoengine = new DuckDuckGoEngine();

browser.runtime.onMessage.addListener((request, sender) => {

    console.log("[content-side] calling the message: " + request.message);
    duckduckgoengine[request.message]();
});