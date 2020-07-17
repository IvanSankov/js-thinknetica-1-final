'use strict';

import './client.types';

/**
 * Класс, создающий клиент для http запроса
 */
export class Client {
    private readonly _xhr: XMLHttpRequest;

    constructor() {
        this._xhr = new XMLHttpRequest();
    }

    /**
     * Метод, добавляющий обработчик на состояние передачи от сервера к клиенту (загрузка)
     */
    onProgress(fn: (event: ProgressEvent) => void): Client {
        this._xhr.addEventListener("progress", fn, false);

        return this;
    }

    /**
     * Метод, реализующий "GET" запрос
     */
    get(url: string): Promise<any> {
        this._xhr.open('GET', url);

        return this._request();
    }

    /**
     * Метод обрывающий запрос
     */
    abort(): void {
        this._xhr.abort();
    }

    /**
     * Метод, который делает запрос
     *
     * * Устанавливает тип возвращаемых значений как JSON
     */
    private _request(): Promise<any> {
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