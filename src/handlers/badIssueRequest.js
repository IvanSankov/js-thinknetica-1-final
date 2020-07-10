'use strict';

/**
 * Обработчик ошибки при неудачном запросе Github issue
 *
 * @param {HTMLElement} notificationBlock
 * @returns {function(...[*]=)}
 */
function badIssueRequest(notificationBlock) {
    return function (err) {
        let p = document.createElement('p');
        p.innerText = `#${err.status} ${err.response.message}`;
        notificationBlock.append(p);
    }
}