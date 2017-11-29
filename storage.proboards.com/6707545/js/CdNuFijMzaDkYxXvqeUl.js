/* ********************
   First Letter Avatars
   By Smangii
   ********************/

'use strict';

var randomColors = pb.plugin.get('avatar_letters').settings.use_random_colors,
    makeCircle = pb.plugin.get('avatar_letters').settings.use_circle_avatars,
    applytodefaults = pb.plugin.get('avatar_letters').settings.apply_to_defaults_only,
    defaultAvatar = pb.plugin.get('avatar_letters').settings.default_avatar_name || "";

function runSwap () {
    if(pb.data('route').name !== "edit_user_avatar" && pb.data('route').name !== "edit_user_admin") {
        $('.avatar-wrapper').each(function(i) {
            if(applytodefaults) {
                var urlString = $(this).find("img").prop("src");
                var isMatching = urlString ? urlString.indexOf(defaultAvatar) : 0;
                if(isMatching > 0) {
                    swapImgforLetter($(this));
                }
            } else {
                swapImgforLetter($(this));
            }
        });
    }
}

function swapImgforLetter(avatar) {
    var el = document.createElement("div");
    var letter = avatar.prop("title").slice(0,1);
    var height = avatar.height();
    el.className = "letter";
    el.innerHTML = "<span style='line-height:"+height+"px; font-size:"+height/2+"px';>" + letter + "</span>";
    avatar.html(el);
    if(randomColors) {
        var color = getRandomColor();
        avatar.css("background-color", color);
        avatar.css("color", getTextColor(color));
    }
    if(makeCircle) {
        avatar.addClass("circle");
    }
}

function getRandomColor() {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

function getTextColor(rgba) {
    rgba = rgba.match(/\d+/g);
    if ((rgba[0] * 0.299) + (rgba[1] * 0.587) + (rgba[2] * 0.114) > 186) {
        return 'black';
    } else {
        return 'white';
    }
}

$('document').ready(function() {
	runSwap();
});

proboards.on('pageChange', function() {
	runSwap();
});

proboards.on('afterSearch', function() {
	runSwap();
});

proboards.on('columnSort', function() {
	runSwap();
});

proboards.on('moreActivity', function() { 
    runSwap();
});