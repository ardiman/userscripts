// ==UserScript==
// @name         xenForo - Endless Forum Pages
// @namespace    http://openuserjs.org/users/ardiman
// @description  Makes xenForo forum pages infinitely long instead of a limited number of posts per page by loading more when you scroll to near the bottom of the page.
// @description:de-DE Lädt in xenForo-Threads die folgenden Beiträge nach, sobald man bei einem mehrseitigen Thread ans Ende der Seite scrollt.
// @grant        none
// @homepage     https://github.com/ardiman/userscripts/tree/master/xenforoendlessforumpages
// @include      http://xenforo.com/community/threads/*
// @include      http://www.xendach.de/threads/*
// @version      1.0.2
// @date         2014-11-09
// ==/UserScript==

var nextURL = null; // the URL for next, or null for pending/none
var nextLinkNode = null; // the node of the "Next" link
var mainTable = null;
window.addEventListener("load", init, false);

// Check the scroll position on a timer because we can't use onscroll (bug 189308).
// If we do switch to onscroll, remember to call testScrollPosition after changing the page.
setInterval(testScrollPosition, 100);

function init()
{
  mainTable = findMainTable(document);
  nextLinkNode = findNextLink(document);
  setNextURL(document);
}

function testScrollPosition()
{
  if ((nextURL != null) && ((document.documentElement.offsetHeight - document.documentElement.scrollTop) < (2.5 * window.innerHeight))) {
    // We're near the bottom of the page; one press of pgdn could get close to the bottom of the page.
    // (At about 1.9 * window.innerHeight, one press of pgdn would actually hit the bottom of the page.)
    pullMore();
  }
}

function pullMore()
{
  var iframe = document.createElement("iframe");
  iframe.addEventListener("load", whee, false);
  iframe.width = 1;
  iframe.height = 1;
  iframe.style.visibility = "hidden";
  iframe.src = nextURL;
  document.body.appendChild(iframe);
  // Don't pull this more than once.
  nextURL = null;

  function whee() {
    var iframeDoc = iframe.contentDocument;

    // Update nextURL for when we reach the bottom of the page again.
    setNextURL(iframeDoc);

    // Update the "Next" link in the page to make it a little less confusing.
    // Commented out because updating the "Next" link at the top of the page but not the one at
    // the bottom of the page is no good.
    // nextLinkNode.href = nextURL || "javascript:alert('No more!')";

    // Move posts into the main page's table.
    siphon(findMainTable(iframeDoc), mainTable);

    // Get rid of the iframe to free memory once it's GCed and so on.
    // Use a setTimeout to work around bug 305471 and to spread out the CPU usage to keep Firefox responsive.
    setTimeout( function() { iframe.parentNode.removeChild(iframe); }, 1500);
  }
}

function findMainTable(doc)
{
  div=doc.getElementById("messageList");
  return div;
}

function findNextLink(doc)
{
  for (var link,i=0; link=doc.links[i]; ++i)
    if ((link.innerHTML.indexOf(" >") != -1 || link.text.indexOf(" >") != -1) && link.getAttribute("href").indexOf("page-") != -1) {
      return link;
    }
  return null;
}

function setNextURL(doc)
{
  var nextLink = findNextLink(doc)

  if (nextLink)
    nextURL = nextLink.href;
}

function siphon(sourceTable, destTable)
{
  var child;
  while ((child = sourceTable.childNodes[0]))
    destTable.appendChild(child);
}
