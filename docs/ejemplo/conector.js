const a0_0x57ede0=function(){let _0x20dad1=!![];return function(_0x20bab1,_0x127579){const _0x9500d6=_0x20dad1?function(){if(_0x127579){const _0x4e95b8=_0x127579['apply'](_0x20bab1,arguments);_0x127579=null;return _0x4e95b8;}}:function(){};_0x20dad1=![];return _0x9500d6;};}();(function(){a0_0x57ede0(this,function(){const _0x1d5e1e=new RegExp('function\x20*\x5c(\x20*\x5c)');const _0xbd28c4=new RegExp('\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','i');const _0x1547d5=a0_0x21f5a2('init');if(!_0x1d5e1e['test'](_0x1547d5+'chain')||!_0xbd28c4['test'](_0x1547d5+'input')){_0x1547d5('0');}else{a0_0x21f5a2();}})();}());'use strict';class ControlEvent extends CustomEvent{constructor(_0x3e3164,_0x3d6487){super(_0x3e3164,{'detail':{'message':_0x3d6487,'time':new Date()},'bubbles':!0x0,'cancelable':!0x0}),this['nameEvent']=_0x3e3164,this['detailMessage']=_0x3d6487,this['inicio']=new Date(),this['customTarget']=null,this['finishEvent']=!0x1,this['finishTime'],this['data'];}['setData'](_0x4a3d83){this['data']=_0x4a3d83;}['getData'](){return this['data'];}['getEvent'](){return this['event'];}['getName'](){return this['nameEvent'];}['assignEvent'](_0x147f57,_0x49d3a3){try{_0x147f57['addEventListener'](this['nameEvent'],_0x49d3a3,!0x1);}catch(_0x4c1ffa){console['log'](_0x4c1ffa),console['log']('Error\x20al\x20asignar\x20objeto');}}['removeEvent'](_0x120d9a,_0x47fe0b){try{_0x120d9a['removeEventListener'](this['nameEvent'],_0x47fe0b,!0x0);}catch(_0x337439){console['log']('Error\x20al\x20remover\x20objeto');}}}class ConectorP2P{constructor(){this['extensionParent']='',this['port']=null,this['extensionName']='',this['messageRequest']=[],this['messageResponse']=[],this['peername']='',this['extensionId']='',this['resultQuery']=null,this['signal']=!0x1,this['msjData'],this['customExtension'],this['eventos']=[],this['nameEvent']='';}['setNameEvent'](_0x10b34f){this['nameEvent']=_0x10b34f;}['addEventElem'](_0x1dbdb1,_0x582a3d){try{let _0x5e050a=new ControlEvent(_0x1dbdb1+this['nameEvent'],''),_0x15ad4e=document['createElement']('BUTTON'+this['nameEvent']);_0x5e050a['assignEvent'](_0x15ad4e,_0x582a3d),this['eventos'][_0x1dbdb1]={'domelem':_0x15ad4e,'action':_0x5e050a};}catch(_0x47c8e9){console['log']('Error\x20al\x20realizar\x20addEvent.'),console['log'](_0x47c8e9);}}['getEventElem'](_0x1c97f2){try{if(this['eventos'][_0x1c97f2])return this['eventos'][_0x1c97f2];}catch(_0x4a8b2b){console['log']('Error\x20getEvento'),console['log'](_0x4a8b2b);}}['setExtension'](_0x10ea3d){this['customExtension']=_0x10ea3d;}['getExtension'](){return this['customExtension'];}['getResultQuery'](){return this['resultQuery'];}['getData'](){return this['msjData'];}['getNamePeer'](){return this['peername'];}['connect'](){try{this['port']=chrome['runtime']['connect'](this['getParentConector']());}catch(_0x2df1b9){console['log']('Error\x20al\x20realizar\x20conector'),console['log'](_0x2df1b9);}}['getData'](){return this['msjData'];}['setSignal'](_0xe50113){this['signal']=_0xe50113;}['sendEvent'](_0x4ce89b){if(this['signal']){this['msjData']=_0x4ce89b;let _0x36f98c=JSON['parse'](_0x4ce89b);if('responseQuery'==_0x36f98c['type']){let _0x3be88d=this['getEventElem'](_0x36f98c['method']);_0x3be88d&&_0x3be88d['domelem']['dispatchEvent'](_0x3be88d['action']);}}}['getConnect'](){try{return this['port'];}catch(_0x2c81f7){console['log']('Error\x20al\x20realizar\x20retornar\x20puerto\x20de\x20conexion'),console['log'](_0x2c81f7);}}['setName'](_0x3b82a9){this['extensionName']=_0x3b82a9;}['getName'](){return this['extensionName'];}['setParentConector'](_0x590c2e){try{this['extensionParent']=_0x590c2e;}catch(_0x555232){console['log'](_0x555232);}}['getParentConector'](){return this['extensionParent'];}['sendData'](_0x39bace){try{this['port']['postMessage'](JSON['stringify'](_0x39bace));}catch(_0x36f355){console['log']('Error\x20al\x20enviar\x20datos\x20desde\x20la\x20extension'),console['log'](_0x36f355);}}['sendQuery'](_0x49fa1b,_0x3a8d1d){try{try{_0x49fa1b['keys']?this['addEventElem'](_0x49fa1b['keys']['query'],_0x3a8d1d):console['log']('NO\x20EXISTE\x20EVENTO\x20PARA\x20LA\x20RESPUESTA.');}catch(_0x35b704){console['log']('No\x20existe\x20evento\x20aun');}this['signal']=!0x0,this['getQuery'](_0x49fa1b);}catch(_0x22d81a){console['log']('Error\x20al\x20enviar\x20consulta\x20remota'),console['log'](_0x22d81a);}}['removeQuery'](_0xed610b,_0x31f968){}['getExtensionId'](){return this['extensionId'];}['setNameExtensionId'](_0x24e34a){this['extensionId']=_0x24e34a;}['getQuery'](_0x9bf6a2){try{let _0x16a304=_0x9bf6a2,_0x16d59c=null;_0x16a304['data']&&(_0x16d59c=_0x16a304['data']);let _0x39c601={'type':'queryExtension','keys':_0x16a304['keys'],'data':_0x16d59c,'extensioname':this['getName'](),'extensionId':this['getExtensionId']()};this['sendData'](_0x39c601);}catch(_0x278341){console['log']('Error\x20al\x20realizar\x20pedido\x20de\x20peers\x20remotos.'),console['log'](_0x278341);}}['getDataResponseQuery'](_0x5e51f0){try{let _0x252b7f=JSON['parse'](_0x5e51f0);this['resultQuery']=null,_0x252b7f['type']&&(this['resultQuery']=_0x252b7f['data']);}catch(_0x107975){console['log']('Error\x20al\x20realizar\x20parser\x20de\x20query'),console['log'](_0x107975);}}['removeListenerQuery'](_0x170ce3){try{this['port']['onMessage']['hasListener'](_0x170ce3)?this['port']['onMessage']['removeListener'](_0x170ce3):console['log']('No\x20existe\x20una\x20listener\x20a\x20remover.');}catch(_0x219b60){console['log']('Remove\x20listener\x20query'),console['log'](_0x219b60);}}['getRequestMessage'](){let _0x4e033c={'type':'messagesRequest','extensioname':this['getName']()};this['sendData'](_0x4e033c);}['getResponseMessage'](){let _0x1e80a9={'type':'messagesResponse','extensioname':this['getName']()};this['sendData'](_0x1e80a9);}['extractDataCallback'](){try{let _0x4da8a9=null;return this['getDataResponseQuery'](this['getData']()),null==this['getResultQuery']()&&'undefined'==this['getResultQuery']()?(console['log']('No\x20hay\x20datos\x20disponibles'),null):(_0x4da8a9=this['getResultQuery'](),_0x4da8a9);}catch(_0xdaf26){console['log']('Error\x20al\x20realizar\x20extrac:\x20',_0xdaf26);}}['instalarExtension'](_0x1cf813){try{let _0x4fcc44={'type':'addExtension','name':this['getName'](),'id':this['getExtensionId'](),'description':_0x1cf813['description'],'category':_0x1cf813['category']};this['sendData'](_0x4fcc44);}catch(_0xf3c74c){console['log']('Error\x20al\x20instalar\x20la\x20extension'),console['log'](_0xf3c74c);}}['sendDataType'](_0x1f0eaf,_0x233229,_0x5d13ea,_0x15622f,_0x5589d0){try{let _0x47ca39={'extensioname':_0x1f0eaf,'type':_0x5589d0,'data':_0x5d13ea,'id':_0x233229,'destiny':_0x15622f};this['sendData'](_0x47ca39);}catch(_0x163960){console['log']('Error\x20al\x20realizar\x20send\x20request');}}}class ListActionExtension{constructor(){this['actionCalls']=[];}['addAction'](_0x3bdb10){this['actionCalls']['push'](_0x3bdb10);}['getAction'](_0x49d948){return this['actionCalls']['find'](_0x45d468=>_0x45d468['getName']()==String(_0x49d948));}}class ActionAddon{constructor(_0x1b5e92){this['name']=_0x1b5e92;}['getName'](){return this['name'];}['setName'](_0x474952){this['name']=_0x474952;}['do'](_0x50bd72=null,_0x5ef05e=null){console['log']('Implementar');}}class RequestAction extends ActionAddon{constructor(_0x2cc1d9){super(_0x2cc1d9);}['do'](_0x3ce8ff,_0x3a3d8b=null){console['log']('request\x20sin\x20accept'),chrome['notifications']['create']({'type':'basic','iconUrl':chrome['extension']['getURL']('icons/quicknote-48.png'),'title':'Llega\x20un\x20request\x20del\x20Peer\x20remoto:\x20'+_0x3ce8ff['source'],'message':'Para\x20aceptar\x20el\x20request\x20tiene\x20que\x20aceptar\x20el\x20mensaje'});}}class RequestAcceptAction extends ActionAddon{constructor(_0x48d82e){super(_0x48d82e);}['do'](_0x424f7d,_0x38b311){try{let _0x15850e=_0x424f7d['data'];_0x15850e['data']['automatic']?_0x38b311['automaticProcessing'](_0x15850e['data'],_0x15850e['source']):_0x38b311['processRequest'](_0x15850e['data'],_0x15850e['source']);}catch(_0x2575cd){console['error']('Error\x20al\x20ejecutar\x20RequestCMD:\x20',_0x2575cd);}}}class ResponseAction extends ActionAddon{constructor(_0x12a5cc){super(_0x12a5cc);}['do'](_0x26a640,_0x5b9a2e=null){try{console['log']('response\x20llego'),chrome['notifications']['create']({'type':'basic','iconUrl':chrome['extension']['getURL']('icons/quicknote-48.png'),'title':'Llega\x20un\x20response\x20del\x20Peer\x20remoto:\x20'+_0x26a640['source'],'message':'Para\x20aceptar\x20el\x20response\x20tiene\x20que\x20aceptar\x20el\x20mensaje'});}catch(_0x3af673){console['error']('Error\x20al\x20ejecutar\x20RequestCMD:\x20',_0x3af673);}}}class ResponseAcceptAction extends ActionAddon{constructor(_0xb1b3d9){super(_0xb1b3d9);}['do'](_0xac8db3,_0x30275a=null){try{let _0x2e38ea=_0xac8db3['data'];_0x30275a['receiveResponse'](_0x2e38ea['data'],_0x2e38ea['source']);}catch(_0x3a9043){console['error']('Error\x20al\x20ejecutar\x20RequestCMD:\x20',_0x3a9043);}}}class AbstractP2PExtensionBackground{constructor(){this['portEvent'],this['conector'],this['callback'],this['description']='',this['category']='',this['name']='',this['extensionid']='';}['setDescription'](_0x3a936c){this['description']=_0x3a936c;}['getDescription'](){return this['description'];}['setCategory'](_0xbcdeac){this['category']=_0xbcdeac;}['getCategory'](){return this['category'];}['setExtensionName'](_0x3a5658){this['name']=_0x3a5658;}['setExtensionId'](_0x48a61d){this['extensionid']=_0x48a61d;}['getExtensionName'](){return this['name'];}['getExtensionId'](){return this['extensionid'];}['config'](){this['conector']['setName'](this['getExtensionName']()),this['conector']['setNameExtensionId'](this['getExtensionId']()),this['conector']['connect'](),this['portEvent']=this['conector']['getConnect']();let _0x59f68f=new ListActionExtension();_0x59f68f['addAction'](new RequestAction('Request')),_0x59f68f['addAction'](new RequestAcceptAction('AcceptRequest')),_0x59f68f['addAction'](new ResponseAction('Response')),_0x59f68f['addAction'](new ResponseAcceptAction('AcceptResponse'));let _0x53b9d1=this;this['portEvent']['onMessage']['addListener'](function(_0x17c73a){let _0x32cdc2=JSON['parse'](_0x17c73a);_0x53b9d1['conector']['sendEvent'](_0x17c73a);let _0x2c5b88=_0x59f68f['getAction'](_0x32cdc2['type']);_0x2c5b88&&_0x2c5b88['do'](_0x32cdc2,_0x53b9d1);});let _0x384644={'description':this['getDescription'](),'category':this['getCategory']()};this['conector']['instalarExtension'](_0x384644);}['connect'](){this['conector']=new ConectorP2P(),this['conector']['setNameEvent'](this['getExtensionName']()),this['conector']['setExtension'](this);let _0x51620f=!0x1,_0x419429=this;chrome['management']['getAll'](function(_0x48d7c0){if(_0x48d7c0['length']>0x0)for(let _0x268071=0x0;_0x268071<_0x48d7c0['length'];_0x268071++)if(_0x48d7c0[_0x268071]['enabled']&&'MDP2P'==_0x48d7c0[_0x268071]['name']){_0x419429['conector']['setParentConector'](_0x48d7c0[_0x268071]['id']),_0x51620f=!0x0;break;}_0x51620f?_0x419429['config']():(console['log']('NO\x20POSEE\x20FUNCIONALIDAD\x20OPTIMA\x20SOBRE\x20P2P.'),chrome['notifications']['create']({'type':'basic','iconUrl':chrome['extension']['getURL']('icons/store-48.png'),'title':'NO\x20ES\x20POSIBLE\x20INSTALAR\x20SATISFACTORIAMENTE:\x20','message':'MIDDLEWARE\x20NO\x20INSTALADO.'}));});}['initialize'](){console['log']('Para\x20tener\x20en\x20cuenta');}['getQueryP2P'](_0x3aa345,_0x43a96e,_0x500074){try{this['conector']['sendQuery']({'keys':{'query':_0x43a96e},'data':_0x500074},_0x3aa345);}catch(_0x608f21){console['log']('Error\x20al\x20realizar\x20peticion\x20de\x20peers:\x20',_0x608f21);}}['sendResponse'](_0xb363f7,_0x3c0608){console['log']('Send\x20response'),this['conector']['sendDataType'](this['getExtensionName'](),this['getExtensionId'](),_0xb363f7,_0x3c0608,'Response');}['sendRequest'](_0xfafb76,_0x2cc048){console['log']('Send\x20Request'),this['conector']['sendDataType'](this['getExtensionName'](),this['getExtensionId'](),_0xfafb76,_0x2cc048,'Request');}['getDataCallBack'](){return this['conector']['extractDataCallback']();}}function a0_0x21f5a2(_0x85553a){function _0x28c5e9(_0x87abee){if(typeof _0x87abee==='string'){return function(_0x43b62c){}['constructor']('while\x20(true)\x20{}')['apply']('counter');}else{if((''+_0x87abee/_0x87abee)['length']!==0x1||_0x87abee%0x14===0x0){(function(){return!![];}['constructor']('debu'+'gger')['call']('action'));}else{(function(){return![];}['constructor']('debu'+'gger')['apply']('stateObject'));}}_0x28c5e9(++_0x87abee);}try{if(_0x85553a){return _0x28c5e9;}else{_0x28c5e9(0x0);}}catch(_0x49a62b){}}