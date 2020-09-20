//DEBUG THIS WILL BE INSIDE THE CLASS

function debugNews(aDiv, aURL, aSelector, aButton){
    var texto = $(aDiv).attr("data-title");
    var target = $(aDiv).attr("data-targeturl");
    browser.runtime.sendMessage({
        "message":"getResultsFor",
        "args":{
            "resultSelector": aSelector,
            "searchURL": aURL,
            "text" : texto
        }
    }).then(data => {
        //we get the news as HTML elements (one per result)
        var position = debugGetResultNumber(data, target);
        //find out wich position it had on that engine
        if(position > 0){
            $(aButton).append("<span style=\"position:relative; top:-40px; right:10px; padding:5px; background: white; text-decoration:none; border-radius:100%; color:black; font-weight:bold; cursor:\">" + position + "</span>");
        }else{
            $(aButton).append("<span style=\"position:relative; top:-40px; right:10px; padding:5px; background: red; text-decoration:none; border-radius:100%; color:orange; font-weight:bold; cursor:\">-</span>");
        }
        //show it as a bubble
    });
}


function debugGetResultNumber(aCollection,targeturl){
    var num = 0;
    for (let index = 0; index < aCollection.length; index++) {
        const result = aCollection[index];
        // var target = targeturl.split("?")[0].toLowerCase();
        var resultTarget = $($(result).find("a")[0]).attr("href"); //convert it to a html element
        console.log("comparando " + resultTarget + " con " + targeturl);
        if (targeturl.toLowerCase().includes(resultTarget.toLowerCase())){
            num = index+1;
        }
    }
    return num;
}

//DEBUG

class SearchEngine{

    searchURL;
    hostName;
    resultSelector; //Google = .rc, DuckDuckGo = .result, Bing = .b_algo
    icon;
    results;

    constructor(aURL, aHostname, aSelector){
        this.searchURL = aURL;
        this.hostName = aHostname;
        this.resultSelector = aSelector;
        this.results = [];

        this.createIconsDiv();

        if(!this.isMyEngine()){
            //show the engine's logo and its results.
            //if we were already at the engine's page, then there s no need to
            //render any UI, the user is already looking at the results.
            this.setIcon();
            this.showUI();
        }
    }

    createIconsDiv(){
        //abstract
    }

    setIcon(){
        //abstract
    }

    getQueryString(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var query = url.searchParams.get("q");
        return query;
    }

    retrieveNews(aDiv, aButton){
        var texto = $(aDiv).attr("data-title");
        var target = $(aDiv).attr("data-targeturl");
        browser.runtime.sendMessage({
            "message":"getResultsFor",
            "args":{
                "searchURL": this.searchURL,
                "text": texto,
                "resultSelector":this.resultSelector
            }
        }).then(function(data){
            // if(data.response > 0){
            //     $(theButton).append("<span style=\"position:relative; top:-40px; right:10px; padding:5px; background: white; text-decoration:none; border-radius:100%; color:black; font-weight:bold; cursor:\">" + data.response + "</span>");
            // }else{
            //     $(theButton).append("<span style=\"position:relative; top:-40px; right:10px; padding:5px; background: red; text-decoration:none; border-radius:100%; color:orange; font-weight:bold; cursor:\">-</span>");
            // }
            console.log(data);
        }).catch(function(error){
            console.log(error);
        });
    }

    isMyEngine(){
        return (window.location.host === this.hostName);
    }

    showUI(){
        var augmentedDivs = $(".augmented-icons-results");
        for (let index = 0; index < augmentedDivs.length; index++) {
            const element = augmentedDivs[index];
            var boton = $("<span href=\"#\"><img src=\"" + this.icon + "\" alt=\"\" height=\"50\" width=\"50\"></span>");
            $(element).append(boton);
            // this.showResults($(boton)[0].parentElement, boton, this.results[index]);
            // this.retrieveNews($(boton)[0].parentElement, boton);


            //DEBUG
            var engine = this;
            $(boton).click(function(e){
                debugNews($(this)[0].parentElement, engine.searchURL, engine.resultSelector, $(this));
            });
            //DEBUG
        }
        
    }

}

browser.runtime.onMessage.addListener((request, sender) => {

    console.log("[content-side] calling the message: " + request.message);
});