// ==UserScript==
// @name         Naukri - Select 5 Jobs
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a "Select 5" button to each job that checks it and the next 4 jobs
// @author       sj
// @match        https://www.naukri.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const STYLE = document.createElement('style');
    STYLE.textContent = `
        .select5-btn {
            background: #4563e6;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            margin-left: 8px;
            white-space: nowrap;
            transition: background 0.2s;
        }
        .select5-btn:hover {
            background: #3248b5;
        }
    `;
    document.head.appendChild(STYLE);

    function addButtons() {
        const articles = document.querySelectorAll('article.jobTuple');

        articles.forEach((article) => {
            if (article.dataset.select5Added) return;
            article.dataset.select5Added = 'true';

            const footer = article.querySelector('.jobTupleFooter');
            if (!footer) return;

            const btn = document.createElement('button');
            btn.className = 'select5-btn';
            btn.textContent = 'Select 5';

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const targets = [article];
                let next = article.nextElementSibling;
                let count = 0;

                while (next && count < 4) {
                    if (next.classList.contains('jobTuple')) {
                        targets.push(next);
                        count++;
                    }
                    next = next.nextElementSibling;
                }

                targets.forEach((a, i) => {
                    setTimeout(() => {
                        const cb = a.querySelector('.tuple-check-box');
                        if (cb) cb.click();
                    }, i * 100);
                });
            });

            footer.appendChild(btn);
        });
    }

    addButtons();

    const observer = new MutationObserver(addButtons);
    observer.observe(document.body, { childList: true, subtree: true });
})();
