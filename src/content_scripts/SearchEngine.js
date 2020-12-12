

class SearchEngine{

    searchURL;
    hostName;
    resultSelector; //Google = .rc, DuckDuckGo = .result, Bing = .b_algo
    icon;
    peersAvailable; // para saber si ya podemos usar el framework o no

    constructor(aURL, aHostname, aSelector){
        this.searchURL = aURL;
        this.hostName = aHostname;
        this.resultSelector = aSelector;
        this.peersAvailable = false;

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

            $(element).append(this.createAugmentedIconsDiv(new_result));
        }
        this.iconsDivReady();   
    }

    askPeers(){
        var augmentedDivs = $(".augmented-icons-results");
        for (let index = 0; index < augmentedDivs.length; index++) {
            const element = augmentedDivs[index];
            var boton = $("<span id=\"p2p-result-"+index+"\" style=\"width: 50px; height: 50px; border: 1px solid black; border-radius: 50px; line-height: 50px; padding:0px; display:inline-block; background-color: white;\"><span class=\"encontrados\">0</span> de <span class=\"peerslength\">0</span></span>");
            $(element).append(boton);
            
            var aDiv = boton[0].parentElement;
            var texto = $(aDiv).attr("data-title");
            var target = $(aDiv).attr("data-targeturl");

            this.sendPeersRequest("askPeers", texto,target, index);
        }
    }

    sendPeersRequest(message, texto, target, index){
        if (this.peersAvailable){
            browser.runtime.sendMessage({
                "message":message,
                "args":{
                    "resultSelector": this.resultSelector,
                    "searchURL": this.searchURL,
                    "text" : texto,
                    "i": index,
                    "target": target
                }
            });
        }else{
            console.log("cant ask peers yet");
            browser.runtime.sendMessage({
                "message":"loadPeers",
                "args":{}
            });
            setTimeout(() => {
                this.sendPeersRequest(message, texto, target, index);
            }, 5000);
        }
        
    }

    enablePeers(args){
        console.log("attempting to enable peers");
        this.peersAvailable = true;
    }

    addPeerResult(args){
        if (this.isMyEngine()){
            var resultnumber = this.getResultNumber(args.msg.results, args.target);
            var burbuja = $("#p2p-result-" + args.msg.i);
            $(burbuja).find(".peerslength").text(args.mypeerslength);
            if(resultnumber > 0){ //sí lo obtuvo este peer
                var actual = parseInt($(burbuja).find(".encontrados").text());
                actual++;
                $(burbuja).find(".encontrados").text(actual);
            }
            
        }
    }

    createAugmentedIconsDiv(aResult){
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
            var mashupentry = $("<p data-host=\"" + this.hostName + "\"> <strong>" + this.hostName + "</strong>: " + aResult.getText() + " | Posición promedio <span class=\"promedio\">0</span> (<span class=\"foundpeers\">0</span> de <span class=\"mypeerslength\">0</span>)</p>");
            $("#mashupdiv > div.mashup-pos-" + aPosition).append(mashupentry);
        }else{
            $(resultsPosition[0]).append("<p> <strong>" + this.hostName + "</strong>: " + aResult.getText() + " | Posición promedio <span class=\"promedio\">0</span> (<span class=\"foundpeers\">0</span> de <span class=\"mypeerslength\">0</span>)</p>");
        }

        var posicion_compuesta = {"i" : aPosition, "hostname": this.hostName};

        this.sendPeersRequest("askPeersMashup", aResult.getText(), aResult.getTargetURL(), posicion_compuesta);
    }


    addPeerMashup(args){
        var linea = $(".mashup-pos-" + args.msg.i).find("p[data-host=\""+args.msg.i.hostname+"\"]");
        var promedio = $(linea).find(".promedio").text();
        var foundpeers = $(linea).find(".foundpeers").text();
        var posicion = this.getResultNumber(args.msg.results, args.msg.target);
        if (posicion > 0){
            foundpeers = parseInt(foundpeers);
            foundpeers++;
            $(linea).find(".foundpeers").text(foundpeers);
        }

        $(linea).find(".mypeerslength").text(args.mypeerslength);
        
        promedio = parseInt(promedio);
        promedio = (promedio + posicion) / args.mypeerslength;
        $(linea).find(".promedio").text(promedio);
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
        $("body").prepend("<div id=\"mashupdiv\" style=\"overflow-y: scroll; display:none; background-color:white; height: 100%; width: 30%; position:fixed; top:0px; right:0px; z-index: 9000000000000000000; border: 1px solid gray; padding: 10px; border-radius: 6px;\"><div style=\"text-align:center;\"><img src=\"" + browser.extension.getURL("resources/webaugmented64.png") + "\" alt=\"\" height=\"50\" width=\"50\"></div><h3 style=\"text-align:center;\">Mashup <strong>" + this.getQueryString() + "</strong></h3></div>");
    }

    showMashupDiv(args){
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
        }else{
            this.askPeers();
        }
    }

}