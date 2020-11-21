

class SearchEngine{

    searchURL;
    hostName;
    resultSelector; //Google = .rc, DuckDuckGo = .result, Bing = .b_algo
    icon;

    constructor(aURL, aHostname, aSelector){
        this.searchURL = aURL;
        this.hostName = aHostname;
        this.resultSelector = aSelector;

        if (this.isMyEngine()){
            this.createMashup();
            this.createIconsDiv();
        }
    }

    createIconsDiv(){
        var results = $(this.resultSelector);
        for (let index = 0; index < results.length; index++) {
            const element = results[index];

            var new_result = this.createResultFrom(element);

            $(element).append(this.createButton(new_result));
        }
        this.iconsDivReady();   
    }

<<<<<<< HEAD
    askPeers(){
        var augmentedDivs = $(".augmented-icons-results");
        for (let index = 0; index < augmentedDivs.length; index++) {
            const element = augmentedDivs[index];
            var boton = $("<span style=\"width: 50px; height: 50px; border: 1px solid black; border-radius: 100%;\">X de X</span>");
            $(element).append(boton);
            
            var aDiv = boton[0].parentElement;
            var texto = $(aDiv).attr("data-title");
            var target = $(aDiv).attr("data-targeturl");
            browser.runtime.sendMessage({
                "message":"askPeers",
                "args":{
                    "resultSelector": this.resultSelector,
                    "searchURL": this.searchURL,
                    "text" : texto
                }
            });
        }
    }

    addPeerResult(msg){
        var resultnumber = this.getResultNumber(msg.results, target);
        var cantidad_encontrados = 0;
        if(resultnumber > 0){ //sí lo obtuvo este peer
            cantidad_encontrados++;
        }
        $("span#p2p-result-"+msg.i).text(cantidad_encontrados + " de X");
    }

=======
>>>>>>> 371a0d1365a399b4dba7b8f968891b0fa86af188
    createButton(aResult){
        return $("<div class=\"augmented-icons-results\" data-title=\""+aResult.getText()+"\" data-targeturl=\""+aResult.getTargetURL()+"\"></div>");
    }

    iconsDivReady(){
        browser.runtime.sendMessage({
            "message":"iconsDivReady",
            "args":{}
        });
    }

    createResultFrom(anHTMLElement){
        //abstract
    }

    addToMashup(aResult, aPosition){
        var resultsPosition = $("#mashupdiv > div.mashup-pos-" + aPosition);
        if (resultsPosition.length == 0){
            $("#mashupdiv").append("<div class=\"mashup-pos-"+aPosition+"\"><h2>"+aPosition+"</h2></div>");
            $("#mashupdiv > div.mashup-pos-" + aPosition).append("<p> <strong>" + this.hostName + "</strong>: " + aResult.getText() + " </p>");
        }else{
            $(resultsPosition[0]).append("<p> <strong>" + this.hostName + "</strong>: " + aResult.getText() + " </p>");
        }
    }

    addOwnMashup(){
        browser.runtime.sendMessage({
            "message":"getResultsFor",
            "args":{
                "resultSelector": this.resultSelector,
                "searchURL": this.searchURL,
                "text" : this.getQueryString()
            }
        }).then(data => {
            var results = $(data);
            for (let index = 0; index < results.length; index++) {
                const resulthtml = results[index];
                var result = this.createResultFrom(resulthtml);
                this.addToMashup(result, index+1);
            }

            if (results.length == 0){ //no results for this query
                $("#mashupdiv").prepend("<p style=\"color:red;\">" + this.getQueryString() + " not found at " + this.hostName + " OR too many requests. May be try again later?</p>");
            }
        });
    }

    setIcon(){
        //abstract
    }

    createMashup(){
        this.createMashupDiv();
        var myresults = $(this.resultSelector);
        for (let index = 0; index < myresults.length; index++) {
            const result = this.createResultFrom(myresults[index]);
            this.addToMashup(result,index+1);
        }
    }

    createMashupDiv(){
        //the modal to show the mashup results when the action button is clicked.
<<<<<<< HEAD
        $("body").prepend("<div id=\"mashupdiv\" style=\"overflow-y: scroll; display:none; background-color:white; height: 100%; width: 30%; position:fixed; top:0px; right:0px; z-index: 9000000000000000000; border: 1px solid gray; padding: 10px; border-radius: 6px;\"><div style=\"text-align:center;\"><img src=\"" + browser.extension.getURL("resources/webaugmented64.png") + "\" alt=\"\" height=\"50\" width=\"50\"></div><h3 style=\"text-align:center;\">Mashup <strong>" + this.getQueryString() + "</strong></h3></div>");
=======
        $("body").prepend("<div id=\"mashupdiv\" style=\"overflow-y: scroll; display:none; background-color:white; position:sticky; top:60px; right:0px; z-index:1000; width:25%; margin-left:70%; border: 1px solid gray; padding: 10px; border-radius: 6px;\"><div style=\"text-align:center;\"><img src=\"" + browser.extension.getURL("resources/webaugmented64.png") + "\" alt=\"\" height=\"50\" width=\"50\"></div><h3 style=\"text-align:center;\">Mashup <strong>" + this.getQueryString() + "</strong></h3></div>");
>>>>>>> 371a0d1365a399b4dba7b8f968891b0fa86af188
    }

    showMashupDiv(){
        if(this.isMyEngine())
            $("#mashupdiv").fadeToggle(500);
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
                "resultSelector": this.resultSelector,
                "searchURL": this.searchURL,
                "text" : texto
            }
        }).then(data => {
            //we get the news as HTML elements (one per result)
            var position = this.getResultNumber(data, target);
            //find out wich position it had on that engine
            if(position > 0){
                $(aButton).append("<span style=\"position:relative; top:-40px; right:10px; padding:5px; background: white; text-decoration:none; border-radius:100%; color:black; font-weight:bold; cursor:\">" + position + "</span>");

            }else{
                $(aButton).append("<span style=\"position:relative; top:-40px; right:10px; padding:5px; background: red; text-decoration:none; border-radius:100%; color:orange; font-weight:bold; cursor:\">-</span>");
            }
            //show it as a bubble
        });
    }

    getResultNumber(aCollection,targeturl){
        var num = 0;
        for (let index = 0; index < aCollection.length; index++) {
            const result = aCollection[index];
            // var target = targeturl.split("?")[0].toLowerCase();
            var resultTarget = $($(result).find("a")[0]).attr("href"); //convert it to a html element
            if (targeturl.toLowerCase().includes(resultTarget.toLowerCase())){
                num = index+1;
            }
        }
        return num;
    }

    isMyEngine(){
        return (window.location.host === this.hostName);
    }

    showUI(){
        if(!this.isMyEngine()){
            this.setIcon();
            this.addOwnMashup();


            var augmentedDivs = $(".augmented-icons-results");
            for (let index = 0; index < augmentedDivs.length; index++) {
                const element = augmentedDivs[index];
                var boton = $("<span href=\"#\"><img src=\"" + this.icon + "\" alt=\"\" height=\"50\" width=\"50\"></span>");
                $(element).append(boton);
                this.retrieveNews(boton[0].parentElement, boton);
            }
<<<<<<< HEAD
        }else{
            this.askPeers();
=======
>>>>>>> 371a0d1365a399b4dba7b8f968891b0fa86af188
        }
    }

}