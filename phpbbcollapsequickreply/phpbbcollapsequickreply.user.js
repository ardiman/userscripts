// ==UserScript==
// @name         phpBB CollapseQuickreply
// @namespace    http://openuserjs.org/users/ardiman
// @description  Adds a button which shows/hides the quick reply in phpBB boards.
// @description:de-DE Erstellt in phpBB-Foren einen Button, mit dem man die Schnellantwort ein-/ausblenden kann.
// @grant        none
// @homepage     https://github.com/ardiman/userscripts/tree/master/phpbbcollapsequickreply
// @icon         https://raw.githubusercontent.com/ardiman/userscripts/master/scriptlogo.gif
// @include       */viewtopic.php*
// @license      CC BY-NC-SA 3.0; https://creativecommons.org/licenses/by-nc-sa/3.0/
// @supportURL   https://github.com/ardiman/userscripts/issues
// @version      1.0.0
// @date         2016-02-21
// ==/UserScript==

$('#qr_postform').before('<div id="reprap" class="panel" style="text-align: center;"><input class="button2" type="submit" value="Schnellantwort anzeigen"></div>').css('display', 'none');
$('#reprap input[type=submit]').click(function(){
	$(this).parent().toggleClass('ouvert').next('#qr_postform').slideToggle();
	$('#reprap input[type=submit]').val('Schnellantwort anzeigen');
	$('#reprap.ouvert input[type=submit]').val('Schnellantwort verbergen');
});