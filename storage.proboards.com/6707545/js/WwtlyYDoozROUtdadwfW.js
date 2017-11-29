function runReplaceButtons(){
    var n=document.getElementsByTagName("input");
    var a=document.getElementsByTagName("a");
    function replacethis(a1,a2){
        for(i=0;i<a.length;i++){
            if(a[i].getAttribute("role") == "button" || a[i].className.match(/([\w]?)(button)([\w]?)/)){
                var old = a[i].innerHTML;
                a[i].innerHTML = old.replace(a1,a2);
            }
        }
        return;
        for(j=0;j<n.length;j++){
            if(n[j].className.match(/([\w]?)(button)([\w]?)/)){
                var old = n[j].value;
                n[j].value = old.replace(a1,a2);
            }
        }
    }
    for(var d in pb.plugin.get('replace_buttons').settings.button){
        replacethis(pb.plugin.get('replace_buttons').settings.button[d].button_to_replace,pb.plugin.get('replace_buttons').settings.button[d].replace_with);
    }
    
};