import Client from '../client.class.ts';
import './github.types.ts';

const BASE_URI = 'https://api.github.com/';

/**
 * Класс, реализующий все методы Github API (на самом деле нет, только один :-D )
 */
export default class Github {
    private readonly requests: Record<string, Client>

    constructor() {
      this.requests = {};
    }

    /**
     * Метод, реализующий запрос https://developer.github.com/v3/issues/#list-repository-issues
     *
     * * Обрывает предыдущий запрос
     */
    async listRepositoryIssues(
      owner: string,
      repo: string,
    ): Promise<Array<IssueInterface>|HttpErrorInterface> {
      this.abortRequest('listRepositoryIssues');

      const client: Client = new Client();
      this.addRequest('listRepositoryIssues', client);

      const response = client.get(`${BASE_URI}repos/${owner}/${repo}/issues`);
      return response;
    }

    /**
     * Метод, обрывающий запрос клиента
     */
    private abortRequest(key: string): boolean {
      const request: Client = this.requests[key];
      if (!request) {
        return false;
      }

      request.abort();
      return true;
    }

    /**
     * Метод, сохраняющий клиент для определенного запроса
     */
    private addRequest(key: string, client: Client): void {
      this.requests[key] = client;
    }
}
