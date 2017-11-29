<!--
// UnrealSoftware.de JS by Peter Schauss, 2014
// All rights reserved. Don't use without permission!

// Basic Vars
var mx=0;						// Mouse X Position
var my=0;						// Mouse Y Position

// Textarea Vars
var taActive=null;				// Currently active TextArea
var taPopup=null;				// Currently active Popup
var taPopupT=null;				// Popup Text for autocomplete Popup filter
var taUrl=null;					// Current URL in TextArea Popup (for pc command)

// Autocomplete Vars
var autoTimeout=null;			// Auto Complete Timeout
var autoField=null;				// Auto Field
var autoBlock=false;			// Auto Block

// Overlay Vars
var olState=false;				// Overlay opened?
var olMode='';					// Mode
var olSet='';					// Gallery set
var olPrev='';					// Previous link
var olNext='';					// Next link

// Hover Vars
var hoverTimeout=null;			// Hover Timeout
var hoverURL='';				// Hover URL;

// Language String
function l(de,en){
	if ($('html').attr('lang')=='de'){ return de; }else{ return en; }
}

// Change Integer (formatted)
function changeIntF(n,change){
	if (toString(n).length<=3){ return parseInt(n)+change; }
	var sep=l('.',',');
	n=parseInt(n.replace(sep,''))+change; n=toString(n);
	var i; var l=n.length; var r=n.substr(n-3,3);
	for (i=6; i<l; i+=3){ r+=sep+n.substr(n-i,3); }
	return r;
}

// Insertion Function for Text Area (for tabbing and popups)
function taInsert(event,obj) {
	taActive = obj;
	var popup=obj.parentNode.parentNode.parentNode.parentNode.firstChild;
	// Get key
	if (event.which){var keycode=event.which;}else{var keycode=event.keyCode;}
	// Popups
	if (obj.setSelectionRange) {
		var s=obj.selectionStart;
		var char=obj.value.substring(Math.max(0,s-1),s);
		// '@'-Popup
		if (char=='@'){
			//@user
			if (taPopup!='@user'){ taUserSearch(popup,'@user','@User:'); }
		// ':'-Popups
		}else if(char==':'){
			var inputLower=obj.value.toLowerCase()
			//user:
			if (inputLower.substring(Math.max(0,s-5),s)=='user:'){
				if (taPopup!='user:'){ taUserSearch(popup,'user:','User:'); }
			//rule:
			} else if (inputLower.substring(Math.max(0,s-5),s)=='rule:'){
				if (taPopup!='rule:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3>Rule:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='rule:';
					$('div.js_popupc').load('inc_pub/ruleinfo.php').hide().fadeIn('fast');
				}
			//faq:
			} else if (inputLower.substring(Math.max(0,s-4),s)=='faq:'){
				if (taPopup!='rule:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3>FAQ:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='faq:';
					$('div.js_popupc').load('inc_pub/faqinfo.php').hide().fadeIn('fast');
				}
			//s2: (command ref.)
			} else if (inputLower.substring(Math.max(0,s-3),s)=='s2:'){
				if (taPopup!='s2:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3><img src="img/iconsl/stranded2.png" alt="Stranded II" /> s2:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='s2:';
					$('div.js_popupc').load('inc_pub/cmdinfo.php?g=s2').hide().fadeIn('fast'); taUrl='inc_pub/cmdinfo.php';
				}
			//cs2d: (command ref.)
			} else if (inputLower.substring(Math.max(0,s-5),s)=='cs2d:'){
				if (taPopup!='cs2d:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3><img src="img/iconsl/cs2d.png" alt="CS2D" /> cs2d:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='cs2d:';
					$('div.js_popupc').load('inc_pub/cmdinfo.php?g=cs2d').hide().fadeIn('fast'); taUrl='inc_pub/cmdinfo.php';
				}
			//cs2dlua: (command ref.)
			} else if (inputLower.substring(Math.max(0,s-8),s)=='cs2dlua:'){
				if (taPopup!='cs2dlua:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3><img src="img/iconsl/cs2d.png" alt="CS2D" /> cs2dlua:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='cs2dlua:';
					$('div.js_popupc').load('inc_pub/cmdinfo.php?g=cs2dlua').hide().fadeIn('fast'); taUrl='inc_pub/cmdinfo.php';
				}
			//cs2dhook: (command ref.)
			} else if (inputLower.substring(Math.max(0,s-9),s)=='cs2dhook:'){
				if (taPopup!='cs2dhook:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3><img src="img/iconsl/cs2d.png" alt="CS2D" /> cs2dhook:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='cs2dhook:';
					$('div.js_popupc').load('inc_pub/cmdinfo.php?g=cs2dhook').hide().fadeIn('fast'); taUrl='inc_pub/cmdinfo.php';
				}
			//cs2dentity: (entity ref.)
			} else if (inputLower.substring(Math.max(0,s-11),s)=='cs2dentity:'){
				if (taPopup!='cs2dentity:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3><img src="img/iconsl/cs2d.png" alt="CS2D" /> cs2dentity:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='cs2dentity:';
					$('div.js_popupc').load('inc_pub/cmdinfo.php?g=cs2dentity').hide().fadeIn('fast'); taUrl='inc_pub/cmdinfo.php';
				}
			//cc: (command ref.)
			} else if (inputLower.substring(Math.max(0,s-3),s)=='cc:'){
				if (taPopup!='cc:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3><img src="img/iconsl/cc.png" alt="Carnage Contest" /> cc:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='cc:';
					$('div.js_popupc').load('inc_pub/cmdinfo.php?g=cc').hide().fadeIn('fast'); taUrl='inc_pub/cmdinfo.php';
				}
			//thread:
			} else if (inputLower.substring(Math.max(0,s-7),s)=='thread:'){
				if (taPopup!='thread:'){
					popup.innerHTML='<div class="js_popup" style="left:426px; top:3px; min-width:300px;"><h3><img src="img/iconsl/offtopic.png" alt="Thread" /> Thread:</h3><div class="js_popupc"><img src="img/ajax.gif" alt="loading" /></div></div>'; taPopup='thread:';
					$('div.js_popupc').load('inc_pub/cmdinfo.php?g=thread').hide().fadeIn('fast'); taUrl='inc_pub/cmdinfo.php';
				}
			}else{
				popup.innerHTML=''; taPopup=null; taPopupT=null;
			}
		}else if (taPopup!=null){
			//Filtering by input behind : (commands only)
			if ('abcdefghijklmnopqrstuvwxyz_-'.indexOf(char.toLowerCase())!=-1){
				if (taUrl=='inc_pub/cmdinfo.php'){
					var oldT=taPopupT
					taPopupT=obj.value.substring(Math.max(0,s-30),s);
					var sep=taPopupT.lastIndexOf(':');
					if (sep!=-1){
						taPopupT=taPopupT.substr(sep+1);
						if (taPopupT!=oldT){
							$('div.js_popupc').load('inc_pub/cmdinfo.php?g='+taPopup.replace(':','')+'&f='+encodeURIComponent(taPopupT)).hide().fadeIn('fast');
						}
					}else{
						popup.innerHTML=''; taPopup=null; taPopupT=null;
					}
				}else{
					popup.innerHTML=''; taPopup=null; taPopupT=null;
				}
			}else{
				popup.innerHTML=''; taPopup=null; taPopupT=null;
			}
		}
	}
	// Tab
	if (keycode==9) {
		if (event.type=='keydown') {
			if (obj.setSelectionRange) {
				var s=obj.selectionStart;
				var e=obj.selectionEnd;
				obj.value=obj.value.substring(0,s)+'\t'+obj.value.substr(e);
				obj.setSelectionRange(s+1,s+1);
				obj.focus();
			} else if (obj.createTextRange) {
				document.selection.createRange().text='\t';
				obj.onblur=function() { this.focus(); this.onblur=null; };
			}
		}
		if (event.returnValue){event.returnValue=false;} // ie
		if (event.preventDefault){event.preventDefault();} // dom
		return false;
	}
	return true;
}

// User search popup
function taUserSearch(popup,name,title){
	builduserlist();
	var prefix=''; var suffix='';
	if (name.charAt(0)=='@'){ prefix="user:"; suffix=': '};
	var list=''; for (var i=0; i<userlist.length; i++){
		list+='<a class="l_user" href="javascript:taInsertAdd(\''+prefix+userlist[i][0]+suffix+'\')">'+userlist[i][1]+'</a>';
	}
	taPopup=name; taUrl='inc_pub/finduser.php';
	popup.innerHTML='<div class="js_popup" style="left:526px; top:3px; min-width:200px;"><h3>'+title+'</h3>'+
		'<form id="popup_namefilterform" name="popup_namefilterform" action="finduser.php" method="get">'+
			'<label for="popup_namefilterform_val"><img src="img/i_search.png" /> <label><input id="popup_namefilterform_val" name="popup_namefilterform_val" type="text" size="15" autocomplete="off" />'+
			'<input type="submit" value="Search!" style="display:none" />'+
		'</form>'+
		'<div id="popup_nameresults" style="padding-bottom:5px;"></div>'+
		'<div class="js_popupc">'+list+'</div>'+
	'</div>';	
	$('#popup_namefilterform_val').keyup(function (){ window.clearTimeout(autoTimeout); autoTimeout=window.setTimeout('acompl(\'#popup_namefilterform_val\')',500); });
	$('#popup_namefilterform_val').blur(function (){ window.clearTimeout(autoTimeout); if (!autoBlock){
		autoBlock=false;
		window.clearTimeout(autoTimeout);
	}});
}

// Add text to active Text Area
function taInsertAdd(text,erase){
	if (taActive != null){
		var obj=taActive;
		var popup=obj.parentNode.parentNode.parentNode.parentNode.firstChild;
		if (obj.setSelectionRange) {
			// code for real browsers
			var s=obj.selectionStart;
			var e=obj.selectionEnd;
			if (erase){
				var sep=obj.value.substring(0,s).lastIndexOf(':');
				if (sep!=-1){
					obj.value=obj.value.substring(0,sep+1)+text+obj.value.substr(e);
					obj.setSelectionRange(sep+1+text.length,sep+1+text.length);
					obj.focus();
					popup.innerHTML=''; taPopup=null; taPopupT=null;
					return;
				}
			}
			obj.value=obj.value.substring(0,s)+text+obj.value.substr(e);
			obj.setSelectionRange(s+text.length,s+text.length);
			obj.focus();
		} else if (txtarea.createTextRange) {
			// code for IE
			obj.value+=text;
			obj.onblur=function(){this.focus(); this.onblur = null;};
		} else {
			obj.value+=text;
			obj.focus();
		}
		popup.innerHTML=''; taPopup=null; taPopupT=null;
	}
}

// Handle Forum Image Size (called onLoad of images in forum)
function handleImg(img){
	var tImg = new Image(); tImg.src = img.getAttribute('src');
	var w = tImg.width; var h = tImg.height;
	if ((w>695)||(h>480)){
		var facw=695/w;
		var fach=480/h;
		if (facw<fach){ w = w*facw; h = h*facw; }else{ w = w*fach; h = h*fach; }
		var z = img.nextSibling;
		z.setAttribute('style','background-image:url(img/i_search.png); width:12px; height:12px; margin:3px; display:block;');
		z.setAttribute('onclick','window.open("'+tImg.src+'","'+tImg.src+'","width='+(tImg.width+50)+',height='+(tImg.height+50)+',menubar=no");');
		z.setAttribute('onmouseover',"this.style.cursor='pointer'; this.style.cursor='hand';");
	}
	img.setAttribute('width',Math.round(w)); img.setAttribute('height',Math.round(h));
}

// Open/Close Overlay
function overlay(mode,content,set,alt){
	olMode=mode; olSet=set; olPrev=''; olNext='';
	if(content){
		if(content.charAt(0)=='{'){
			var imgtagend=content.indexOf('}');
			content='<img src="img/'+content.substr(1,imgtagend-1)+'" style="padding-bottom:5px;" /><br />'+content.substr(imgtagend+1);
		}
	}
	if(mode){
		olState=true;
		// Create Background
		var $div=$('#js_overlay')
		if($div.length==0){
			$div=$('<div id="js_overlay" className="js_overlayBG" class="js_overlayBG" style="display:none;"><div id="js_overlay_loading" style="background:url(../img/ajax.gif) no-repeat center center; height:100%; width:100%; display:block;"></div></div>');
			$div.click(function() { overlay(); });
			$div.appendTo('body');
		}
		$div.fadeIn('fast');
		// Create Box
		var $box=$('#js_box');
		if($box.length==0){
			$box=$('<div id="js_box"></div>');
			$box.appendTo('body');
		}
		var ui_close='<a href="javascript:overlay()" style="position:absolute; display:block; right:5px; bottom:5px; width:22px; height:22px; background-image:url(img/closelabel.gif);"></a>';
		// Image
		if (mode=='img'){
			//Get Pages + Create Navigation
			var imglink=content; var imgdescr='';
			var imgs=new Array(); var pages=0; var current=0;
			$('a[rel="'+set+'"]').each(function(i) {
				pages++;
				if (imglink==this.href){ current=i; imgdescr=this.title; }
				imgs.push(this.href);
			});
			var ui_pages='<div style="position:absolute; display:block; right:32px; bottom:5px; width:150px; height:20px; text-align:right; font-weight:bold; font-size:14px;">'+(current+1)+'/'+pages+'<br/>';
			if (pages>1){
				var i;
				for (i=0; i<pages; i++){
					if (i==current){ ui_pages+='<img src="img/dot.gif" />'; }else{ ui_pages+='<a href="javascript:overlay(\'img\',\''+imgs[i]+'\',\''+set+'\')"><img src="img/dotgrey.gif" /></a>'; }
				}
			}
			ui_pages+='</div>';
			if (pages>1){
				var prev=current-1; if (prev<0){ prev=pages-1; }
				var next=current+1; if (next>pages-1){ next=0; }
				olPrev=imgs[prev]; olNext=imgs[next];
				var ui_nav='<a id="js_prev" href="javascript:overlay(\'img\',\''+imgs[prev]+'\',\''+set+'\')"></a><a id="js_next" href="javascript:overlay(\'img\',\''+imgs[next]+'\',\''+set+'\')"></a>';
			}else{
				var ui_nav='';
			}
			//Display
			$box.attr('style','display:none;');
			if (!imgdescr){
				$box.html('<div style="position:relative; padding:5px;">'+ui_nav+'<img id="overlay_image" src="'+imglink+'" alt="'+imglink+'" onload="overlay_imgload()"/></div>\
				<div style="height:40px; padding-left:5px; text-align:left;">\
					<div style="padding-top:2px">\
						<a style="display:block; width:50px;" class="l_www" href="'+imglink+'" target="_blank">Link</a>\
					</div>\
				</div>'+ui_pages+ui_close);
			}else{
				var shortlink=imglink;
				var pos=imglink.indexOf('.de/');
				if (pos>-1){ shortlink=imglink.substr(pos+4); }
				$box.html('<div style="position:relative; padding:5px;">'+ui_nav+'<img id="overlay_image" src="'+imglink+'" alt="'+imgdescr+'" onload="overlay_imgload()"/></div>\
				<div style="height:40px; padding-left:5px; text-align:left;">'+imgdescr+'<br />\
					<div style="padding-top:2px">\
						<a style="display:inline-block;" class="l_www" href="'+imglink+'" target="_blank">Link</a> \
						<a style="display:inline-block;" class="l_search" href="zoom.php?img='+shortlink+'" target="_blank">Zoom</a>\
					</div>\
				</div>'+ui_pages+ui_close);
			}
		// Confirm
		} else if (mode=='con'){
				if ((set.indexOf('.php')>-1)&&(set.indexOf('(')==-1)){
					var con=set;
				}else{
					var con='javascript:'+set+'; overlay()';
				}
				$('#js_overlay_loading').hide();
				$box.attr('style','width:450px; height:200; margin-left:-150px; margin-top:-100px; display:hidden; visibility:visible;');
				$box.html('<div id="js_overlayc" style="position:relative; padding:5px;">\
					<div style="padding:10px;">'+content+'</div>\
					<a href="'+con+'" style="padding:5px;"><img src="img/okaylabel.gif" /></a>\
					<a href="javascript:overlay()" style="padding:5px;"><img src="img/closelabel.gif" /></a>\
				</div>');
				$box.fadeIn('fast');
		// Decide
		} else if (mode=='dec'){
				$('#js_overlay_loading').hide();
				$box.attr('style','width:450px; height:200; margin-left:-150px; margin-top:-100px; display:hidden; visibility:visible;');
				$box.html('<div id="js_overlayc" style="position:relative; padding:5px;">\
					<div style="padding:10px;">'+content+'</div>\
					<a href="'+alt+'" style="padding:5px;"><img src="img/okaylabel.gif" /></a>\
					<a href="'+set+'" style="padding:5px;"><img src="img/closelabel.gif" /></a>\
				</div>');
				$box.fadeIn('fast');
		// Info
		} else if (mode=='i'){
			$('#js_overlay_loading').hide();
			$box.attr('style','width:450px; height:200; margin-left:-150px; margin-top:-100px; display:hidden; visibility:visible;');
			$box.html('<div id="js_overlayc" style="position:relative; padding:5px;">\
				<div style="padding:10px;">'+content+'</div>\
				<a href="javascript:overlay()" style="padding:5px;"><img src="img/okaylabel.gif" /></a>\
			</div>');
		// Ajax (dc = dynamic content)
		}else{
			document.body.style.overflow='hidden';
			if (mode=='dc'){
				if (content.indexOf('.php&')!=-1){ content=content.replace('.php&','.php?'); }
				$box.attr('style','width:770px; height:500; margin-left:-385px; margin-top:-250px; display:hidden; visibility:visible;');
				$box.html('<div id="js_overlayc" style="position:relative; padding:5px;"><iframe src="'+content+'" height="500" width="753" name="js_iframe" scrolling="yes"></iframe>'+ui_close+'</div>');
			// Plain Content
			}else{
				$box.html('<div style="padding:5px;">'+content+'</div>'+ui_close);
				$box.attr('style','width:600px; height:400; margin-left:-300px; margin-top:-200px; display:none;');
				$box.fadeIn('fast');
			}
		}
	} else {
		//Close!
		olState=false; olMode='';
		//Document
		document.body.style.overflow='auto';
		$('#js_overlay_loading').css('display','none');
		$('#js_overlay').fadeOut(300,function(){ $(this).remove(); });
		$('#js_box').fadeOut(200);
		//iFrame
		if ($('#js_overlay_loading',window.parent.document).length!=0 || $('#js_overlay',window.parent.document).length!=0){
			window.parent.document.body.style.overflow='auto';
			$('#js_overlay_loading',window.parent.document).css('display','none');
			$('#js_overlay',window.parent.document).fadeOut(300,function(){ $(this).remove(); });
			$('#js_box',window.parent.document).fadeOut(750,function(){ $(this).find("iframe").remove("iframe"); });
		}
	}
}

// Overlay Image Loader
function overlay_imgload(){
	if (olState){
		var $imgo = $('#overlay_image'); var $box=$('#js_box');
		if ($imgo.length>0 && $box.length>0){
			$box.attr('style','visibility:visible;');
			var imgw = $imgo.width(); var imgh = $imgo.height();
			var winw = $(window).width(); var winh = $(window).height();
			if ((imgw+10<winw) && (imgh+100<winh)){ var percent = 1; }else{ var percent = Math.min((winw/(imgw+10)),(winh/(imgh+100))); }
			var left = -Math.max(Math.round(((imgw)/2)*percent),205);
			var top = -Math.round(((imgh+70)/2)*percent);
			$box.attr('style','visibility:visible; display:none; margin-left:'+left+'px; margin-top:'+top+'px; width:'+Math.max(Math.round(imgw*percent)+10,410)+'px;');
			$imgo.attr('width',Math.round(imgw*percent)); $imgo.attr('height',Math.round(imgh*percent));
			$box.fadeIn();
		}
	}
}

// Build User List Array (called on demand)
function builduserlist(){
	// Only build array if it doesn't exist yet...
	if (typeof userlist != 'object'){
		// Build user list array by scanning current page for user links
		userlist=[];
		$('a[rel^="u:"]').each(function(i) {
			if ($(this).attr('title')!=undefined){
				var userid=$(this).attr('rel').substring(2); // Strip the 'u:'-Part
				var exists=false;
				for (var i in userlist){
					if(userlist[i][0]==userid){ exists=true; break; }
				}
				if (exists==false){ userlist.push([userid,$(this).attr('title')]); } // Add user to the list if it is not in there already
			}
		});
		if (userlist.length>0){
			// Sort User List Array (sort by names, which are at index 1 of each list entry)
			userlist.sort(function (a,b){
				a=a[1].toLowerCase(); b=b[1].toLowerCase();
				if (a==b){ return 0; }
				if ([a,b].sort()[0]==a){ return -1; }else{ return 1; }
			});
		}
	}
	return userlist.length;
}

// Change Popup Content
function pc(c){
	$('div.js_popupc').html('<img src="img/ajax.gif" alt="loading" />');
	$('div.js_popupc').load(taUrl+c).hide().fadeIn('fast');
}

// Autocomplete userlist (called 500ms after typing in #form_user input)
function acompl(field){
	autoField=field; autoBlock=false;
	if ($(field).val().length>1){
		if (field=='#form_user'){
			$.get('../inc_pub/autocomplete_users.php?term='+encodeURI($(field).val()),function(data){
				if (data!='-'){
					if ($(field).parent('li').children('.js_tta').length==0){ $(field).parent('li').append('<div class="js_tta"><div class="js_ttw" style="top:0px; left:300px; width:200px;"><div id="js_ttdc"></div></div></div>'); }
					$('#js_ttdc').html(data);
					$('div.js_ttw').fadeIn(300);
				}else{
					$('div.js_tta').remove();
				}
			});
		}else{
			var mode=1;
			if (taPopup=='@user'){ mode=2; }
			$.get('../inc_pub/autocomplete_users.php?term='+encodeURI($(field).val())+'&m='+mode,function(data){
				if (data!='-'){
					$('#popup_nameresults').html(data);
				}else{
					$('#popup_nameresults').html('<div class="warning">'+l('Keine Ergebnisse','No results')+'</div>');
				}
			});
		}
	}else{
		if (field=='#form_user'){
			$('div.js_tta').remove();
		}else{
			if ($(field).val().length==1){
				$('#popup_nameresults').html('<div class="warning">'+l('min. 2 Buchstaben','min 2. chars')+'</div>');
			}else{
				$('#popup_nameresults').html('');
			}
		}
	}
}

// Autocomplete set value and close
function acompls(value){
	autoBlock=false;
	if (value){ $(autoField).val(value); }
	$('div.js_tta').remove();
	window.clearTimeout(autoTimeout);
}

// Hover Load dynamic content
function hoverLoad(){
	$('#js_ttdc').load(hoverURL, function(){
		$('body').children('.js_ttw').children('img').slideUp('fast');
		$('#js_ttdc').hide().slideDown();
	});
}

// jQuery Document Ready Function
$(document).ready(function() {
	// Cache Mouse Position (for tooltips)
	$(document).mousemove(function(e){
		mx=e.pageX; my=e.pageY;
	});
	
	// Tooltips
	if (set_tt!=1){
		$('.js_tt').hover(
			function(e) {
				mx=e.pageX; my=e.pageY;
				this.rel=$(this).attr('rel'); var req=''; var w=300;
				if (this.rel.substring(0,2)=='w:'){
					w=parseInt(this.rel.substring(2)); //specific width
				} else if (this.rel.substring(0,2)=='u:'){
					req='inc_pub/userinfo.php?id='+this.rel.substring(2); w=200; //user
				} else if (this.rel.substring(0,2)=='t:'){ 
					req='inc_pub/threadinfo.php?id='+this.rel.substring(2); //thread
				} else if (this.rel.substring(0,2)=='f:'){ 
					req='inc_pub/fileinfo.php?id='+this.rel.substring(2); //file
				} else if (this.rel.substring(0,2)=='c:'){
					w=parseInt(this.rel.substring(2,5)); //custom, format: c:WWW:URL
					req=this.rel.substring(6);
				} else {
					w=0; //regular text tooltip without specific width
				}
				this.tip=this.title; this.title=''; //disable standard title
				if (req==''){
					//regular text tooltip
					if (w==0){
						$('body').append('<div class="js_ttw" style="word-break:normal; left:'+mx+'px; top:'+(my+30)+'px;">'+this.tip+'</div>'); //no specific width
					}else{
						$('body').append('<div class="js_ttw" style="word-break:normal; width:'+w+'px; left:'+mx+'px; top:'+(my+30)+'px;">'+this.tip+'</div>'); //specific width
					}
				}else{
					//AJAX tooltip (dynamic content)
					if ($('body').children('.js_ttw').length==0){
						$('body').append('<div class="js_ttw" style="width:'+w+'px; left:'+mx+'px; top:'+(my+30)+'px;"><img src="img/ajax.gif" alt="loading" /><div id="js_ttdc"></div></div>');
						$('body').children('.js_ttw').hide().delay(300).fadeIn(100);
						hoverTimeout=window.setTimeout(hoverLoad,300);
						hoverURL=req;
					}
				}
				$('.js_ttw').fadeIn(300);
			},
			function() {
				$('body').children('.js_ttw').remove();
				this.title=this.tip; //restore standard title
				if (hoverTimeout!=null){
					window.clearTimeout(hoverTimeout);
					hoverTimeout=null;
				}
			}
		);
	}
	
	// Spoiler/More Toggle
	$('div.js_toggle > a').each(function(i) {
		$(this).click(function(e) {
			e.preventDefault(); $img=$(this).children('img.js_plusminus');
			if ($img.attr('src')=='img/i_plus.png'){
				$img.fadeOut(function() { $(this).load(function() { $(this).fadeIn(100); }); $(this).attr('src','img/i_minus.png'); });
				$img.fadeOut(100); $(this).next().next().show('fast');
			}else{
				$img.fadeOut(function() { $(this).load(function() { $(this).fadeIn(100); }); $(this).attr('src','img/i_plus.png'); });
				$img.fadeOut(100); $(this).next().next().hide('fast');
			}
		});		
	});
	
	// Header Toggle (Forum)
	$('div.js_htoggle > h1 > a').each(function(i) {
		$(this).click(function(e) {
			e.preventDefault(); $img=$(this).children('img');
			if ($img.attr('src')=='img/i_plus.png'){
				$img.fadeOut(function() { $(this).load(function() { $(this).fadeIn(100); }); $(this).attr('src','img/i_minus.png'); });
				$img.fadeOut(100); $(this).parent('h1').next().slideDown('slow');
			}else{
				$img.fadeOut(function() { $(this).load(function() { $(this).fadeIn(100); }); $(this).attr('src','img/i_plus.png'); });
				$img.fadeOut(100); $(this).parent('h1').next().slideUp('slow');
			}
		});		
	});
	
	// Overlay Links (opens JS overlay windows)
	$('a.js_dcpopup').each(function(i) { $(this).click(function(e) { e.preventDefault(); overlay('dc',$(this).attr('href')+'&popup=1'); }); });
	$('a.js_confirm').each(function(i) { $(this).click(function(e) {
		e.preventDefault();
		if ($(this).attr('title')!==undefined) {
			if ($(this).attr('rel')!==undefined) {
				overlay('con',$(this).attr('rel')+$(this).attr('title'),$(this).attr('href')); //content: rel+title
			}else{
				overlay('con',$(this).attr('title'),$(this).attr('href')); //content: title
			}
		} else if ($(this).attr('rel')!==undefined) {
			overlay('con',$(this).attr('rel'),$(this).attr('href')); //content: rel
		} else {
			overlay('con',$(this).text()+'?',$(this).attr('href')); //content: text+'?'
		}
	}); });
	$('a.js_decide').each(function(i) { $(this).click(function(e) {
		e.preventDefault();
		overlay('dec',$(this).attr('rel'),$(this).attr('href'),$(this).attr('rev'));
	}); });

	// Screenshot/Image Gallery Links
	if (!($.browser.msie && Math.round($.browser.version)<9)){
		$('a[rel^="img["]').each(function(i) {
			$(this).click(function(e) {
				if(e.which == 1) { e.preventDefault(); overlay('img',this.href,this.rel); }
			});
			if ($(this).children('img').length>0){
				$(this).hover(
					function() { $(this).children('img').animate({opacity: 0.5},{duration: 200, queue: false}); },
					function() { $(this).children('img').animate({opacity: 1.0},{duration: 200, queue: false}); }
				);
			}
		});
	}
	
	// Hotkeys
	$(document).keyup(function (e) {
    	if ((e.keyCode==80 || e.keyCode==37) && olPrev!=''){ overlay(olMode,olPrev,olSet); } // prev: P and <-
		if ((e.keyCode==78 || e.keyCode==39) && olNext!=''){ overlay(olMode,olNext,olSet); } // next: N and ->
		if (e.keyCode==27){ if ($('#js_overlay').length>0){ overlay(); }} // close: ESC
		if (e.keyCode==13){ if (olState && olMode=='con'){ eval(olSet); overlay(); }} // confirm: ENTER
	});	
	
	// User name input autocomplete
	$('#form_user').keyup(function (){ window.clearTimeout(autoTimeout); autoTimeout=window.setTimeout('acompl(\'#form_user\')',500); });
	$('#form_user').blur(function (){ window.clearTimeout(autoTimeout); if (!autoBlock){acompls();} });
	
	// Smooth Scrolling
	$("a.js_scroll").click(function(event){		
		event.preventDefault();
		$('body').children('.js_ttw').remove();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});	
	
	// Dynamic Header
	var $h=$('#js_headerW');
	var $hsource=$('div.hbar');
	var header_visible=false;
	if ($h.length>0){
		$('#js_headerC').html($hsource.html());
		$('#js_headerC > h1').css('display','inline');
		if (parseInt($hsource.css('height'))>10){ $('#js_headerC').css('height',$hsource.css('height')); }
		$(window).scroll(function (){
			if ($(window).scrollTop()>115){
				if (!header_visible){ $h.stop(true,true).fadeIn(500); header_visible=true; }
			}else{
				if (header_visible){ $h.stop(true,true).fadeOut(500); header_visible=false; }
			}
		});
		// todo: Fix scrolling to anchor on pageload (so dyn header doesn't cover content)
		//if (window.location.hash.length>0){ setTimeout(function(){$(window).scrollTop($(window).scrollTop()-30);},10); }
	}
	
	// Blinking (blink constantly)
	var blinktimer;
	blinktimer = setInterval(blinkfunc, 1000);
	function blinkfunc(){
		$o=$('.js_blink');
		$o.fadeOut(500, function() { $o.fadeIn(500); });
	}
	
	// Blink in (blink once)
	$('.js_blinkin').delay(100).fadeOut(300).fadeIn(300);
	
	//Text Selection Popup
	$('div').mouseup(function(e) {
		var sel = '';
		if (window.getSelection) {
            sel = window.getSelection().toString();
        } else if (document.selection) {
            sel = document.selection.createRange().text;
        }
		if (sel.length > 0 && !isNaN(sel)) {
			// Number Selection
			var num = parseInt(sel);
			if (num > 0) {
				mx=e.pageX; my=e.pageY;
				$('body').children('.js_ttw').remove();
				$('body').append('<div class="js_ttw" style="word-break:normal; left:'+mx+'px; top:'+my+'px;"><h3>'+l('Nummer ','Number ')+num+'</h3><a class="l_user" href="profile.php?userid='+num+'">'+l('Benutzer mit ID ','User with ID ')+num+'</a></div>');
				$('.js_ttw').fadeIn(300);
				return;
			}
		}
		$('body').children('.js_ttw').remove();
	});
	
	//Remove readonly (Chrome auto-complete fix
	$('input').hover(function() {
		$(this).prop('readonly', false);
	});
	
	//Text Area Paste
	/*
	$("textarea").bind('paste', function(e) {
		var self = this;
		setTimeout(function(e) {
			//alert($(self).val());
			var text=$(self).val();
			if (text.indexOf('unrealsoftware.de/forum_posts.php?post=')>-1){
				//text=text.replace();
			}
			if (text.indexOf('unrealsoftware.de/files_show.php?file=')>-1){
				text=text.replace(/(http|https)?:\/\/(www.)?unrealsoftware.de\/files\_show\.php\?file\=(\d+)[^#\&]/gi,'file:$3');

			}
			$(self).val(text);
		}, 0);
	});
	*/
});

//-->