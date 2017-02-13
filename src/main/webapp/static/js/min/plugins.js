var Plugins=function(){return{Chat:function(){var e={},f={},b={},n={},k=sprintf("chatbox_%s",_.uniqueId()),r=$("<div />",{id:k}),h=function(a,b,c,d){d=n.clone();UserSettings.getUsername();var m=d.find(".chatMessageAuthor");m.text(a.author);d.find(".chatMessageTimestamp").text((new Date(a.timestamp)).toISOString());var g=d.find(".chatMessageContent");switch(a.contentType){case "text":g.text(a.content);break;case "html":g.html(a.content)}if(b&&c)switch(b){case "whisperTo":g.addClass("whisper");m.text(sprintf("to %s",
c));break;case "whisperFrom":g.addClass("whisper");m.text(sprintf("from %s",c));break;case "groupChatTo":g.addClass("groupChat");m.text(sprintf("to %s",c));break;case "groupChatFrom":g.addClass("groupChat"),m.text(sprintf("from %s",c))}return d},t=function(a){if(a&&"type"in a&&"chatMessage"==a.type&&"identity"in a&&!(a.identity in e)){e[a.identity]=a;var q=UserSettings.getUsername(),c=_.flatten(_.flatten(_.map(Conversations.getCurrentConversation().slides,function(a){return _.map(a.groupSets,function(a){return a.groups})})));
boardContent.chatMessages.push(a);if(a.audiences.length){var d=_.find(a.audiences,function(a){return"user"==a.type||"group"==a.type});a.author==q?d&&"user"==d.type?(b.append(h(a,"whisperTo",d.name)),b.scrollTop(b[0].scrollHeight)):d&&"group"==d.type&&(b.append(h(a,"groupChatTo",d.name)),b.scrollTop(b[0].scrollHeight)):d&&"user"==d.type&&d.name==q?(b.append(h(a,"whisperFrom",a.author)),b.scrollTop(b[0].scrollHeight)):d&&"group"==d.type&&_.some(c,function(a){return a.name==d.name&&_.some(a.members,
function(a){return a.name==q})})&&(b.append(h(a,"groupChatFrom",a.author,d.name)),b.scrollTop(b[0].scrollHeight))}else b.append(h(a)),b.scrollTop(b[0].scrollHeight)}},l=function(a){_.forEach(a.chatMessages,t)},p=function(a){if(a&&a.length){var b=[],c;if(_.startsWith(a,"/w"))if(c=a.split(" "),c.length&&2<=c.length)b.push({domain:"metl",name:c[1],type:"user",action:"read"}),c=_.drop(c,2).join(" ");else return a;else if(_.startsWith(a,"/g"))if(c=a.split(" "),c.length&&2<=c.length)b.push({domain:"metl",
name:c[1],type:"group",action:"read"}),c=_.drop(c,2).join(" ");else return a;else c=a;a=sendStanza;var d=UserSettings.getUsername(),m=Conversations.getCurrentSlideJid(),g=(new Date).getTime(),u=sprintf("%s_%s_%s",d,m,g),b={type:"chatMessage",author:d,timestamp:g,identity:u,contentType:"text",content:c,context:m,audiences:b||[]};console.log("created chat message:",b);a(b);return""}return a};return{style:".chatMessageContainer {overflow-y:auto; flex-grow:1;}.chatContainer {margin-left:1em;width:320px;height:140px;display:flex;flex-direction:column;}.chatMessageAuthor {color:slategray;margin-right:1em;}.chatMessageTimestamp {color:red;font-size:small;display:none;}.chatboxContainer {display:flex;flex-direction:row;width:100%;flex-shrink:0;}.chatboxContainer input{flex-grow:1;}.chatbox {background-color:white;display:inline-block; padding:0px; margin:0px;}.chatboxSend {display:inline-block; background:white;padding:0px; margin:0px;}.groupChat {color:darkorange}.whisper {color:darkblue}",
load:function(a,b){a.stanzaReceived.Chatbox=t;a.historyReceived.Chatbox=l;r.append('<div class="chatContainer" ><div class="chatMessageContainer" ><div class="chatMessage" ><span class="chatMessageTimestamp" ></span><span class="chatMessageAuthor" ></span><span class="chatMessageContent"></span></div></div><div class="chatboxContainer"><input type="text" class="chatbox"></input><button class="chatboxSend">Send</button></div></div>');return r},initialize:function(){f=$("#"+k);b=f.find(".chatMessageContainer");
n=b.find(".chatMessage").clone();b.empty();var a=f.find(".chatboxContainer .chatbox").on("keydown",function(a){13==a.keyCode&&(a=$(this),a.val(p(a.val())))});f.find(".chatboxContainer .chatboxSend").on("click",function(){a.val(p(a.val()))})}}}(),"Face to face":function(){var e=$("<div />");return{style:".publishedStream {background:green;} .subscribedStream {background:red;} .videoConfStartButton, .videoConfSubscribeButton, .videoConfPermitStudentBroadcastButton {background:white;margin:1px 0;} .videoConfSessionContainer, .videoConfStartButtonContainer, .videoConfContainer, .videoConfPermitStudentBroadcastContainer{display:flex;} .videoConfStartButtonContainer, .videoConfPermitStudentBroadcastContainer{flex-direction:row;} .videoConfStartButton, .videoConfPermitStudentBroadcastButton{padding:0 1em;font-size:1rem;} #videoConfSessionsContainer{display:none;} .videoContainer{display:flex;} .context, .publisherName{font-size:1rem;} .thumbWide{width:160px;} .broadcastContainer{display:none;}",
load:function(f,b){e.append('<span id="videoConfSessionsContainer"><div class="videoConfSessionContainer"><div><div class="videoConfStartButtonContainer" style="margin-bottom:-0.3em"><button class="videoConfStartButton"><div>Start sending</div></button><span class="context mr"></span><span style="display:none;" class="teacherControls mr"><input type="checkbox" id="canBroadcast"><label for="canBroadcast" class="checkbox-sim"><span class="icon-txt">Students can stream</span></label></span></div><div class="viewscreen"></div></div><div class="broadcastContainer"><a class="floatingToolbar btn-menu fa fa-television btn-icon broadcastLink"><div class="icon-txt">Watch class</div></a></div><div class="videoSubscriptionsContainer"></div><div class="videoConfContainer"><span class="videoContainer thumbWide"><button class="videoConfSubscribeButton"><div>Toggle</div></button><span class="publisherName"></span></span></div></div></span>');
return e},initialize:TokBox.initialize}}(),Groups:function(){var e=$("<div />"),f=function(b,e,f){b=$("<button />",{"class":sprintf("%s btn-icon fa",b),click:f});$("<div />",{"class":"icon-txt",text:e}).appendTo(b);return b};return{style:".groupsPluginMember{margin-left:0.5em;display:flex;} .groupsPluginGroupContainer{display:flex;margin-right:1em;} .groupsPluginGroup{display:inline-block;text-align:center;vertical-align:top;} .groupsPluginGroupGrade button, .groupsPluginGroupGrade .icon-txt{padding:0;margin-top:0;} .groupsPluginGroupControls button, .groupsPluginGroupControls .icon-txt{padding:0;margin-top:0;} .isolateGroup label{margin-top:1px;} .isolateGroup{margin-top:0.8em;} .rowT{display:table;width:100%;} .rowC{display:table-row;} .rowC *{display:table-cell;} .rowC label{text-align:left;vertical-align:middle;font-weight:bold;} .memberCurrentGrade{background-color:white;margin-right:0.5em;padding:0 .5em;} .groupsPluginGroupControls{display:flex;} .groupsPluginGroupGrade{background-color:white;margin:2px;padding:0 0.3em;height:3em;display:inline;} .groupsPluginAllGroupsControls{margin-bottom:0.5em;border-bottom:0.5px solid white;padding-left:1em;display:flex;}",
load:function(b,n){var k=function(){try{e.empty();var b=Conversations.getCurrentGroups();if(Conversations.shouldModifyConversation()){var h=Conversations.getCurrentSlide();if(h&&b.length){var k=sprintf("groupWork_%s",h.id),l=_.find(Grades.getGrades(),function(a){return a.location==k});if(l)var p=Grades.getGradeValues()[l.id];var a=0;$("<div />",{"class":"groupsPluginAllGroupsControls"}).on("mousedown",function(){a=$("#masterFooter").scrollLeft()}).append($("<input />",{type:"radio",name:"groupView",
id:"showAll"}).prop("checked",!0).click(function(){_.each(b,function(a){ContentFilter.setFilter(a.id,!0)});ContentFilter.clearAudiences();blit();$("#masterFooter").scrollLeft(a)})).append($("<label />",{"for":"showAll"}).css({"flex-grow":0}).append($("<span />",{"class":"icon-txt",text:"Show all"}))).append(f("fa-share-square","Share all",function(){var a=_.map(ContentFilter.getFilters(),function(a){return _.cloneDeep(a)}),c=ContentFilter.getAudiences();_.forEach(b,function(a){ContentFilter.setFilter(a.id,
!1)});Progress.deisolated.call();blit();var g=function(a,d){var c=a[0];c?(ContentFilter.setFilter(c.id,!0),ContentFilter.setAudience(c.id),blit(),_.defer(function(){Submissions.sendSubmission(function(b){b?(ContentFilter.setFilter(c.id,!1),blit(),_.defer(function(){g(_.drop(a,1),d)})):errorAlert("Submission failed","Storing this submission failed.")})})):(successAlert("Submissions sent",sprintf("%s group submissions stored.  You can check them in the submissions tab.",_.size(b))),d())};_.defer(function(){g(b,
function(){_.forEach(a,function(a){ContentFilter.setFilter(a.id,a.enabled)});c.length?ContentFilter.setAudience(c[0]):ContentFilter.clearAudiences();blit()})})}).css({"margin-top":0})).appendTo(e);var q=$("<div />").css({display:"flex"}).appendTo(e);_.each(b,function(d){var c=$("<div />",{"class":"groupsPluginGroupContainer"}).appendTo(q),g=$("<div />").appendTo(c),e=$("<div />",{"class":"groupsPluginGroupControls"}).appendTo(g);f("fa-book","Assess",function(){l=_.find(Grades.getGrades(),function(a){return a.location==
k});if(void 0!==l){var a=sprintf("assessGroupDialog_%s",_.uniqueId()),b=$("<div/>",{id:a}),c=$.jAlert({title:"Assess group",width:"80%",content:b[0].outerHTML,btns:[{text:"Save",theme:"green",closeAlert:!0,onClick:function(){l=_.find(Grades.getGrades(),function(a){return a.location==k});void 0!=e?(_.each(d.members,function(a){a={type:sprintf("%sGradeValue",l.gradeType),gradeId:l.id,gradeValue:e,gradedUser:a,author:UserSettings.getUsername(),gradeComment:m,gradePrivateComment:n,timestamp:0,audiences:[]};
sendStanza(a)}),c.closeAlert()):alert("you cannot submit without a gradeValue")}}]}),a=$("#"+a),g=$("<div />",{"class":"groupsPluginGroup rowT"}),e=void 0,f=sprintf("gradeValueInput_%s",_.uniqueId()),b=function(){return $("<div />",{"class":"rowC"}).appendTo(g)},h=b();switch(l.gradeType){case "numeric":$("<label/>",{text:"Score","for":f}).appendTo(h);$("<input/>",{id:f,type:"number",max:l.numericMaximum,min:l.numericMinimum}).on("change",function(a){e=parseFloat($(this).val())}).appendTo(h);break;
case "text":$("<label/>",{text:"Score","for":f}).appendTo(h);$("<input/>",{id:f,type:"text"}).on("change",function(a){e=$(this).val()}).appendTo(h);break;case "boolean":e=!1,$("<input/>",{type:"checkbox",id:f}).on("change",function(a){e=$(this).prop("checked")}).appendTo(h),$("<label/>",{text:"Score","for":f}).appendTo(h)}var f=b(),h=sprintf("gradeValueComment_%s",_.uniqueId()),m="";$("<label/>",{"for":h,text:"Comment"}).appendTo(f);$("<input />",{id:h,type:"text"}).on("change",function(a){m=$(this).val()}).appendTo(f);
var b=b(),f=sprintf("gradeValuePrivateComment_%s",_.uniqueId()),n="";$("<label/>",{"for":f,text:"Private comment"}).appendTo(b);$("<input/>",{id:f,type:"text"}).on("change",function(a){n=$(this).val()}).appendTo(b);g.appendTo(a)}else alert("no linked grade")}).appendTo(e);$("<span />",{text:sprintf("Group %s",d.title),"class":"ml"}).appendTo(g);f("fa-share-square","Share",function(){h.find("input").prop("checked",!0).change();_.defer(Submissions.sendSubmission)}).appendTo(e);var g=sprintf("isolateGroup_%s",
d.title),h=$("<div />",{"class":"isolateGroup"}).on("mousedown",function(){a=$("#masterFooter").scrollLeft()}).append($("<input />",{type:"radio",name:"groupView",id:g}).change(function(){Progress.call("beforeChangingAudience",[d.id]);_.each(b,function(a){ContentFilter.setFilter(a.id,!1)});ContentFilter.setFilter(d.id,!0);ContentFilter.setAudience(d.id);Progress.isolated.call([d.id]);Modes.select.activate();blit();$("#masterFooter").scrollLeft(a)})).append($("<label />",{"for":g}).append($("<span />",
{"class":"icon-txt",text:"Isolate"}).css({"margin-top":"2px"}))).appendTo(e),n=$("<div />",{"class":"groupsPluginGroup"}).prependTo(c);_.each(d.members,function(a){var b=$("<div />",{text:a,"class":"groupsPluginMember"}).appendTo(n);p&&a in p&&$("<span />",{"class":"memberCurrentGrade",text:p[a].gradeValue}).prependTo(b)})})}}else{var c=$("<div />").css({display:"flex"}).appendTo(e);_.each(b,function(a){if(_.find(Conversations.getCurrentGroup(),a)){var b=$("<div />",{"class":"groupsPluginGroupContainer"}).appendTo(c);
sprintf("isolateGroup_%s",a.title);var e=$("<div />").appendTo(b);_.each(a.members,function(a){$("<div />",{text:a}).appendTo(e)});$("<div />",{text:sprintf("Group %s",a.title)}).prependTo(e)}})}}catch(d){console.log("Groups plugin render e",d)}};b.gradeValueReceived["Groups plugin"]=function(b){var e=sprintf("groupWork_%s",Conversations.getCurrentSlideJid()),f=_.find(Grades.getGrades(),function(b){return b.location==e});f&&b.gradeId==f.id&&k()};b.currentSlideJidReceived["Groups plugin"]=k;b.conversationDetailsReceived["Groups plugin"]=
k;return e},initialize:function(){}}}()}}();$(function(){var e=$("#pluginBar"),f=$("<style></style>").appendTo($("body"));_.each(Plugins,function(b,n){var k=$("<div />",{"class":"plugin"});b.load(Progress).appendTo(k);f.append(b.style);k.appendTo(e);b.initialize()})});
