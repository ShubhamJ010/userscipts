// ==UserScript==
// @name         Fast Page Scroll (Z/X)
// @namespace    https://violentmonkey.github.io/
// @version      1.0
// @description  Z = scroll up 3/4 screen, X = scroll down 3/4 screen
// @author       Shubham
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function isTypingTarget(element) {
        if (!element) return false;

        const tag = element.tagName?.toLowerCase();

        return (
            tag === 'input' ||
            tag === 'textarea' ||
            element.isContentEditable
        );
    }

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;

        if (isTypingTarget(document.activeElement)) return;

        const amount = window.innerHeight * 0.75;

        if (event.key.toLowerCase() === 'z') {
            window.scrollBy({
                top: -amount,
                behavior: 'smooth'
            });
        }

        if (event.key.toLowerCase() === 'x') {
            window.scrollBy({
                top: amount,
                behavior: 'smooth'
            });
        }
    });
})();
