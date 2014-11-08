// ==UserScript==
// @name         vBulletin - Show full links
// @namespace    http://openuserjs.org/users/ardiman
// @description  Reveals truncated (...) links in vBulletin-forums.
// @description:de-DE  Zeigt gekürzte Links in vBulletin-Foren komplett an.
// @grant        none
// @homepage     https://github.com/ardiman/userscripts/tree/master/vbulletinshowfulllinks
// @include      */showthread.php*
// @include      */viewtopic.php?*
// @version      1.8
// @date         2014-11-07
// ==/UserScript==


(function () {
matchtext = new RegExp("/\.{3,3}[0-z]");
var rrdirect = 1;  //if = 1, then try to remove prefixes like "http://anonym.to/?" etc.

function changelinktext(link)
{
  var d = link.firstChild.nodeValue;
  var u = link.href;
  match = matchtext.exec(d);
  if (match) {
    var linkparts = d.split("...");
    var a = u.indexOf(fcttrim(linkparts[0]));
    var z = 0;
    if (linkparts[1]){
      z = u.indexOf(fcttrim(linkparts[1]));
    }
    if (a != -1 && z != -1) {
      if (rrdirect == 1) {
        link.firstChild.nodeValue = u.slice(a);
        } else {
        link.firstChild.nodeValue = u;
      }
    }
  }
}


function fcttrim(a_str) {
  return a_str.replace(/ +/g, ' ').replace(/^\s+/g, '').replace(/\s+$/g, '');
}


urlarray = document.evaluate(
  '//a[@href]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for(var i = 0; i < urlarray.snapshotLength; i++) {
  link = urlarray.snapshotItem(i);
  if (link.firstChild) {
    changelinktext(link);
  }
}
})();