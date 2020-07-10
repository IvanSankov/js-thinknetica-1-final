'use strict';

/**
 * Функция, возвращающая обработчик для формы поиска
 *
 * @param {function} searchMethod
 * @returns {function}
 */
function search(searchMethod) {
    return function (event) {
        event.preventDefault();

        const elements = event.target.elements;

        searchMethod(elements.owner.value, elements.repo.value)
            .then(console.log)
            .catch(console.log);
    }
}