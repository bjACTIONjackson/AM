var Grades=function(){var d={},B={},k={},l={},E={},H={},I={},J={},C=[],t=function(){},b=function(L,b){$(L).prop("disabled",b);$(".grades.blocker").toggle(b)},K=function(){B={};k={};l={};t()},y=function(b,u){try{if("type"in b){switch(b.type){case "grade":var h=B[b.id];if(void 0==h||h.timestamp<b.timestamp)B[b.id]=b,!u&&h&&"visible"in h&&0==h.visible&&"visible"in b&&1==b.visible&&getHistory(Conversations.getCurrentSlideJid());break;case "numericGradeValue":case "booleanGradeValue":case "textGradeValue":var d=
k[b.gradeId]||{};k[b.gradeId]=d;var l=d[b.gradedUser];if(!l||l.timestamp<b.timestamp)d[b.gradedUser]=b,Progress.call("gradeValueReceived",[b])}u||t()}}catch(q){console.log("Grades.stanzaReceived",q)}};Progress.onConversationJoin.Grades=K;Progress.historyReceived.Grades=function(b){try{"type"in b&&"history"==b.type&&(K(),_.forEach(b.grades,function(b){y(b,!0)}),_.forEach(b.gradeValues,function(b){y(b,!0)}),t())}catch(d){console.log("Grades.historyReceivedFunction",d)}};Progress.stanzaReceived.Grades=
y;$(function(){$.getJSON("/getExternalGradebooks",function(b){C=b});console.log("Conv state:",Conversations.getCurrentConversationJid(),Conversations.shouldModifyConversation(),Conversations.getCurrentConversation());var y=function(){d=$("#gradesDatagrid");H=d.find(".gradeActionsContainer").clone();I=d.find(".gradeEditContainer").clone();J=d.find(".gradeAssessContainer").clone();d.empty();E=$("#createGradeButton");var h=function(b){jsGrid.Field.call(this,b)};h.prototype=new jsGrid.Field({sorter:function(b,
e){return new Date(b)-new Date(e)},itemTemplate:function(b){return(new Date(b)).toLocaleString()},insertTemplate:function(b){return""},editTemplate:function(b){return""},insertValue:function(){return""},editValue:function(){return""}});jsGrid.fields.dateField=h;var h=[{name:"name",type:"text",title:"Name",readOnly:!0,sorting:!0},{name:"description",type:"text",title:"Description",readOnly:!0,sorting:!0},{name:"location",type:"text",title:"Location",readOnly:!0,sorting:!0},{name:"timestamp",type:"dateField",
title:"When",readOnly:!0,itemTemplate:function(b){return 0==b?"":moment(b).format("MMM Do YYYY, h:mm a")}}],u=[{name:"gradeType",type:"text",title:"Type",readOnly:!0,sorting:!0},{name:"identity",type:"text",title:"Actions",readOnly:!0,sorting:!1,itemTemplate:function(d,e){if(e.author==UserSettings.getUsername()){var h=H.clone(),a=_.cloneDeep(e),v=function(){var e=_.uniqueId(),d=$("<div/>",{id:e}),h=$.jAlert({title:"Edit grade",width:"50%",content:d[0].outerHTML}),f=I.clone(),d=sprintf("gradeName_%s",
e),q=f.find(".gradeNameInputBox");q.attr("id",d).unbind("blur").on("blur",function(c){a.name=q.val()}).val(a.name);f.find(".gradeNameLabel").attr("for",d);var d=sprintf("gradeDesc_%s",e),k=f.find(".gradeDescriptionInputBox");k.attr("id",d).unbind("blur").on("blur",function(c){a.description=k.val()}).val(a.description);f.find(".gradeDescriptionLabel").attr("for",d);var d=sprintf("gradeType_%s",e),F=f.find(".gradeTypeSelect"),G=f.find(".numericMinTextbox"),z=f.find(".numericMaxTextbox"),n=sprintf("numericMin_%s",
e),x=sprintf("numericMax_%s",e);f.find(".numericMinLabel").attr("for",n);f.find(".numericMaxLabel").attr("for",x);G.unbind("blur").on("blur",function(c){"numeric"==a.gradeType?a.numericMinimum=parseFloat(G.val()):delete a.numericMinimum}).attr("id",n);z.unbind("blur").on("blur",function(c){"numeric"==a.gradeType?a.numericMaximum=parseFloat(z.val()):delete a.numericMaximum}).attr("id",x);var l=function(){"foreignRelationship"in a&&(G.prop("disabled",!0),z.prop("disabled",!0),F.prop("disabled",!0));
F.val(a.gradeType);switch(a.gradeType){case "numeric":f.find(".numericOptions").show();void 0===a.numericMinimum&&(a.numericMinimum=0);void 0===a.numericMaximum&&(a.numericMaximum=100);G.val(a.numericMinimum);z.val(a.numericMaximum);break;default:f.find(".numericOptions").hide()}};F.attr("id",d).unbind("change").on("change",function(){a.gradeType=F.val();l()}).val(a.gradeType);l();f.find(".gradeTypeLabel").attr("for",d);d=sprintf("gradeVisible_%s",e);f.find(".gradeVisibleLabel").attr("for",d);var g=
f.find(".gradeVisibleCheckbox");g.attr("id",d).prop("checked",a.visible).unbind("change").on("change",function(c){a.visible=g.prop("checked")});var r=void 0,A=void 0,D=void 0,w=function(){var c=f.find(".associateController");b(c,!1);if("foreignRelationship"in a){c.find(".createAssociation").hide();var e=a.foreignRelationship.sys,d=a.foreignRelationship.key.split("_"),z=d[0],n=d[1];c.find(".associationSystem").text(e);c.find(".associationOrgUnit").text(z);c.find(".associationGradeId").text(n);c.find(".requestRefreshAssociation").unbind("click").on("click",
function(){b(c,!0);$.getJSON(sprintf("/getExternalGrade/%s/%s/%s",e,z,n),function(c){a.description=c.description;a.name=c.name;a.gradeType=c.gradeType;a.numericMinimum=c.numericMinimum;a.numericMaximum=c.numericMaximum;h.closeAlert();v();b(this,!1)}).fail(function(a,e,r){b(c,!1);console.log(e,r);alert(sprintf("Error: %s \r\n %s",e,r))})});c.find(".refreshAssociation").show()}else if(c.find(".refreshAssociation").hide(),c.find(".createAssociation").show(),c.find(".associationPhase").hide(),void 0===
r)c.find(".requestAssocPhase1").show(),c.find(".requestAssociation").unbind("click").on("click",function(){r=!0;1==C.length&&(A=C[0].id);w()});else if(void 0==A)A=C[0].id,c.find(".chooseGradebook").html(_.map(C,function(c){return $("<option/>",{value:c.id,text:c.name})})).unbind("change").on("change",function(c){A=$(this).val()}),c.find(".commitGradebook").unbind("click").on("click",function(){b(this,!0);w()}),c.find(".requestAssocPhase2").show();else if(void 0===D)b(c,!0),$.getJSON(sprintf("/getExternalGradebookOrgUnits/%s",
A),function(a){console.log("requestedOrgUnits:",a);a&&a.length?(D=a[0].foreignRelationship.key,c.find(".chooseOrgUnit").html(_.map(a,function(c){return $("<option/>",{value:c.foreignRelationship.key,text:c.name})})).unbind("change").on("change",function(c){D=$(this).val()}),c.find(".commitOrgUnit").unbind("click").on("click",function(){w()}),c.find(".requestAssocPhase3").show()):(console.log("found no data:",a),c.text("No gradebooks found"));b(c,!1)}).fail(function(a,e,r){b(c,!1);console(sprintf("error: %s \r\n %s",
e,r));alert(sprintf("error: %s \r\n %s",e,r))});else{c.find(".requestAssocPhase4").show();b(c,!0);var m=c.find(".linkGrade"),x=[],g=c.find("#chooseExistingGradeSelectBox"),p=void 0;m.unbind("click").on("click",function(){void 0!==p&&"foreignRelationship"in p&&"sys"in p.foreignRelationship&&"key"in p.foreignRelationship?(a.foreignRelationship={sys:p.foreignRelationship.sys,key:p.foreignRelationship.key},a.gradeType=p.gradeType,a.numericMinimum=p.numericMinimum,a.numericMaximum=p.numericMaximum,a.name=
p.name,q.val(a.name),a.description=p.description,k.val(a.description),sendStanza(a),w(),l()):alert("no pre-existing grade chosen")}).prop("disabled",!0);g.unbind("change").on("change",function(c){var b=$(this).val();void 0!==b&&"no-choice"!==b?(p=_.find(x,function(c){return"foreignRelationship"in c&&"key"in c.foreignRelationship&&c.foreignRelationship.key==b}),void 0!==p?m.prop("disabled",!1):m.prop("disabled",!0)):(p=void 0,m.prop("disabled",!0))});$.ajax({type:"GET",url:sprintf("/getExternalGrades/%s/%s",
A,D),success:function(a){console.log("found external grades:",a);x=a;a.length?g.html(_.map([{text:"",foreignRelationship:{system:"no-system",key:"no-choice"}}].concat(a),function(c){return $("<option/>",{text:c.name,value:c.foreignRelationship.key})})):(g.hide(),m.prop("disabled",!0),m.hide());b(c,!1)},dataType:"json"}).fail(function(a,e,r){b(c,!1);alert(sprintf("error - could not fetch existing grades from remote gradebook: %s \r\n %s",e,r))});c.find(".createGrade").unbind("click").on("click",function(){b(c,
!0);$.ajax({type:"POST",url:sprintf("/createExternalGrade/%s/%s",A,D),data:JSON.stringify(a),success:function(c){console.log("createdGrades:",a,c);a.foreignRelationship={sys:c.foreignRelationship.sys,key:c.foreignRelationship.key};sendStanza(a);w();b(this,!1)},contentType:"application/json",dataType:"json"}).fail(function(a,e,r){b(c,!1);alert("Could not create remote grade.  Please ensure that the grade has a non-blank name which will be unique within the remote system")})})}};w();f.find(".cancelGradeEdit").unbind("click").on("click",
function(){h.closeAlert()});f.find(".submitGradeEdit").unbind("click").on("click",function(){sendStanza(a);h.closeAlert()});$("#"+e).append(f)};h.find(".editGradeButton").unbind("click").on("click",v);h.find(".assessGradeButton").unbind("click").on("click",function(){var a=_.uniqueId(),d=$("<div/>",{id:a});$.jAlert({title:"Assess grade",width:"auto",content:d[0].outerHTML,onClose:function(){t()}});var h={},f=J.clone();$("#"+a).append(f);b(f,!0);var g=f.find(".gradebookDatagrid"),h=f.find(".gradeValueEditPopup").clone();
g.find(".gradeUserContainer").clone();g.empty();var q=function(a){var d=k[e.id];void 0==d&&(k[e.id]={},d={});var h=sprintf("%sGradeValue",e.gradeType),g=Participants.getPossibleParticipants();if("foreignRelationship"in e){var q=e.foreignRelationship.sys,v=e.foreignRelationship.key.split("_")[0];$.getJSON(sprintf("/getExternalGradebookOrgUnitClasslist/%s/%s",q,v),function(b){_.forEach(b,function(a){a=a.UserName;void 0!==a&&g.push(a)});g=_.uniq(g);_.forEach(g,function(a){void 0==d[a]&&(d[a]={type:h,
gradeId:e.id,gradedUser:a,gradePrivateComment:"",gradeComment:"",author:e.author,timestamp:0,audiences:[]})});console.log("possibleParticipants:",g,d);d=_.values(d);d=_.filter(d,function(a){return a.type==h});a(d)}).fail(function(a,e,d){b(f,!1);console.log("error",e,d)})}else _.forEach(g,function(a){void 0==d[a]&&(d[a]={type:h,gradeId:e.id,gradedUser:a,author:e.author,gradePrivateComment:"",gradeComment:"",timestamp:0,audiences:[]})}),d=_.values(d),d=_.filter(d,function(a){return a.type==h}),a(d)},
v=function(a){var d=function(a){var b=sprintf("changeGvPopup_%s",_.uniqueId()),d=$("<div/>",{id:b});console.log("gvPopup",a);var w=$.jAlert({type:"modal",content:d[0].outerHTML,title:sprintf("Change score for %s",a.gradedUser)}),b=$("#"+b),d=h.clone(),c=d.find(".changeGradeContainer"),g=c.find(".numericScore"),f=c.find(".booleanScore"),k=c.find(".booleanScoreLabel"),l=c.find(".textScore"),m=_.cloneDeep(a);switch(e.gradeType){case "numeric":c=function(a){m.gradeValue=parseFloat(g.val())};g.val(a.gradeValue).attr("min",
e.numericMinimum).attr("max",e.numericMaximum).unbind("blur").on("blur",c);f.remove();k.remove();l.remove();break;case "text":g.remove();c=function(a){m.gradeValue=l.val()};l.val(a.gradeValue).unbind("blur").on("blur",c);k.remove();f.remove();break;case "boolean":g.remove();var n=sprintf("booleanScoreId_%s",_.uniqueId()),c=function(a){m.gradeValue=f.prop("checked")};f.unbind("change").on("change",c).prop("checked",a.gradeValue).attr("id",n);k.attr("for",n);l.remove();break;default:g.remove(),f.remove(),
k.remove(),l.remove()}k=sprintf("privateComment_%s",_.uniqueId);d.find(".gradeValueCommentTextbox").val(a.gradeComment).attr("id",k).unbind("blur").on("blur",function(){m.gradeComment=$(this).val()});d.find(".gradeValueCommentTextboxLabel").attr("for",k);k=sprintf("privateComment_%s",_.uniqueId);d.find(".gradeValuePrivateCommentTextbox").val(a.gradePrivateComment).attr("id",k).unbind("blur").on("blur",function(){m.gradePrivateComment=$(this).val()});d.find(".gradeValuePrivateCommentTextboxLabel").attr("for",
k);d.find(".submitGradeValueChange").unbind("click").on("click",function(){var c=_.cloneDeep(m);delete c.remoteGrade;delete c.remoteComment;delete c.remotePrivateComment;sendStanza(c);a.gradeValue=m.gradeValue;a.gradeComment=m.gradeComment;a.gradePrivateComment=m.gradePrivateComment;console.log("sending:",m);w.closeAlert();q(v)});d.find(".cancelGradeValueChange").unbind("click").on("click",function(){w.closeAlert()});b.append(d)},n=[{name:"gradedUser",type:"text",title:"Who",readOnly:!0,sorting:!0},
{name:"timestamp",type:"dateField",title:"When",readOnly:!0,itemTemplate:function(a){return 0==a?"":moment(a).format("MMM Do YYYY, h:mm a")}},{name:"gradeValue",type:"text",title:"Score",readOnly:!0,sorting:!0},{name:"gradeComment",type:"text",title:"Comment",readOnly:!0,sorting:!0},{name:"gradePrivateComment",type:"text",title:"Private comment",readOnly:!0,sorting:!0}];"foreignRelationship"in e&&n.push({name:"remoteGrade",type:"text",title:"Remote score",readOnly:!0,sorting:!0},{name:"remoteComment",
type:"text",title:"Remote comment",readOnly:!0,sorting:!0},{name:"remotePrivateComment",type:"text",title:"Remote private comment",readOnly:!0,sorting:!0});g.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,rowClick:function(a){d(a.item)},noDataContent:"No gradeable users",controller:{loadData:function(b){_.forEach(a,function(a){if("foreignRelationship"in e&&e.id in l){var b=_.find(l[e.id],function(c){return c.gradedUser==a.gradedUser});void 0!=b&&("gradeValue"in b&&
!("remoteGradeValue"in a)&&(a.remoteGrade=b.gradeValue),"gradeComment"in b&&!("remoteComment"in a)&&(a.remoteComment=b.gradeComment),"gradePrivateComment"in b&&!("remotePrivateComment"in a)&&(a.remotePrivateComment=b.gradePrivateComment))}});if("sortField"in b){var d=_.sortBy(a,function(a){return a[b.sortField]});"sortOrder"in b&&"desc"==b.sortOrder&&(d=_.reverse(d));return d}return a}},pageLoading:!1,fields:n});g.jsGrid("loadData");g.jsGrid("sort",{field:"gradedUser",order:"desc"});if("foreignRelationship"in
e){var x=e.foreignRelationship.sys,n=e.foreignRelationship.key.split("_"),t=n[0],u=n[1];f.find(".getRemoteData").unbind("click").on("click",function(){var a=this;b(a,!0);$.getJSON(sprintf("/getExternalGradeValues/%s/%s/%s",x,t,u),function(d){l[e.id]=d;q(function(e){_.forEach(e,function(e){var c=_.find(d,function(a){return a.gradedUser==e.gradedUser});void 0!==c&&("gradeValue"in c&&(e.remoteGrade=c.gradeValue),"gradeComment"in c&&(e.remoteComment=c.gradeComment),"gradePrivateComment"in c&&(e.remotePrivateComment=
c.gradePrivateComment));b(a,!1)});return v(e)})}).fail(function(d,e,g){b(a,!1);console.log("error",e,g)})});f.find(".sendGradesToRemote").unbind("click").on("click",function(){var a=this;b(a,!0,function(a){return $(a).find("span")});var d=_.filter(k[e.id],function(a){return void 0!=a.gradeValue});$.ajax({type:"POST",data:JSON.stringify(d),dataType:"json",success:function(d){l[e.id]=d;q(function(e){_.forEach(e,function(a){var b=_.find(d,function(b){return b.gradedUser==a.gradedUser});void 0!==b&&("gradeValue"in
b&&(a.remoteGrade=b.gradeValue),"gradeComment"in b&&(a.remoteComment=b.gradeComment),"gradePrivateComment"in b&&(a.remotePrivateComment=b.gradePrivateComment))});b(a,!1);return v(e)})},url:sprintf("/updateExternalGradeValues/%s/%s/%s",x,t,u),contentType:"application/json"}).fail(function(d,e,c){b(a,!1);console.log("error",e,c)})})}else f.find(".gradeSyncActions").remove();b(f,!1)};q(v)});return h}return $("<span/>")}}],y=[{name:"myGradeValue",type:"text",title:"Score",readOnly:!0,sorting:!0},{name:"myGradeComment",
type:"text",title:"Comment",readOnly:!0,sorting:!0}],h=Conversations.shouldModifyConversation()?_.concat(h,u):_.concat(h,y);d.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,noDataContent:"No grades",controller:{loadData:function(b){var d=Conversations.shouldModifyConversation(),g=_.map(_.filter(B,function(a){return d||a.visible}),function(a){var b=k[a.id];void 0!==b&&(b=b[UserSettings.getUsername()],void 0!==b&&(a.myGradeValue=b.gradeValue,a.myGradeComment=b.gradeComment));
return a});"sortField"in b&&(g=_.sortBy(g,function(a){return a[b.sortField]}),"sortOrder"in b&&"desc"==b.sortOrder&&(g=_.reverse(g)));return g}},pageLoading:!1,fields:h});d.jsGrid("sort",{field:"timestamp",order:"desc"});t=function(){WorkQueue.enqueue(function(){d.jsGrid("loadData");var b=d.jsGrid("getSorting");"field"in b&&d.jsGrid("sort",b);E.unbind("click");Conversations.shouldModifyConversation()?E.unbind("click").on("click",function(){console.log("clicked createButton");if(Conversations.shouldModifyConversation()){var b=
Conversations.getCurrentSlideJid(),d=UserSettings.getUsername(),b={type:"grade",name:"",description:"",audiences:[],author:d,location:b,id:sprintf("%s_%s_%s",b,d,(new Date).getTime().toString()),gradeType:"numeric",numericMinimum:0,numericMaximum:100,visible:!1,timestamp:0};sendStanza(b)}}).show():E.hide()})};t()},u=function(){"jid"in Conversations.getCurrentConversation()?y():_.delay(u,500)};u()});return{getGrades:function(){return B},getGradeValues:function(){return k},reRender:t}}();
