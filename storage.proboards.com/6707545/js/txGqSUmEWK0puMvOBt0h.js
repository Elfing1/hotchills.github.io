/**
* @license
* The MIT License (MIT)
*
* Copyright (c) 2016 pixeldepth.net - http://support.proboards.com/user/2671
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var ProBoards_Discord=function(){function ProBoards_Discord(){_classCallCheck(this,ProBoards_Discord)}_createClass(ProBoards_Discord,null,[{key:"init",value:function init(){this.PLUGIN_ID="discord_widget_js";this.server=null;this.server_data=null;this.images=null;this.last_time=0;this.setup();if(this.server){$(this.ready.bind(this))}}},{key:"fetch_server_data",value:function fetch_server_data(current_time){var _this=this;if(!this.last_time||current_time>=this.last_time+25e3){this.last_time=current_time;var url="https://discordapp.com/api/guilds/"+this.server+"/widget.json?r="+Math.random();$.getJSON(url,function(data){_this.server_data=data;_this.update()})}requestAnimationFrame(this.fetch_server_data.bind(this))}},{key:"ready",value:function ready(){if(this.add_info_row()){requestAnimationFrame(this.fetch_server_data.bind(this))}}},{key:"setup",value:function setup(){var plugin=pb.plugin.get(this.PLUGIN_ID);if(plugin&&plugin.settings){var plugin_settings=plugin.settings;if(plugin_settings.server_id.length){this.server=plugin_settings.server_id}if(plugin.images){this.images=plugin.images}}}},{key:"add_info_row",value:function add_info_row(){var $last_row=$(".stats table tr.last");if($last_row.length){var $new_last_row=$last_row.clone();$last_row.removeClass("last");if(this.images){$new_last_row.find(".icon img").attr("src",this.images.discord).attr("title","Discord").attr("alt","Discord")}var $info=$new_last_row.find(".info");$info.find("th").text("Discord users online");var $online=$info.find("tr:first-child").next();$online.empty().attr("id","discord-online").html("No users online.");if($info.find("tr").length==3){$info.find("tr:last-child").remove()}$last_row.parent().append($new_last_row);return true}return false}},{key:"fetch_all_members",value:function fetch_all_members(){if(this.server_data.members&&this.server_data.members.length){var $online=$("<div>");var counter=0;for(var m=0;m<this.server_data.members.length;m++){var member=this.server_data.members[m];var css=member.status=="idle"||member.status=="dnd"?" style='font-style: italic'":"";var nick=member.nick?member.nick:member.username;var title="User is online";if(member.status=="idle"){title="User is idle"}else if(member.status=="dnd"){title="User does not want to be disturbed"}$online.append($("<span class='discord-user'"+css+" title='"+title+"'></span>").text(nick));if(counter<this.server_data.members.length-1){$online.append(", ")}counter++}if(counter){return $online}}return null}},{key:"update",value:function update(){var $info=$("#discord-online");if($info.length){var members=this.fetch_all_members();if(members){$info.html(members)}}}}]);return ProBoards_Discord}();ProBoards_Discord.init();