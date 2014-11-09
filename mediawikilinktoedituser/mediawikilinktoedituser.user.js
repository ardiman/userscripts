// ==UserScript==
// @name         MediaWiki LinkToEditUser
// @namespace    http://openuserjs.org/users/ardiman
// @description  Gives on userpages of mediawikis a link to Special:EditUser (you'll need mw-extension EditUser on that wiki).
// @description:de-DE Erstellt auf Mediawiki-Seiten einen Link zu Special:EditUser (die Mediawiki-Erweiterung EditUser muss installiert sein).
// @grant        none
// @homepage     https://github.com/ardiman/userscripts/tree/master/mediawikilinktoedituser
// @include      /wiki/(Benutzer|User).*/
// @include      /title=(Benutzer|User):.*&action=edit/
// @version      1.0.2
// @date         2014-11-09
// ==/UserScript==

var h1First = document.evaluate("//h1[@id='firstHeading']//span", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
var userName = h1First.snapshotItem(0).innerHTML.replace(/ /g,"+").replace(/“/g,"").replace(/\/.*/g,"");
userName = encodeURI(userName.substring(userName.lastIndexOf(":")+1));

var ulMenu = document.evaluate("//div[@id='p-cactions']//div//ul", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
var liChConf = ulMenu.snapshotItem(0).appendChild(document.createElement('li'));

liChConf.innerHTML='<a href="/index.php?title=Special:EditUser&amp;username='+userName+'">Konfiguration</a>';