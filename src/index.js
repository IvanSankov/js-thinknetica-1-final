'use strict';

/* -- assets -- */
import './styles/styles.css'

/* -- modules -- */
import {Github} from "./http/modules/github.class";

/* -- Инициализируем DOM Elements -- */
const searchForm = document.getElementById('js-search-issue');
const resultBlock = document.getElementById('result');
const templateIssueBlock = document.getElementById('js-issue');

/* -- Инициализируем сервисы, обработчики -- */
const github = new Github();

/* -- Навешиваем события -- */
searchForm.addEventListener('submit', search);


/* -- Инициализируем функции -- */

/**
 * * Функция, возвращающая обработчик для формы поиска
 *
 * @param {Event} event
 */
function search(event) {
    event.preventDefault();

    resultBlock.innerHTML = '';

    const elements = event.target.elements;

    github.listRepositoryIssues(elements.owner.value, elements.repo.value)
        .then(onSuccess)
        .catch(onError);
}

/**
 * Обработчик ошибки при неудачном запросе Github issue
 */
function onError(err) {
    let p = document.createElement('p');
    p.innerText = `#${err.status} ${err.response.message}`;
    resultBlock.append(p);
}

/**
 * Обработчик данных при успешном запросе Github issue
 *
 * @param {Array} data
 */
function onSuccess(data) {
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
function issueHandler(issue) {
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