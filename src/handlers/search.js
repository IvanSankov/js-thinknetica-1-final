'use strict';

/**
 * Функция, возвращающая обработчик для формы поиска
 *
 * @param {function} searchMethod
 * @param {function} beforeSend
 * @param {function} onSuccess
 * @param {function} onError
 * @returns {function}
 */
export function search({searchMethod, beforeSend, onSuccess, onError}) {
    return function (event) {
        event.preventDefault();

        beforeSend();

        const elements = event.target.elements;

        searchMethod(elements.owner.value, elements.repo.value)
            .then(onSuccess)
            .catch(onError);
    }
}