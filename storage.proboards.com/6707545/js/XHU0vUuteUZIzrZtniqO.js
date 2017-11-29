
function getEditor() {
var editor
$('textarea[name="message"],.wysiwyg-textarea').each(function (i, e) {
e = $(e);
if (e.data().wysiwyg)
editor = e.data().wysiwyg.editors[e.data().wysiwyg.currentEditorName];
else if (e.parents('form.form_post_quick_reply').length) {
editor = jQuery.extend(true, {}, $.ui.wysiwyg.prototype._bbcodeEditor)
editor.textarea = e[0];
editor.parent = $.ui.wysiwyg.prototype;
editor.textarea.focus();
if (editor.selection) {
if (editor.selection.addRange) {
editor.selection.addRange(editor.range);
}
if (editor.range && editor.range.select) {
editor.range.select();
}
}
editor.range = editor.range || editor.getRange();
$(editor.textarea).bind('keyup.wysiwyg mouseup.wysiwyg', function () {
editor.getRange()
});
}

})
editor.form = $(editor.textarea).closest('form');
editor.addTag = function (tag, attributes, reselect, defaultText) {

if (this.name == "Visual") {
var edit = $("<" + tag + "></" + tag + ">",this.document).attr(attributes).html(defaultText || "")
if("undefined" == typeof document.getSelection /*&& edit[0].canHaveHTML == false*/){
	var text,range
    (text=this.getSelectedText()) && (range=this.range) && edit.prepend(text)
    //edit.append(defaultText)
    return this.replaceSelection.call(this,edit[0]);
}else
	//if(!window.getSelection && defaultText){var t = this.getRange(); t.pasteHTML('<B>test</B>')}
    var ret = this.surroundSelection.apply(this, [edit[0]]/*.concat(Array.prototype.slice.call(arguments,2))*/)
    //return this.surroundSelection.apply(this, [edit[0]].concat(Array.splice(arguments,2)))
    //if(!window.getSelection){
        //$(edit[0]).prepend((defaultText||""))
    //}
    return ret
} else if (this.name == "BBCode") {
return this.surroundSelection.apply(this, arguments)
}
}
editor.addString = function (string, doNotOverwriteSelection) {
if (doNotOverwriteSelection){
if((doNotOverwriteSelection = this.getRange()) && doNotOverwriteSelection.collapse)doNotOverwriteSelection.collapse(false);
}
if (this.name == "Visual")
string = (this.document || document).createTextNode(string)
return this.replaceSelection.call(this, string)
}
return editor
}


function getCaret(cp) {
  if (cp.selectionStart) { 
    return cp.selectionStart; 
  } else if (document.selection) { 
    cp.focus(); 

    var r = document.selection.createRange(); 
    if (r == null) { 
      return 0; 
    } 

    var re = cp.createTextRange(), 
    rc = re.duplicate(); 
    re.moveToBookmark(r.getBookmark()); 
    rc.setEndPoint('EndToStart', re); 

    var add_newlines = 0;
    for (var i=0; i<rc.text.length; i++) {
      if (rc.text.substr(i, 2) == '\r\n') {
        add_newlines += 2;
        i++;
      }
    }
      
    return rc.text.length - add_newlines; 
  }  
  return 0; 
}

function setCaretPosition(elem, caretPos)
{
    if(elem.createTextRange)
    {    
        var range = elem.createTextRange();  
        range.move('character', caretPos);
        range.select(); 
    }  
    else
    {    
        if(elem.selectionStart)
        {
                
            elem.focus();   
            elem.setSelectionRange(caretPos, caretPos);  
        }   
        else    
            elem.focus(); 
    }
}


function getBy(cell,att,attName)
{
    var cellArray = new Array();
    var aa = document.getElementsByTagName(cell);
    for(a=0; a<aa.length; a++)
    {
        if(att == 'class')
        {
            if(aa[a].className == attName)
            {
                cellArray[cellArray.length] = aa[a];
            }
        }
        else if(att == 'title')
        {
            if(aa[a].title == attName)
            {
                cellArray[cellArray.length] = aa[a];
            }
        }
        else if(att == 'name')
        {
            if(aa[a].name == attName)
            {
                cellArray[cellArray.length] = aa[a];
            }
        }
        else if(att == 'href')
        {
            if(aa[a].href.match(attName))
            {
                cellArray[cellArray.length] = aa[a];
            }
        }
    }
    return cellArray;   
}


function addSpoilerButton()
{
    if(proboards.plugin.get('spoiler_tags').settings.spoiler_button != '')
    {
    var url = proboards.plugin.get('spoiler_tags').settings.spoiler_button;
    }
    else
    {
      var url = proboards.plugin.get('spoiler_tags').images.shhh;  
    }
    
    var spoilB = document.createElement('img');
    with(spoilB){src = url; title = 'Insert Spoiler'; onclick = function(){addSpoil();}}
    var spoilB2 = document.createElement('img');
    with(spoilB2){src = url; title = 'Insert Spoiler'; onclick = function(){addSpoil();}}
    
    var iconCell = getBy('li','class','button button-insertSmiley');
    var li = document.createElement('li');
    li.className = 'button button-spoiler';
    li.appendChild(spoilB);
    iconCell[0].parentNode.appendChild(li);
    
    if(proboards.data('route').name != 'thread')
    {
    	var li2 = document.createElement('li');
    	li2.className = 'button button-spoiler';
    	li2.appendChild(spoilB2);
    	iconCell[1].parentNode.appendChild(li2);
        if(document.getElementById('menu-item-bbcode').className == '')
    	{
        	convertspoils();
    	}
    }
    
    //if(document.getElementById('menu-item-bbcode').className == '')
    //{
    //document.getElementById('menu-item-bbcode').getElementsByTagName('a')[0].click();
    //showSpoilers();
    
    //document.getElementById('menu-item-visual').getElementsByTagName('a')[0].click();
    //}
    //else
    
    
        
    return;
}

function addSpoil()
{
    var defTitle = pb.plugin.get('spoiler_tags').settings.default_title;
    if(defTitle == '')
    {
        defTitle = 'Spoiler';
    }
    
    var spBox = '<div style="width: auto; min-height: 41px; height: auto; border: 1px solid black; border-radius: 5px; padding: 10px;" id="spoiler_div">';
    spBox += '<table><tbody><tr>';
    spBox += '<td class="pad-top">Spoiler Title:&nbsp;</td>';
    spBox += '<td class="pad-top"><input type="text" value="'+defTitle+'" size="20" id="sptitle" id="sptitle"></td>';
    spBox += '</tr><tr>';
    spBox += '<td class="pad-bottom">Spoiler Body:&nbsp;</td>';
    spBox += '<td class="pad-bottom"><textarea style="width: 98.8%;" rows="5" id="spbody"></textarea></td>';
    spBox += '</tr></tbody></table>';
    spBox += '</div>';
    
    pb.window.alert('Add Spoiler',spBox, {'width':'450', 'top':'100' });
    $('#spoiler_div').parent().parent().find('.ui-button-text').html('Add Spoiler');
    $('#spoiler_div').parent().parent().find('.ui-button').click(function(){
        insertSpoil($('#sptitle').val(),$('#spbody').val());
    });
    
    
    return;
}

function insertSpoil(tit,con)
{
    tit=tit.replace(/'/g,'').replace(/({|\[)/g,'(').replace(/(}|\])/g,')');
    con=con.replace(/{/g,'[').replace(/}/g,']');
    
    var messarea = document.getElementsByTagName('div');
    for(m=0; m<messarea.length; m++)
    {
        if(messarea[m].className == 'editor bbcode-editor')
        {
            messarea = messarea[m].firstChild;
            break;
        }
        if(messarea[m].className == 'container quick-reply')
        {
            messarea = messarea[m].getElementsByTagName('textarea')[0];
            break;
        }
    }
    
    if(document.getElementById('menu-item-bbcode') != null && document.getElementById('menu-item-bbcode').className == '')
    {
        var spB = '{'+tit+'}<br>'+con;
        getEditor().addTag('div', {'class':'spoiler'}, true, spB);
    }
    else
    {
        messarea.value += '[spoiler='+tit+']'+con+'[/spoiler]';
    }
    
    return;
}




function postSpoilers()
{
    if(!proboards.data('route').name.match(/^(thread|conversation)$/) && document.getElementById('menu-item-bbcode').className != '')
    {
    	var messarea = document.getElementsByTagName('div');
		for(m=0; m<messarea.length; m++)
		{
			if(messarea[m].className == 'editor bbcode-editor')
			{
				messarea = messarea[m].firstChild;
			}
		}
    }
    else if(proboards.data('route').name.match(/^(thread|conversation)$/))
    {
        var messarea = document.getElementsByTagName('textarea');
		for(m=0; m<messarea.length; m++)
		{
			if(messarea[m].id.match(/message_input/))
			{
				messarea = messarea[m];
			}
		}
    }
    if(typeof messarea!="undefined")
    {
   
    	var post = messarea.value;
    
    	post = post.replace(/\[spoiler=(([^\[\]])+)\]/ig,'[spoiler]{$1}');
    	messarea.value = post;
    
    	document.getElementById('spoilbox').parentNode.removeChild(document.getElementById('spoilbox'));
    }

    return;
}






function showSpoilers()
{  
	var messarea = document.getElementsByTagName('div');
	for(m=0; m<messarea.length; m++)
	{
		if(messarea[m].className == 'editor bbcode-editor')
		{
			messarea = messarea[m].firstChild;
		}
	}
   
    var post=messarea.value;
    
    post = post.replace(/\[spoiler\]/ig,'[spoiler=Spoiler]');

	var spCell = '[spoiler]';
    spCell += '{$1}';
    post = post.replace(/\[spoiler=(([^\[\]])+)\]/g,spCell).replace(/\[\/spoiler\]/g,'[/spoiler][br]');
	messarea.value = post;
    return;
}





function convertspoils()
{
    setTimeout(function(){
    var messarea = document.getElementsByTagName('div');
		for(m=0; m<messarea.length; m++)
		{
			if(messarea[m].className == 'editor bbcode-editor')
	    	{
	     		messarea = messarea[m].firstChild;
	    	}
		}
    
    var post = messarea.value;
    //post = post.replace(/\[spoiler\]\[font color="#?[a-zA-Z0-9]*"\](([^\[\]])+)\[\/font\]\r?\n?\[font color="#?[a-zA-Z0-9]*"\]/ig,'[spoiler=$1]');
    post = post.replace(/\[spoiler\]{(([^\[\]])+)}\r?\n?/ig,'[spoiler=$1]');
    //post = post.replace(/\[\/font\]\[\/spoiler\]\r?\n?/ig,'[/spoiler]');
    post = post.replace(/\[\/spoiler\]\r?\n?/ig,'[/spoiler]');
    messarea.value = post;
    },1000);
    return;
}


function changespoil(spl)
{
    if(spl.parentNode.nextSibling.className == 'spoiler')
    {
        spl.parentNode.nextSibling.className = 'spbody';
    }
    else
    {
        spl.parentNode.nextSibling.className = 'spoiler';
    }
    return;
    
    
}


function adjustSpoilers()
{
    //var spColor = proboards.plugin.get('spoiler_tags').settings.spoiler_body_color;
    var sptColor = proboards.plugin.get('spoiler_tags').settings.spoiler_title_color;
    //var spCSS = proboards.plugin.get('spoiler_tags').settings.spoiler_styling;
    var titleCSS = proboards.plugin.get('spoiler_tags').settings.title_styling;
    
    var spoilers = document.getElementsByTagName('div');
    //for(s=0; s<spoilers.length; s++)
    for(s=spoilers.length-1; s>0; s--)
    {
    	if(spoilers[s].className == 'spoiler_header' && spoilers[s+1].innerHTML.match(/^{(([^\[\]])+)}/))
    	{
			spoilers[s].getElementsByTagName('a')[0].style.display = 'none';
			var spoiltitle = spoilers[s+1].innerHTML.split('{')[1].split('}')[0];
            //spoilers[s+1].innerHTML = '<font color="'+spColor+'" style="'+spCSS+'">'+spoilers[s+1].innerHTML.replace(/{(([^\[\]])+)}(<br>)?/i,'')+'</font>';
            
            spoilers[s+1].innerHTML = spoilers[s+1].innerHTML.replace(/{(([^\[\]])+)}(<br>)?/i,'');
			
            
            //var newSpoil = '<font color="'+sptColor+'" style="'+titleCSS+'; cursor: pointer;"';
            
            var newSpoil = '<span class="sptitle" style="cursor: pointer;"';
            
			newSpoil += 'onClick="changespoil(this)">'+spoiltitle+'</span>';
        	spoilers[s].innerHTML += newSpoil;
		}  
	}
    return;
}