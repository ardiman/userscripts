// ==UserScript==
// @name         vBulletin - Signature Collapse
// @namespace    http://openuserjs.org/users/ardiman
// @description  Allows quick display toggle of user's signature on vBulletin- and other forums.
// @description:de-DE Erlaubt schnelles Ausblenden/Anzeigen von Signaturen in vBulletin- und anderen Forensystemen.
// @grant        none
// @homepage     https://github.com/ardiman/userscripts/tree/master/vbulletinsignaturecollapse
// @icon         https://raw.githubusercontent.com/ardiman/userscripts/master/scriptlogo.gif
// @include      */showthread.php*
// @include      */showpost.php*
// @include      */viewtopic.php*
// @include      */index.php?showtopic=*
// @include      */index.php?topic=*
// @include      */index.php/topic=*
// @include      http://community.invisionpower.com/topic/*
// @include      http://forums.modx.com/thread/*
// @include      http://community.mybb.com/*
// @include      http://www.xendach.de/threads/*
// @license      CC BY-NC-SA 3.0; https://creativecommons.org/licenses/by-nc-sa/3.0/
// @supportURL   https://github.com/ardiman/userscripts/issues
// @version      1.0.9
// @date         2014-11-21
// ==/UserScript==

(function() {
	var nodes = document.evaluate(
		"//td/div/following::comment()[.=' sig ']|//div[@class='signaturecontainer']|//div[@class='dis-signature']|//div[contains(@class, 'signature')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var thissign;

	for(var i=0; i<nodes.snapshotLength; i++) {
		// vBulletin 3.x
		if (nodes.snapshotItem(i).data==' sig ') {
			thissign = nodes.snapshotItem(i).nextSibling.nextSibling;
			thissign.style.display = 'none';
			var anchor = document.createElement("a");
			anchor.appendChild(document.createTextNode("\u005B+]"));
			anchor.style.cursor = 'pointer';
			anchor.title = 'Click to expand signature';
			anchor.addEventListener('click', genHandler(thissign), false);
			thissign.parentNode.insertBefore(anchor, thissign.previousSibling);
		// vBulletin 4.x (signaturecontainer) or phpBB v3, xenForo (signature) or discuss on modx.com (dis-signature)
		} else {
			if (nodes.snapshotItem(i).className=="signaturecontainer" || nodes.snapshotItem(i).classList.contains("signature") || nodes.snapshotItem(i).className=="dis-signature") {
				thissign = nodes.snapshotItem(i);
				thissign.style.display = 'none';
				var anchor = document.createElement("a");
				anchor.appendChild(document.createTextNode("\u005B+]"));
				anchor.style.cursor = 'pointer';
				anchor.title = 'Click to expand signature';
				anchor.addEventListener('click', genHandler(thissign), false);
				thissign.parentNode.insertBefore(anchor, thissign);
			}
		}
	}
})();


function genHandler(signode) {
	return (function(event) {
			if(signode.style.display == 'none') {
			  signode.style.display='block';
			  // signode.removeAttribute("style");
			  this.firstChild.nodeValue=("[-]");
			  this.title = 'Click to collapse signature';
			 }
			else {
			  signode.style.display = 'none';
			  this.firstChild.nodeValue=("\u005B+]");
			  this.title = 'Click to expand signature';
		}
	});
}
