var compteur=0;try{var tiButtons=[];var tiClass="ti-connect";var useQuerySelector=document.querySelectorAll;if(useQuerySelector){tiButtons=document.querySelectorAll("div."+ tiClass+", span."+ tiClass);}else if(document.getElementsByTagName){var div=document.getElementsByTagName("div");var span=document.getElementsByTagName("span");var result=Array.prototype.slice.call(div).concat(Array.prototype.slice.call(span));if(result){for(var i=0;i<result.length;i++){var currentElement=result[i];var elementClass=currentElement.className+"";if(elementClass.match(new RegExp(tiClass,"i"))){tiButtons.push(currentElement);}}}
result=null;}
if(tiButtons){for(var i=0;i<tiButtons.length;i++){_replaceElement(tiButtons[i]);}}else{throw"No TopicIt button found";}}catch(e){if(console){console.error('An error occured: '+ e);}}
function _replaceElement(DomNode)
{try{var btnParams={"colorscheme":"light","redirect":document.location.href,"lang":"en","loc":DomNode.hasAttribute("data-loc")?DomNode.getAttribute("data-loc"):""}
var validator={"colorscheme":/light|dark/i,"height":/\d+(\.\d+)?(px|%|pt|em)/i,"label":/.+/,"lang":/[a-z]{2}/i,"loc":/^(https?:)?\/\/(connect\.)?(topicit\.net|topicit\.1lan\.net)/,"login":/^(https?:)?\/\//,"redirect":/^(https?:)?\/\//,"version":/\d+(\.\d+)?/,"width":/\d+(\.\d+)?(px|%|pt|em)/i}
for(var prop in validator){var value=DomNode.hasAttribute("data-"+ prop)?DomNode.getAttribute("data-"+ prop):"";if(value!==""&&value.match(validator[prop])){if(prop=="redirect"){value=value.replace(/#.+$/,'');}
btnParams[prop]=value;}}
var childsrc=btnParams.loc+"button/"+ btnParams.colorscheme+"?id=topicit-connect-"+ compteur;for(var prop in btnParams){switch(prop){case"colorscheme":continue;break;case"width":childsrc=childsrc+"&bw="+ btnParams["width"];break;case"height":childsrc=childsrc+"&bh="+ btnParams["height"];break;default:childsrc=childsrc+"&"+ prop+"="+ encodeURIComponent(btnParams[prop]);}}
var newchild=document.createElement("iframe");newchild.setAttribute("id","topicit-connect-"+ compteur);newchild.setAttribute("class","topicit-connect-button");newchild.setAttribute("frameborder","0");newchild.setAttribute("scrolling","no");newchild.setAttribute("allowtransparency","true");newchild.setAttribute("style","position:static;visibility:visible;width:100px;height:30px;");newchild.setAttribute("title","TopicIt Connect Button");newchild.setAttribute("src",childsrc);compteur++;DomNode.appendChild(newchild);}catch(e){if(console){console.error("An error occured: "+ e);}}}
function topicit_resize(event){if(event.origin!=="https://topicit.1lan.net"&&event.origin!=="https://topicit.net"&&event.origin!=="https://connect.topicit.1lan.net"&&event.origin!=="https://connect.topicit.net"){return;}
var action=event.data.action||"";if(action==="connect-button"){if(event.data.id){var dimensions=event.data.dimensions||{};if(!dimensions.height){dimensions.height=0;}
if(!dimensions.width){dimensions.width=0;}
if(isInt(dimensions.height)&&isInt(dimensions.width)){var styleHeight=dimensions.height+"";var styleWidth=dimensions.width+"";var iframe=document.getElementById(event.data.id);if(iframe){iframe.style.height=styleHeight.trim()+"px";iframe.style.width=styleWidth.trim()+"px";}}}}}
function isInt(value){var x;if(isNaN(value)){return false;}
x=parseFloat(value);return(x|0)===x;}
if(window.addEventListener){window.addEventListener("message",topicit_resize,false);}else if(window.attachEvent){window.attachEvent("onmessage",topicit_resize);}