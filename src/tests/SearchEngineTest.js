class SearchEngineTest{
    constructor(aURL, aHostname, aSelector){
        this.searchURL = aURL;
        this.hostName = aHostname;
        this.resultSelector = aSelector;
    }

    testRetrieveNews(){
        //first we try with a query we know shouldnt be in the first page
        this.getNoResults("Timothee Chalamet");
        this.getResultNumber1("simple wikipedia Argentina");
    }

    getNoResults(unintelligibleQuery){
        browser.runtime.sendMessage({
            "message":"getResultsFor",
            "args":{
                "resultSelector": this.resultSelector,
                "searchURL": this.searchURL,
                "text" : unintelligibleQuery
            }
        }).then(data => {
            var resultPosition = this.getResultNumber(data, "https://heroichollywood.com/timothee-chalamet-robin-the-batman-robert-pattinson-design-pic/"); //it wont find this result in the first page
            if(resultPosition == 0){
                console.log(this.hostName + " Test [PASSED] getNoResults");
            }else{
                console.log(this.hostName + " Test [FAILED] getNoResults")
            }
                
        });
    }

    getResultNumber1(aQueryWeKnowWillBeFirst){
        browser.runtime.sendMessage({
            "message":"getResultsFor",
            "args":{
                "resultSelector": this.resultSelector,
                "searchURL": this.searchURL,
                "text" : aQueryWeKnowWillBeFirst
            }
        }).then(data => {
            var resultPosition = this.getResultNumber(data, "https://simple.wikipedia.org/wiki/Argentina");
            if(resultPosition == 1){
                console.log(this.hostName + "TEST [PASSED] getResultNumber1");
            }else{
                console.log(this.hostName + "TEST [FAILED] getResultNumber1");
            }
                
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

    getAnyResults(){

    }
}