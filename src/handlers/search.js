'use strict';

/**
 * Функция, возвращающая обработчик для формы поиска
 *
 * @param {function} searchMethod
 * @param {function} onSuccess
 * @param {function} onError
 * @returns {function}
 */
function search(searchMethod, onSuccess, onError) {
    return function (event) {
        event.preventDefault();

        const elements = event.target.elements;

        searchMethod(elements.owner.value, elements.repo.value)
            .then(onSuccess)
            .catch(onError);
    }
}