<<<<<<< HEAD
function loadUsers(event){
    console.log("LOAD USERS!");
    
}

class BackgroundExtension extends AbstractP2PExtensionBackground{

    constructor(){
        super();
        console.log("Background created.");

        this.setExtensionName("WebAugmentedExt");
        this.setExtensionId(chrome.runtime.id);
        this.connect();

        try{
            this.getQueryP2P(loadUsers, 'peers', {});
        }catch(e){
            console.log("Error al hacer el getQueryP2P peers");
            console.log(e);
        }
        
=======

class BackgroundExtension{

    constructor(){
        console.log("Background created.");
>>>>>>> 371a0d1365a399b4dba7b8f968891b0fa86af188
    }

    getCurrentTab(callback) {
		return browser.tabs.query({
			active: true,
			currentWindow: true
		});
<<<<<<< HEAD
    }
    
    processRequest(msg, peer){
        // if(msg.type == "results"){
        //     console.log("Got some results:");
        //     console.log(msg.results);
        //     this.getCurrentTab().then((tabs) => {
        //         browser.tabs.sendMessage(tabs[0].id, {
        //             "message": "showUI"
        //         });
        //     });
        // }

        // if( msg.type == "consulta"){
        //     var myresults = this.getResultsFor(msg);
        //     this.sendResponse({
        //         type:'results',
        //         status:true,
        //         automatic:false,
        //         results : myresults
        //     },peer);
        // }
        console.log("processRequest");
    }

    receiveResponse(msg, peer){
        
        console.log("receiveResponse");
    }

    processResponse(msg, peer){
        console.log("processResponse");
    }

    askPeers(args){

        // for (let index = 0; index < users.length; index++) {
        //     const element = users[index];
        //     this.sendRequest({
        //         type: "consulta",
        //         args : args
        //     });
        // }
        console.log("Mandar a los peers a que busquen " + args.searchURL + args.text);
        return true;
    }

    loadUsers(event){
        var users = this.getDataCallBack();
        console.log("USERS P2P: ");
        console.log(users);
    }
=======
	}
>>>>>>> 371a0d1365a399b4dba7b8f968891b0fa86af188

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