
class BackgroundExtension extends AbstractP2PExtensionBackground{

    mypeers;

    constructor(){
        super();
        console.log("Background created.");

        this.setExtensionName("WebAugmentedExt");
        this.setExtensionId(chrome.runtime.id);
        this.connect();

        this.loadPeers();
    }

    getCurrentTab(callback) {
		return browser.tabs.query({
			active: true,
			currentWindow: true
		});
    }

    setMypeers(somePeers){
        this.mypeers = somePeers;
        console.log("peers refreshed");
        console.log(this.mypeers);
    }

    loadPeers(){
        setTimeout(() => {
            this.getQueryP2P(loadPeers, 'peers', {});
            //el evento callback no puede ser del objeto, porque no se envía junto con el objeto.
            //nosotros mandamos loadUsers() y luego eso lo llamamos y es independiente del objeto.
            //Por ende, debemos preguntarle al objeto desde afuera por su DataCallBack. NO al objeto mismo.
        }, 5000);
    }
    
    processRequest(msg, peer){

        if( msg.type == "consulta"){
            console.log("[ProcessRequest] msg: ");
            console.log(msg);
            // var myresults = this.getResultsFor(msg);
            this.getResultsFor(msg.args).then(data =>{
                this.sendResponse({
                    type:'results',
                    status:true,
                    automatic:false,
                    results : data,
                    i: msg.args.i,
                    target: msg.args.target
                },peer);
            });
            
        }

        if (msg.type == 'hello'){
            console.log("Me estan saludando desde: ");
            console.log(peer);
            this.sendResponse({
                type:'helloreply',
                status:true,
                automatic:false
            },peer);
        }
        
    }

    receiveResponse(msg, peer){
        console.log("receiveResponse");
        if (msg.type == 'results'){
            console.log("Got some results:");
            
            console.log(msg);
            this.getCurrentTab().then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {
                    "message": "addPeerResult",
                    "args" : {
                        msg : msg,
                        mypeerslength : 5,
                        target: msg.target
                    }
                });
            });
        }

        if (msg.type == 'helloreply'){
            console.log("Got hello back from: ");
            console.log(peer);
        }
        
    }

    processResponse(msg, peer){
        console.log("processResponse");
    }


    enablePeers(){
        this.getCurrentTab().then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                "message": "enablePeers"
            });
        });
    }

    askPeers(args){

        for (let index = 0; index < this.mypeers.peers.length; index++) {
            const peer = this.mypeers.peers[index];
            console.log("args: ");
            console.log(args);
            this.sendRequest({
                type: "consulta",
                status:true,
                automatic:false,
                args : args
            }, peer.username);
        }
        console.log("Mandar a los peers a que busquen " + args.searchURL + args.text);
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


    mandarHello(args){
        this.loadPeers();
        for (let index = 0; index < this.mypeers.peers.length; index++) {
            const peer = this.mypeers.peers[index];
            console.log("saludando a :");
            console.log(peer);
            this.sendRequest({
                type: "hello",
                status:true,
                automatic:false
            }, peer.username);
        }
    }

}

var background = new BackgroundExtension();



function loadPeers(evt){
    try{
        let somepeers = background.getDataCallBack();
        background.setMypeers(somepeers);
        background.enablePeers();
    }catch(e){
        console.log("Error al cargar lista de usuarios");
        console.log(e);
    }
}

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