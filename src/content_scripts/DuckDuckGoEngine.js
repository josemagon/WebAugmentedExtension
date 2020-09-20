

class DuckDuckGoEngine extends SearchEngine{

    constructor(){
        super("https://duckduckgo.com/html/?q=", "duckduckgo.com", ".result");
        console.log("DuckDuckGo instanciado.");
    }


    setIcon(){
        this.icon = browser.extension.getURL("resources/duckduckgoicon.png");
    }

    // createIconsDiv(){
    //     $(".result").after("<div style=\"display:inline;\" class=\"augmented-icons-results\" data-title=\"textodelanoticia\"></div>");
    // }

    createIconsDiv(){
        var duckduckgo_results = $(this.resultSelector);
        for (let index = 0; index < duckduckgo_results.length; index++) {
            const element = duckduckgo_results[index];

            var text = $(element).find("h2 > a")[0].textContent;
            var elementAnchor = $(element).find("a")[0];
            var target = $(elementAnchor).attr("href");

            var new_result = new Result(target, this, text);
            this.results.push(new_result);

            $(element).after(this.createButton(new_result));
        }
    }

    createButton(aResult){
        return $("<div class=\"augmented-icons-results\" data-targeturl=\""+aResult.getTargetURL()+"\" data-title=\""+aResult.getText()+"\"></div>");
    }

}

var duckduckgoengine = new DuckDuckGoEngine();