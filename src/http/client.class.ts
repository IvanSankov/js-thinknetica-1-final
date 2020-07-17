import './client.types.ts';

/**
 * Класс, создающий клиент для http запроса
 */
export default class Client {
    private readonly xmlHttpRequest: XMLHttpRequest;

    constructor() {
      this.xmlHttpRequest = new XMLHttpRequest();
    }

    /**
     * Метод, добавляющий обработчик на состояние передачи от сервера к клиенту (загрузка)
     */
    onProgress(fn: (event: ProgressEvent) => void): Client {
      this.xmlHttpRequest.addEventListener('progress', fn, false);

      return this;
    }

    /**
     * Метод, реализующий "GET" запрос
     */
    get(url: string): Promise<any> {
      this.xmlHttpRequest.open('GET', url);

      return this.request();
    }

    /**
     * Метод обрывающий запрос
     */
    abort(): void {
      this.xmlHttpRequest.abort();
    }

    /**
     * Метод, который делает запрос
     *
     * * Устанавливает тип возвращаемых значений как JSON
     */
    private request(): Promise<any> {
      this.xmlHttpRequest.responseType = 'json';

      return new Promise((resolve, reject) => {
        this.xmlHttpRequest.onload = () => {
          if (this.xmlHttpRequest.status !== 200) {
            reject({
              status: this.xmlHttpRequest.status,
              response: this.xmlHttpRequest.response,
            });

            return;
          }

          resolve(this.xmlHttpRequest.response);
        };

        this.xmlHttpRequest.send();
      });
    }
}
