function add_report_button()
{
    var reportees = pb.plugin.get('report_user').settings.receving_members;
    var user = pb.data('page').member.name;
    var peep = $('.note').html();
    var button = $('<a></a>').html('Report').addClass('button').attr('href','/conversation/new/'+reportees+'?&subject=Reporting '+user+'&peep='+peep+'&user='+user);
    
    if($('#report_button').length)
    {
        $('#report_button').after(button);
    }
    else
    {
        $('#options-container').after(button);
    }
    
    return;
}

function report_user()
{
    $('#content').css('display','none');
    
    var peep = document.location.href.split(/&user=/)[1].replace(/%20/g,' ');
    
    var userN = '@'+document.location.href.split(/&peep=/)[1].split(/&user/)[0];
    
    var report_note = pb.plugin.get('report_user').settings.reporting_note.replace(/#/g,userN);
    
    var div = $('<div></div>').addClass('container').html('<div class="title-bar"><h2>Report User</h2></div>');
    var div2 = $('<div></div>').addClass('content pad-all cap-bottom');
    var div3 = $('<div></div>').html('<b>Please give a reason why you\'d like to report '+peep+'<br></b>').css('height','25px');
    var div4 = $('<div></div>').css('width','99.1%');
    var TA = $('<textarea></textarea>').css({'height':'100px', 'width':'100%', 'overflow':'auto'}).attr('id','report_info').val(report_note);
    var div5 = $('<div></div>').css({'height':'30px', 'padding-top':'10px'});
    var button = $('<a></a>').html('Report '+peep).addClass('button').css('float','right');
    $(div5).append(button);
    
    $(div4).append(TA);
    $(div2).append(div3,div4,div5);
    $(div).append(div2);
    
    $('#content').before(div);
    
    var subBut = $('.submit').find('input');
    
    $(button).click(function(){
        
        var rep = $('#report_info').val();
        if(rep.length < 2)
        {
            return;
        }
        var gfrm=$('form.form_conversation_new');
        gfrm.ready(function(){
            var gfrmid=gfrm.attr('id');
            $('#'+gfrmid+'_message_input').wysiwyg('setContent',rep);
        });
        
        $(subBut).click();
    });

    return;
}





$(document).ready(function(){
    if(pb.data('route').name == 'new_user_conversation' && document.location.href.match(/subject=Reporting/))
    {
        report_user();
    }
    else if(pb.data('route').name.match(/user/))
    {
        add_report_button();
    }
    
});