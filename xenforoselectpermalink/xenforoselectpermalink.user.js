// ==UserScript==
// @name         xenForo - Select Permalink
// @namespace    http://openuserjs.org/users/ardiman
// @description  Selects whole permalink-code in xenForo-boards with one click.
// @description:de-DE Markiert in xenForo-Foren den gesamten Permalink-Code mit einem einfachen Klick.
// @grant        none
// @homepage     https://github.com/ardiman/userscripts/tree/master/xenforoselectpermalink
// @icon         https://raw.githubusercontent.com/ardiman/userscripts/master/scriptlogo.gif
// @include      http://xenforo.com/community/threads/*
// @include      http://www.xendach.de/threads/*
// @version      1.0.4
// @date         2014-11-11
// ==/UserScript==

$( document ).on( "click", "#bb_code_link_snippet,#html_link_code", function() {
  $(this).focus();
  $(this).select();
});
