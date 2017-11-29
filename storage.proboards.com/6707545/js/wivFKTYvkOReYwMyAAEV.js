$(document).ready(function() {
    var adminnoti = $(".tip-number:first-child").html();
    var profilenoti = $(".tip-number:eq(1)").html();
    var messagenoti = $(".tip-number:eq(2)").html();
    var bookmarknoti = $(".tip-number:eq(3)").html();
    var adminnoti2 = parseInt(adminnoti);
    var profilenoti2 = parseInt(profilenoti);
    var messagenoti2 = parseInt(messagenoti);
    var bookmarknoti2 = parseInt(bookmarknoti);
    var btabtitle = $("title").html();
    var btabtitle2 = "0";

    if(adminnoti != null) {
        btabtitle2 = parseInt(btabtitle2) + adminnoti2;
    }
    if(profilenoti != null) {
        btabtitle2 = parseInt(btabtitle2) + profilenoti2;
    }
    if(messagenoti != null) {
        btabtitle2 = parseInt(btabtitle2) + messagenoti2;
    }
    if(bookmarknoti != null) {
        btabtitle2 = parseInt(btabtitle2) + bookmarknoti2
    }
    if(btabtitle2 != "0") {
        $("title").html("(" + btabtitle2 + ") " + btabtitle);
    }
});