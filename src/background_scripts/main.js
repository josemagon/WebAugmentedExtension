
class BackgroundExtension{

    constructor(){
        console.log("Background created.");
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

    showResultsList(){
        console.log("Showing results list.");
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

// var startBackground = function() {
// 	var background = new BackgroundExtension();

// 	browser.browserAction.onClicked.addListener(() => {
//           background.showResultsList();
// 	});

// 	browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 		console.log("[background-side] calling the message: " + request.call);
// 		if(background[request.call]){
// 			sendResponse({reponse: background[request.call](request.args)});
// 		}
// 	});
// }
  
browser.runtime.onMessage.addListener(handleMessage);