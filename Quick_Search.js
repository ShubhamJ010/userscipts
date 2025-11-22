// ==UserScript==
// @name         Search for selected text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Shubham Jha
// @include      https://*
// @include      http://*


// @grant        GM_openInTab
// ==/UserScript==

// Instructions:
//   highlight text on any page, and press y to search on youtube or w to search on wikipedia

(function() {
  'use strict';

  function searchWikipediaForSelectedText() {
    let selectedText = getSelection()
      .toString()
      .trim()
      .replace(/ /g, '_');
    if (selectedText) {
      GM_openInTab("https://www.google.com/search?q=" + selectedText);
    }
  }

  function searchYouTubeForSelectedText() {
    let selectedText = getSelection()
      .toString()
      .trim()
      .replace(/ /g, '+');
    console.log(selectedText);
    if (selectedText) {
      GM_openInTab("https://www.youtube.com/results?search_query=" + selectedText);
    }
  }

  window.addEventListener("keydown",
    function(event) {
      if (event.defaultPrevented ||
        /(input|textarea)/i.test(document.activeElement.nodeName)) {
        return;
      }
    //console.log(getSelection());
      let ST = getSelection()
      .toString()
      .trim()
      .replace(/ /g, '+');
    if(ST)
     { switch (event.key) {
        case "y":
        /* fall through */
        case "Y":
          searchYouTubeForSelectedText();
          break;
        case "g":
        /* fall through */
        case "G":
          searchWikipediaForSelectedText();
          break;
        default:
          return;
      }
      
      event.preventDefault();
     }
      }
    ,
    true//useCapture
  );

})();
