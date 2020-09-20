

class BingEngine extends SearchEngine{

    constructor(){
        super("https://www.bing.com/search?q=", "www.bing.com", ".b_algo");
        console.log("BingEngine instanciado.");
    }

    setIcon(){
        this.icon = browser.extension.getURL("resources/bingicon.png");
    }

    createIconsDiv(){
        var bing_results = $(this.resultSelector);
        for (let index = 0; index < bing_results.length; index++) {
            const element = bing_results[index];

            var text = $(element).find("h2 > a")[0].textContent;
            var elementAnchor = $(element).find("a")[0];
            var target = $(elementAnchor).attr("href");
            
            var new_result = new Result(target, this, text);
            this.results.push(new_result);

            $(element).append(this.createButton(new_result));
        }
    }

    createButton(aResult){
        return $("<div class=\"augmented-icons-results\" data-title=\""+aResult.getText()+"\" data-targeturl=\""+aResult.getTargetURL()+"\"></div>");
    }

}

var bingengine = new BingEngine();