// ==UserScript==
// @name         xenForo - Select Permalink
// @namespace    http://openuserjs.org/users/ardiman
// @description  Selects whole permalink-code in xenForo-boards with one click.
// @grant        none
// @include      http://xenforo.com/community/threads/*
// @include      http://www.xendach.de/threads/*
// @version      1.0.1
// @date         2014-02-09
// ==/UserScript==

$( document ).on( "click", "#bb_code_link_snippet,#html_link_code", function() {
  $(this).focus();
  $(this).select();
});
