'use strict';

/* -- assets -- */
import './styles/styles.css'

/* -- modules -- */
import {Github} from "./http/modules/github.class";

/* -- Инициализируем DOM Elements -- */
const searchForm: HTMLElement = document.getElementById('js-search-issue');
const resultBlock: HTMLElement = document.getElementById('result');
const templateIssueBlock: HTMLElement = document.getElementById('js-issue');

/* -- Инициализируем сервисы, обработчики -- */
const github: Github = new Github();

/* -- Навешиваем события -- */
searchForm.addEventListener('submit', search);


/* -- Инициализируем функции -- */

/**
 * * Функция, возвращающая обработчик для формы поиска
 *
 * @param {Event} event
 */
function search(event: SubmitEvent): void {
    event.preventDefault();

    resultBlock.innerHTML = '';

    const elements: object = event.target.elements;

    github.listRepositoryIssues(elements.owner.value, elements.repo.value)
        .then(onSuccess)
        .catch(onError);
}

/**
 * Обработчик ошибки при неудачном запросе Github issue
 */
function onError(err: object): void {
    let p = document.createElement('p');
    p.innerText = `#${err.status} ${err.response.message}`;
    resultBlock.append(p);
}

/**
 * Обработчик данных при успешном запросе Github issue
 *
 * @param {Array} data
 */
function onSuccess(data: Array<object>): void {
    if (data.length === 0) {
        let p = document.createElement('p');
        p.innerText = `Issue не найдены`;
        resultBlock.append(p);

        return;
    }

    data.forEach(issueHandler);
}

/**
 * Обрабатывает issue и добавляет его на страницу
 *
 * @param issue
 */
function issueHandler(issue: object): void {
    let cloneTemplate = templateIssueBlock.content.cloneNode(true);

    cloneTemplate.querySelector('a').href = issue.html_url;
    cloneTemplate.querySelector('.issue-comment-number span').innerText = issue.comments;

    cloneTemplate
        .querySelector('.issue-title')
        .innerHTML = issue.labels.reduce((acc, curr) => {
        return  acc + ` <span style="color: white; background-color: #${curr.color}">${curr.name}</span>`
    }, issue.title);

    cloneTemplate
        .querySelector('.issue-subtitle')
        .innerText = `#${issue.number} opened by ${issue.user.login}`;

    resultBlock.append(cloneTemplate);
}