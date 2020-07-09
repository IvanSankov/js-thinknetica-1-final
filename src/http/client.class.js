'use strict';

/**
 * Класс, создающий клиент для http запроса
 */
class Client {
    constructor() {
        this._xhr = new XMLHttpRequest();
    }

    /**
     * Метод, добавляющий обработчик на состояние передачи от сервера к клиенту (загрузка)
     *
     * @param {function} fn
     * @returns {this}
     */
    onProgress(fn) {
        this._xhr.addEventListener("progress", fn, false);

        return this;
    }

    /**
     * Метод, реализующий "GET" запрос
     *
     * @param {string} url
     * @returns {Promise<unknown>}
     */
    get(url) {
        this._xhr.open('GET', url);

        return this._request();
    }

    /**
     * Метод обрывающий запрос
     */
    abort() {
        this._xhr.abort();
    }

    /**
     * Метод, который делает запрос
     *
     * * Устанавливает тип возвращаемых значений как JSON
     *
     * @returns {Promise<unknown>}
     * @private
     */
    _request() {
        this._xhr.responseType = 'json';

        return new Promise((resolve, reject) => {
            this._xhr.onload = () => {
                if (this._xhr.status !== 200) {
                    reject({
                        status: this._xhr.status,
                        response: this._xhr.response
                    });

                    return;
                }

                resolve(this._xhr.response);
            }

            this._xhr.send();
        });
    }
}