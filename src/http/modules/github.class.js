'use strict';

const BASE_URI = 'https://api.github.com/';

/**
 * Класс, реализующий все методы Github API (на самом деле нет, только один :-D )
 */
class Github {
    constructor() {
        this._requests = {}
    }

    /**
     * Метод, реализующий запрос https://developer.github.com/v3/issues/#list-repository-issues
     *
     * * Обрывает предыдущий запрос
     *
     * @param {string} owner
     * @param {string} repo
     * @returns {Promise<unknown>}
     */
    async listRepositoryIssues(owner, repo) {
        this._abortRequest('listRepositoryIssues');

        const client = new Client();
        this._addRequest('listRepositoryIssues', client);

        return await client.get(`${BASE_URI}repos/${owner}/${repo}/issues`);
    }

    /**
     * Метод, обрывающий запрос клиента
     *
     * @param {string} key
     * @returns {boolean}
     * @private
     */
    _abortRequest(key) {
        const request = this._requests[key];
        if (!request) {
            return false;
        }

        request.abort();
        return true
    }

    /**
     * Метод, сохраняющий клиент для определенного запроса
     *
     * @param {string} key
     * @param {Client} client
     * @private
     */
    _addRequest(key, client) {
        this._requests[key] = client;
    }
}