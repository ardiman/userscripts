﻿// ==UserScript==
// @name         phpBB New Topics
// @namespace    http://openuserjs.org/users/ardiman
// @description  Generates button which opens all new topics of phpBB3-boards in tabs.
// @description:de-DE Neben dem Button "Neues Thema" wird eine Schaltfläche erstellt, die alle neuen Posts in Tabs öffnet.
// @grant        GM_openInTab
// @homepage     https://github.com/ardiman/userscripts/tree/master/phpbbnewtopics
// @icon         https://raw.githubusercontent.com/ardiman/userscripts/master/scriptlogo.gif
// @include      */viewforum.php*
// @license      CC BY-NC-SA 3.0; https://creativecommons.org/licenses/by-nc-sa/3.0/
// @supportURL   https://github.com/ardiman/userscripts/issues
// @version      1.0.7
// @date         2017-01-18
// ==/UserScript==
 
(function (){
 
// Konfiguration
var maxlnks = 0;  // 0=open all new threads, 10=open first 10 new threads
var showBtnIf = 1; // 0=button will always be shown, 5=show only, if there are more than 4 new threads
var useTimeout = true; // don't attempt delay on thread-read cookie setting - YMMV - the timeout delay didn't work for me, so =false
var tOut = 800;   // set timeout in milliseconds for opening (cookies won't be stored if too low!)
var oMode = false; // =true: show first *unread* post, =false: show first post/beginning of thread
// Ende der Konfiguration
 
/* x-browser event register */
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) { elm.addEventListener(evType, fn, useCapture); return true; }
    else if (elm.attachEvent) { var r = elm.attachEvent('on' + evType, fn); return r; }
    else { elm['on' + evType] = fn; }
}
 
/* x-browser open tab */
function openTab(url) {
    if (typeof GM_openInTab != 'undefined') GM_openInTab(url);
    // if (typeof GM_openInTab != 'undefined') chromeWin.openNewTabWith(url,url,null,true);
    else if (typeof PRO_openInTab != 'undefined') PRO_openInTab(url,2);
    else window.open(url);
}
 
var f = 0;
var newposts = new Array();
// alle Links zu neuen Beitraegen finden (alte Codes fuer aeltere phpBB-Versionen)
// var lnks = document.evaluate("//a[contains(@href,'&view=unread#unread')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
// var lnks = document.evaluate("//a[contains(@href,'&view=unread#unread') and not(contains(@class, 'icon-link'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
var lnks = document.evaluate("//a[contains(@href,'&view=unread#unread') and not(contains(@class, 'row-item-link'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
 
for (var i=0; i < lnks.snapshotLength; i++) {
  thisnode = lnks.snapshotItem(i);
  if (oMode) {
    newposts.push(thisnode.href);  // den direkten Link zum ungelesen Beitrag speichern
   } else {
    newposts.push(thisnode.href.replace(/&view=unread#unread/, ""));  // (bereinigten) Link zum Thread speichern
  }
  f++
  // falls nur die ersten x neuen Beitraege geoeffnet werden sollen, dann raus hier:
  if (f+1 > maxlnks && maxlnks > 0) break;
}
 
// Button generieren, sofern noetig
if (f >= showBtnIf) {
  // Zieldiv finden (alte Codes fuer aeltere phpBB-Versionen)
  // var targetnode = document.evaluate("//div[@class='buttons']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var targetnode = document.evaluate("//div[@class='action-bar bar-top']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  // normalerweise ist erster div-Abschnitt mit class=buttons {snapshotItem(0)} derjenige mit dem Button "NeuesThema" -> da soll's also hin
  var btn = targetnode.snapshotItem(0).appendChild(document.createElement('button'));
  if (f > 1) {
    btn.innerHTML = "&Ouml;ffne " + f + " neue Beitr&auml;ge";
   } else {
    btn.innerHTML = "&Ouml;ffne neuen Beitrag";
  }
  btn.style.background='#EEEEEE';
  btn.style.color='#BC2A4D';
  btn.style.fontWeight='bold';
  btn.style.fontSize='0.9em';
  btn.style.height='25px';
  btn.style.padding='0px 8px';
  addEvent(btn, "click",
    function(e) {
      if (maxlnks==0) this.style.display = 'none';
      if (e && e.target) e.preventDefault();
      else window.event.returnValue = false;
      if (useTimeout) {
        var i = -1;
        function inner() {
          if(++i < f) openTab(newposts[i]);
          else clearInterval(timer);
        }
        var timer = setInterval(inner, tOut);
      } else {
        for (var i=0; i < newposts.length; i++)
          openTab(newposts[i]);
      }
    }
  , false);
  }
})();
 
 