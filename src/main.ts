/* -- assets -- */
import './main.types.ts';
import './styles/styles.css';

/* -- modules -- */
import Github from './http/modules/github.class.ts';

/* -- Инициализируем DOM Elements -- */
const searchForm: HTMLElement = document.getElementById('js-search-issue');
const resultBlock: HTMLElement = document.getElementById('result');
const templateIssueBlock: HTMLTemplateElement = <HTMLTemplateElement>document.getElementById('js-issue');

/* -- Инициализируем сервисы, обработчики -- */
const github: Github = new Github();

/* -- Инициализируем функции -- */

/**
 * Обрабатывает issue и добавляет его на страницу
 *
 * @param issue
 */
function issueHandler(issue: IssueInterface): void {
  const cloneTemplate: DocumentFragment = <DocumentFragment>templateIssueBlock
    .content.cloneNode(true);

  const commentWrapper: HTMLSpanElement = <HTMLSpanElement>cloneTemplate.querySelector('.issue-comment-number span');
  commentWrapper.innerText = issue.comments.toString();

  cloneTemplate.querySelector('a').href = issue.html_url;

  cloneTemplate
    .querySelector('.issue-title')
    .innerHTML = issue.labels.reduce((acc, curr) => `${acc} <span style="color: white; background-color: #${curr.color}">${curr.name}</span>`, issue.title);

  const issueSubtitleWrapper: HTMLSpanElement = <HTMLSpanElement>cloneTemplate.querySelector('.issue-subtitle');
  issueSubtitleWrapper.innerText = `#${issue.number} opened by ${issue.user.login}`;

  resultBlock.append(cloneTemplate);
}

/**
 * Обработчик ошибки при неудачном запросе Github issue
 */
function onError(err: HttpErrorInterface): void {
  const p = document.createElement('p');
  p.innerText = `#${err.status} ${err.response.message}`;
  resultBlock.append(p);
}

/**
 * Обработчик данных при успешном запросе Github issue
 *
 * @param {Array} data
 */
function onSuccess(data: Array<IssueInterface>): void {
  if (data.length === 0) {
    const p = document.createElement('p');
    p.innerText = 'Issue не найдены';
    resultBlock.append(p);

    return;
  }

  data.forEach(issueHandler);
}

/**
 * * Функция, возвращающая обработчик для формы поиска
 *
 * @param {Event} event
 */
function search(event: SearchSubmitEventInterface): void {
  event.preventDefault();

  resultBlock.innerHTML = '';

  const { elements } = event.target;

  github.listRepositoryIssues(elements.owner.value, elements.repo.value)
    .then(onSuccess)
    .catch(onError);
}

/* -- Навешиваем события -- */
searchForm.addEventListener('submit', search);
