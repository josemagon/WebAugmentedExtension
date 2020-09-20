
class GoogleEngine extends SearchEngine{

    constructor(){
        super("https://google.com/search?q=", "www.google.com", ".rc");
        console.log("GoogleEngine instanciado.");
    }


    setIcon(){
        // this.icon = "https://img-authors.flaticon.com/google.jpg";
        this.icon = browser.extension.getURL("resources/googleicon.jpg");
    }

    createIconsDiv(){
        var google_results = $(this.resultSelector);
        for (let index = 0; index < google_results.length; index++) {
            const element = google_results[index];

            var elementAnchor = $(element).find("a")[0];
            var text = $(element).find("h3")[0].textContent;
            var target = $(elementAnchor).attr("href");

            var new_result = new Result(target, this, text);
            this.results.push(new_result);

            $(element).append(this.createButton(new_result));
        }
    }

    createButton(aResult){
        return $("<div class=\"augmented-icons-results\" data-title=\""+aResult.getText()+"\" data-targeturl=\""+aResult.getTargetURL()+"\" style=\"position:absolute; top:0px;right:0px;\"></div>");
    }

}

var googleengine = new GoogleEngine();