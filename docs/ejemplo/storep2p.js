/*
* Copyright ragonzalez@disroot.org. Licensed under MIT
* See license text at https://mit-license.org/license.txt
*/
var url_text="";
var remoteuser="";
var jquery_link;
var popper_link;
var bootstrap_link;
var boostrap_css;
var tabActive=null;

//variables que usa el process local
//var dataTemp;
var remoteuser;
var remoteResponse=null;
var ports = [];
var portFromCS;


function loadLibrary(){
  jquery_link=chrome.runtime.getURL("lib/jquery-3.4.1.slim.min.js");
  popper_link=chrome.runtime.getURL("lib/popper.min.js");
  bootstrap_link=chrome.runtime.getURL("lib/bootstrap.min.js");
  boostrap_css=chrome.runtime.getURL("lib/bootstrap.min.css");
}

function updateActiveTab(tabs) {

  let currentTab;

  function isSupportedProtocol(urlString) {
    var supportedProtocols = ["https:", "http:", "ftp:", "file:"];
    var url = document.createElement('a');
    url.href = urlString;
    return supportedProtocols.indexOf(url.protocol) != -1;
  }

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      if (isSupportedProtocol(currentTab.url)) {
        tabActive=currentTab;
      }
    }
  }

  chrome.tabs.query({active: true, currentWindow: true}, updateTab);
  
}


class PanelScript {

        constructor(url){
                this.url_resource=chrome.extension.getURL(url);
                this.modePanel="";
        }

        setUrl(url){
                this.url_resource=url;
        }

        setMode(mode){
                this.modePanel=mode;
        }

        createWindow(){
                try {
                        let createData;
                        switch (this.modePanel){
                        case "popup":
                                 createData = {
                                              'type': "popup",
                                              'url':this.url_resource,
                                              'height': 350,
                                          'width': 300,
                                        };

                                        console.log("iniciando popup");
                                break;
                }
                return createData;
                }catch(e) {
                        console.log("Error al generar json de window");
                        console.log(e);
                }
        }

      show(){
                try {

                //console.log("Acceso open windows panel script");
                //console.log("URL: "+this.url_resource);

                if (this.modePanel==""){
                  chrome.tabs.create({
                               "url": this.url_resource
                              });
                }else{
                        console.log("solo create tabs");
                }


                } catch(e) {
                        // statements
                        console.log(e);
                }
      }

      close(){

        }
}

function getDataResultadoP2P(){
  return remoteResponse;
}

function getRemoteUser(){
	try {
		return remoteuser;
	} catch(e) {
		console.log("Error el retornar usuario peer");
		console.log(e);
	}
}

//Storage

class StorageDB {

  setItem() {
    console.log("OK");
  }

  onError(error) {
    console.log(error)
  }

  save(data,callback){
    try {

      chrome.storage.local.set({[data.key]:data},callback);

    } catch(e) {
      console.log("Error al realizar save.");
      console.log(e);
    }
  }

  getItem(key,callback){
    try {

      chrome.storage.local.get(key,callback);

    } catch(e) {
      console.log("Error al realizar getItem.");
      console.log(e);
    }
  }

}

/*****************************fin conection drafp2p***************************/

class StoreP2P extends AbstractP2PExtensionBackground{
  
  constructor(){
    super();
    this.store=new StorageDB();
    this.listado={};
    this.dataTemp=null;
    this.setExtensionName("storep2p");
    this.setExtensionId(chrome.runtime.id)
  }

  saveItem(item){
    this.listado[item]=1;
  }

  deleteItem(item){
    this.listado[item]=0;
  }

  getItems(){
    return this.listado;
  }

  getStore(){
    return this.store;
  }

  saveData(item,callback){
    try {
      
      this.saveItem(item.key);

      this.store.save(item,callback);

    } catch(e) {
      console.log("Error al realizar saveData");
      console.log(e);
    }
  }
  
  initialize(){

  }
  
  
  processRequest(msg, peer){

    try {
        remoteuser=peer;
        if (msg){
          console.log("Arriva contenido Remoto de peer :");
          console.log(peer);
          if (msg.type=="syncData"){
            let sync=msg.data;
            for (let i in sync){
                if (sync.hasOwnProperty(i)){
                  console.log('Key is: ' + i + '. Value is: ' + sync[i]);
                  this.saveData({key:i,data:sync[i].data},function(item){console.log("OK update...")});    
                }
            };
          }

          chrome.notifications.create({
              "type": "basic",
              "iconUrl": chrome.extension.getURL("icons/store-48.png"),
              "title": "SYNC FULL.",
              "message": "DATOS GUARDADOS LOCALMENTE."
          });

          //Envia respuesta de OK recepcion
          this.sendResponse({
            type:'syncData',
            status:true,
            automatic:false
            },peer);
        
    
        }else{

          chrome.notifications.create({
              "type": "basic",
              "iconUrl": chrome.extension.getURL("icons/store-48.png"),
              "title": "SIN DATO.",
              "message": "NO HAY INFORMACION PARA GUARDAR."
          });

        }
        
     }catch(e){
       console.log("Error al realizar processRequest.");
       console.log(e);
     }

  }

  processResponse(msg, peer){
    try {
      console.log("SIN ACTIVIDAD PROCESS RESPONSE."); 
    } catch(e) {
      console.log("Ocurrio una exception con el response: ");
      console.error(e);
    }
    
  }

  receiveResponse(msg, peer){
    try {
    
      if (msg.status){
        console.log("SYNCRO OK DESDE REMOTO.");
      }else{
        console.log("SIN ACTIVIDAD RECEIVE RESPONSE.");
      }
      
    } catch(e) {
      console.log("Ocurrio una exception con receiveResponse: ");
      console.error(e);
    }
  }

  automaticProcessing(extractor, peer){
      console.log("Automatic procesing...");
  }

  showData(item){
    try {

      this.setDataP2P(item);
      let panel = new PanelScript("template/view_data.html");
      panel.setMode("popup");
      let panelScriptData = panel.createWindow();
      chrome.windows.create(panelScriptData);

    } catch(e) {
      console.log("Error al usar showData.");
      console.log(e);
    }
  }

  getDataP2P(){
    try {
      return this.dataTemp;
    } catch(e) {
      console.log("Error al intentar acceder al traductor");
      console.log(e);
    }
  }

  setDataP2P(data){
    try {
      this.dataTemp=data;
    } catch(e) {
      console.log("Error al intentar acceder al traductor");
      console.log(e);
    }
}
   
}

var dbp2p = new StoreP2P();
dbp2p.connect();
// listen to tab URL changes
chrome.tabs.onUpdated.addListener(updateActiveTab);
// listen to tab switching
chrome.tabs.onActivated.addListener(updateActiveTab);
// listen for window switching
chrome.windows.onFocusChanged.addListener(updateActiveTab);
// update when the extension loads initially
updateActiveTab();
