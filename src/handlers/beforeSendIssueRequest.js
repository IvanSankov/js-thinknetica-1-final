'use strict';

/**
 * Функция-обработчик, выполняющаяся перед отправкой запроса на поиск Github issue
 *
 * @param {HTMLElement} notificationBlock
 * @return {function}
 */
export function beforeSendIssueRequest(notificationBlock) {
    return function () {
        notificationBlock.innerHTML = '';
    }
}