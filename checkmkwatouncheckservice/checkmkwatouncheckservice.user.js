// ==UserScript==
// @name         Check_MK - WATO Uncheck Service
// @namespace    http://openuserjs.org/users/ardiman
// @description  Automatically unchecks service in WATO/Services of host x by doubleclick
// @description:de-DE Entfernt automatisch den Haken bei WATO/Services für host x per Doppelklick
// @grant        GM_getValue
// @grant        GM_setValue
// @homepage     https://github.com/ardiman/userscripts/tree/master/checkmkwatouncheckservice
// @icon         https://raw.githubusercontent.com/ardiman/userscripts/master/scriptlogo.gif
// @include      */check_mk/wato.py?mode=inventory&host*
// @include      */check_mk/wato.py?filled_in=edithost*
// @include      */mdk/check_mk/wato.py?folder=&host=*&mode=inventory
// @version      1.0.0
// @date         2014-11-16
// ==/UserScript==

var cmkwatouncheckservice = {
	setting: {
		bgr: "blue",        // background of table cell with automatically unchecked checkbox
		speeks: false,      // show alert if "automatically unchecked" is changed
	},

	init: function() {
		// Zunächst das Deaktivieren vornehmen und anzeigen:
		var uncheckedservices = GM_getValue('cmkwatouncheckedservices','');
		var mySarr = uncheckedservices.split(";");
		for (var i = 0; i<mySarr.length; i++) {
			var myEle = document.getElementsByName(mySarr[i])[0];
			if (myEle != undefined) {
				myEle.checked = false;
				myEle.parentNode.parentNode.setAttribute('style','background: ' + cmkwatouncheckservice.setting["bgr"] + ';');
			}
		}

		// Checkboxen selektieren:
		var nodes = document.evaluate(
			"//span[@class='checkbox']/input[@type='checkbox']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

		// Checkboxen Doppelklick-Ereignis zuweisen, mit dem die entsprechende Einstellung gewählt wird
		for(var i = 0; i<nodes.snapshotLength; i++) {
			var thisNode = nodes.snapshotItem(i);
			var thisNodeName = thisNode.name;
			thisNode.ondblclick=function(event) {
				event.preventDefault();
				event.stopPropagation();
				var uncheckedservices = GM_getValue('cmkwatouncheckedservices','');
				var mySarr = uncheckedservices.split(";");
				var hit = mySarr.indexOf(this.name);
				if (hit === -1) {
					uncheckedservices = uncheckedservices + ";" + this.name;
					if (cmkwatouncheckservice.setting["speeks"]) {
						alert("Next page load will set checked=false for this input.");
					}
					this.parentNode.parentNode.setAttribute('style','background: ' + cmkwatouncheckservice.setting["bgr"] + ';');
				}
				else {
					mySarr.splice(hit, 1);
					uncheckedservices = mySarr.join(';');
					if (cmkwatouncheckservice.setting["speeks"]) {
						alert("Next page load won't change checked status for this input anymore.");
					}
					this.parentNode.parentNode.setAttribute('style','background: inherit;');
				}
				GM_setValue('cmkwatouncheckedservices',uncheckedservices);
			}
		}
	}
};
cmkwatouncheckservice.init();

