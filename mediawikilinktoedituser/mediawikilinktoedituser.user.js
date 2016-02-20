// ==UserScript==
// @name         MediaWiki LinkToEditUser
// @namespace    http://openuserjs.org/users/ardiman
// @description  Gives on userpages of mediawikis a link to Special:EditUser (you'll need mw-extension EditUser on that wiki).
// @description:de-DE Erstellt auf Mediawiki-Benutzerseiten einen Link zu Special:EditUser (die Mediawiki-Erweiterung EditUser muss installiert sein).
// @grant        none
// @homepage     https://github.com/ardiman/userscripts/tree/master/mediawikilinktoedituser
// @icon         https://raw.githubusercontent.com/ardiman/userscripts/master/scriptlogo.gif
// @include      /wiki/(Benutzer|User).*/
// @include      /title=(Benutzer|User):.*&action=edit/
// @license      CC BY-NC-SA 3.0; https://creativecommons.org/licenses/by-nc-sa/3.0/
// @supportURL   https://github.com/ardiman/userscripts/issues
// @version      1.0.7
// @date         2016-02-20
// ==/UserScript==

var userName = encodeURI(mw.config.get("wgTitle"));
var ulMenu = document.evaluate("//div[@id='p-cactions']//div//ul", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
var liChConf = ulMenu.snapshotItem(0).appendChild(document.createElement('li'));
liChConf.innerHTML='<a href="/index.php?title=Special:EditUser&amp;username='+userName+'">Konfiguration</a>';