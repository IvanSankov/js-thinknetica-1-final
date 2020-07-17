'use strict';

import {Client} from "../client.class";
import './github.types';


const BASE_URI: string = 'https://api.github.com/';

/**
 * Класс, реализующий все методы Github API (на самом деле нет, только один :-D )
 */
export class Github {
    private readonly _requests: object

    constructor() {
        this._requests = {}
    }

    /**
     * Метод, реализующий запрос https://developer.github.com/v3/issues/#list-repository-issues
     *
     * * Обрывает предыдущий запрос
     */
    async listRepositoryIssues(owner: string, repo: string): Promise<Array<IssueInterface>|HttpErrorInterface> {
        this._abortRequest('listRepositoryIssues');

        const client: Client = new Client();
        this._addRequest('listRepositoryIssues', client);

        return await client.get(`${BASE_URI}repos/${owner}/${repo}/issues`);
    }

    /**
     * Метод, обрывающий запрос клиента
     */
    private _abortRequest(key: string): boolean {
        const request: Client = this._requests[key];
        if (!request) {
            return false;
        }

        request.abort();
        return true
    }

    /**
     * Метод, сохраняющий клиент для определенного запроса
     */
    private _addRequest(key: string, client: Client): void {
        this._requests[key] = client;
    }
}