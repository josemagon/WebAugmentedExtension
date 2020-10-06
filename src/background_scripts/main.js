
class BackgroundExtension{

    constructor(){
        console.log("Background created.");
    }

    getCurrentTab(callback) {
		return browser.tabs.query({
			active: true,
			currentWindow: true
		});
	}

    getResultsFor(args){
        console.log("Attempting to get news from: " + args.searchURL + args.text);
        return new Promise((resolve, reject) => {
            var oReq = new XMLHttpRequest();
			oReq.onload = function(e) {
				var parser = new DOMParser();
				var doc = parser.parseFromString(oReq.response, "text/html");
                var news = doc.querySelectorAll(args.resultSelector);
                var jsonNews = [];
                news.forEach(elem => jsonNews.push(elem.innerHTML));
                resolve(jsonNews);
			};

            oReq.open("GET", args.searchURL + encodeURI(args.text));
            oReq.send();
		});
    }

    iconsDivReady(){
        this.getCurrentTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                "message": "showUI"
            });
        });
    }

    showResultsList(){
        this.getCurrentTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                "message": "showMashupDiv"
            });
        });
    }
}

var background = new BackgroundExtension();

function handleMessage(request, sender, sendResponse) {
    console.log("Message from the background script: " +
        request.message);
        var respuesta = background[request.message](request.args);
    sendResponse(respuesta);
}

browser.browserAction.onClicked.addListener(() => {
        background.showResultsList();
});
  
browser.runtime.onMessage.addListener(handleMessage);