(function(){"use strict";var tk=document.currentScript?.dataset?.extensionToken||"";if(!tk)throw Error("Missing token");

var _setupDone=false;
function setup(){
  if(_setupDone)return;_setupDone=true;
  var tb=document.getElementById("sjmcl-main-drag-region")?.parentElement;
  if(!tb)return;
  tb.setAttribute("data-ath","");
  var s=document.getElementById("ath-s");
  if(!s){s=document.createElement("style");s.id="ath-s";
    s.textContent='[data-ath]{opacity:0!important;pointer-events:none!important;transform:translateY(-100%)!important;z-index:999999!important;transition:opacity .12s,transform .12s!important}[data-ath].ath-s{opacity:1!important;pointer-events:auto!important;transform:translateY(0)!important}#ath-drag{position:fixed;top:0;left:0;right:0;height:8px;z-index:999998;-webkit-app-region:drag}';
    document.head.appendChild(s);}
  var dg=document.getElementById("ath-drag");
  if(!dg){dg=document.createElement("div");dg.id="ath-drag";document.body.appendChild(dg);}
  var showing=false,ht;
  function sh(){clearTimeout(ht);if(!showing){tb.classList.add("ath-s");showing=true;}}
  function hi(d){clearTimeout(ht);ht=setTimeout(function(){tb.classList.remove("ath-s");showing=false;},d||180);}
  var _om=function(e){if(e.clientY<20)sh();};
  document.addEventListener("mousemove",_om);
  tb.addEventListener("mouseleave",function(e){if(e.clientY>20||(!dg.contains(e.relatedTarget)&&!e.relatedTarget?.closest?.("#ath-drag")))hi(180);});
  dg.addEventListener("mouseleave",function(e){if(!tb.contains(e.relatedTarget))hi(180);});
  tb._athCln=function(){document.removeEventListener("mousemove",_om);clearTimeout(ht);};
}

function enable(){document.body.dataset.atEnabled="1";setup();}
function disable(){delete document.body.dataset.atEnabled;var tb=document.querySelector("[data-ath]");if(tb){if(tb._athCln)tb._athCln();tb.removeAttribute("data-ath");tb.style.opacity="";tb.style.pointerEvents="";tb.style.transform="";tb.style.transition="";tb.style.zIndex="";}var dg=document.getElementById("ath-drag");if(dg)dg.remove();var s=document.getElementById("ath-s");if(s)s.remove();_setupDone=false;}

window.registerExtension(function(api){
  var R=api.React,C=api.ChakraUI,H=api.getHostContext(),X=H.actions;
  X.readFile("data/enabled.txt").then(function(t){if(t.trim()==="true"){var p=function(){var tb=document.getElementById("sjmcl-main-drag-region")?.parentElement;if(tb){enable();return;}setTimeout(p,300);};p();}}).catch(function(){});
  return{homeWidget:{title:"\u9690\u85cf\u6807\u9898\u680f",defaultWidth:280,minWidth:220,Component:function(){
    var ch=R.useState(document.body.dataset.atEnabled==="1"),on=ch[0],set=ch[1];
    function dt(){var n=!on;set(n);document.body.dataset.atEnabled=n?"1":"0";X.writeFile("data/enabled.txt",n?"true":"false").catch(function(){});n?enable():disable();}
    return R.createElement(C.HStack,{align:"center",spacing:2,p:2},
      R.createElement(C.Text,{fontSize:"sm",flex:1},"\u81ea\u52a8\u9690\u85cf\u6807\u9898\u680f"),
      R.createElement(C.Switch,{isChecked:on,onChange:dt,colorScheme:"blue",size:"sm"}));}},
  settingsPage:{Component:function(){
    var ch=R.useState(document.body.dataset.atEnabled==="1"),on=ch[0],set=ch[1];
    function dt(){var n=!on;set(n);document.body.dataset.atEnabled=n?"1":"0";X.writeFile("data/enabled.txt",n?"true":"false").catch(function(){});n?enable():disable();}
    return R.createElement(C.VStack,{align:"stretch",spacing:4,p:4},
      R.createElement(C.Text,{fontSize:"lg",fontWeight:"bold"},"\u81ea\u52a8\u9690\u85cf\u6807\u9898\u680f"),
      R.createElement(C.HStack,{align:"center",justify:"space-between"},
        R.createElement(C.Text,{fontSize:"sm"},"\u542f\u7528\u81ea\u52a8\u9690\u85cf"),
        R.createElement(C.Switch,{isChecked:on,onChange:dt,colorScheme:"blue"})));}}};},tk);})()