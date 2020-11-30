 
var backgroundPage_1=chrome.extension.getBackgroundPage();

var usuarios = document.getElementById("listusers");
var listItems = document.getElementById("listitems");
var tab = backgroundPage_1.tabActive;
const codeInput =  document.querySelector("#code");
var uuid='';
var p2pExtension = backgroundPage_1.dbp2p;

function loadUsersCustom(event){
  try {


      let listaUsuarios = p2pExtension.getDataCallBack();

      if (listaUsuarios!=null || listaUsuarios!=undefined || listaUsuarios!=="undefined"){

          let usuarios = document.getElementById("listusers");
          let optionOne = new Option("All","All");
          usuarios.options.length=0;
          usuarios.options[usuarios.options.length] = optionOne;
          for (let i in listaUsuarios.peers){
              if (listaUsuarios.peers.hasOwnProperty(i)){
                let optionNew = new Option(listaUsuarios.peers[i].username, listaUsuarios.peers[i].username);
                usuarios.options[usuarios.options.length] = optionNew;
              }
          };
      };

  } catch(e) {
          console.log("Error al cargar lista de usuarios");
          console.log(e);
  }
}

function sendData(item){
  try {
    
    let usuarioSelected = usuarios.selectedIndex;
    
    let usuario = usuarios.options[usuarioSelected].value;

    console.log(JSON.stringify(item));

    p2pExtension.sendRequest({
        type:'syncData',
        data:item,
        automatic:false
        },usuario);

  } catch(e) {
    console.log("Error al utilizar sendData.");
    console.log(e);
  }
}

function syncData(){
  
  try {
  	  
  	
    let store = p2pExtension.getStore();

    let items_saved=p2pExtension.getItems();

    if (items_saved!=null || items_saved!=undefined || items_saved!=="undefined"){
        
        for (let i in items_saved){
            if (items_saved.hasOwnProperty(i)){
              console.log('Key is: ' + i + '. Value is: ' + items_saved[i]);
              store.getItem(i,sendData);
            }
        };
    }

  } catch(e) {
  	// statements
  	console.log(e);
  }
  
}

function getRandomString(length) {
  var s = '';
  do { s += Math.random().toString(36).substr(2); } while (s.length < length);
  s = s.substr(0, length); 
  return s;
}

function checkSave(){

  alert("Guardado OK.");

}

function saveData(){
  try {
    
    let uuid=getRandomString(32);
    
    p2pExtension.saveData({key:uuid,data:codeInput.value},checkSave);    

  } catch(e) {
    console.log("Error al realizar saveData");
    console.error(e);
  }
}

function loadSaveItem(){
  try {
    
    let items_saved=p2pExtension.getItems();

    let optionOne = new Option("empty","empty");
    listItems.options.length=0;
    listItems.options[listItems.options.length] = optionOne;

    if (items_saved!=null || items_saved!=undefined || items_saved!=="undefined"){
        
        for (let i in items_saved){
            if (items_saved.hasOwnProperty(i)){
              console.log('Key is: ' + i + '. Value is: ' + items_saved[i]);
              let optionNew = new Option(i, i);
              listItems.options[listItems.options.length] = optionNew;
            }
        };
    }

  } catch(e) {
    console.log("Error al realizar saveItem.");
    console.log(e);
  }
}

function viewData(){

  try {

    let itemSelected = listItems.selectedIndex;
    let itemview = listItems.options[itemSelected].value;
    p2pExtension.showData(itemview);

  } catch(e) {
    console.log("Error la realizar viewData.");
    console.log(e);
  }
}

function saveUrl(){
  try {
    
    if (tab){
      let uuid=getRandomString(32);
      p2pExtension.saveData({key:uuid,data:tab.url},checkSave);
    }else{
      alert("NO HAY TAB ACTIVO.");
    }
    
  } catch(e) {
    console.log("Error al realizar copy url.");
    console.log(e);
  }
}


document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('#syncdata').addEventListener('click', syncData);
  document.querySelector('#savedata').addEventListener('click', saveData);
  document.querySelector('#viewdata').addEventListener('click', viewData);
  document.querySelector('#saveurl').addEventListener('click', saveUrl);
  
  loadSaveItem();
  
  p2pExtension.getQueryP2P(loadUsersCustom,'peers',{});

});