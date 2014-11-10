// ==UserScript==
// @name         FxForumNewTab
// @namespace    http://openuserjs.org/users/ardiman
// @description  Opens posted links in new tabs.
// @description:de-DE Öffnet Links in Beiträgen im neuen Tab.
// @grant        none
// @homepage     https://github.com/ardiman/userscripts/tree/master/fxforumnewtab
// @icon         https://raw.githubusercontent.com/ardiman/userscripts/master/scriptlogo.gif
// @include      http://www.camp-firefox.de/forum/*
// @version      1.0.4
// @date         2014-11-10
// ==/UserScript==

var res = document.evaluate("//a[@class='postlink-local']|//a[@class='postlink']", document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
for(var i = 0; i < res.snapshotLength; i++) {
  var elem = res.snapshotItem(i);
  elem.target = "_blank";
}
