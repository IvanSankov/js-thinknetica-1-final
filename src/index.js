'use strict';

/* -- assets -- */
import './styles/styles.css'

/* -- modules -- */
import {Github} from "./http/modules/github.class";
import {badIssueRequest} from "./handlers/badIssueRequest";
import {successfulIssueRequest} from "./handlers/successfulIssueRequest";
import {beforeSendIssueRequest} from "./handlers/beforeSendIssueRequest";
import {search} from "./handlers/search";

/* -- Инициализируем DOM Elements -- */
const searchForm = document.getElementById('js-search-issue');
const resultBlock = document.getElementById('result');
const templateIssueBlock = document.getElementById('js-issue');

/* -- Инициализируем сервисы, обработчики -- */
const github = new Github();
const badIssueRequestHandler = badIssueRequest(resultBlock);
const successfulIssueRequestHandler = successfulIssueRequest(resultBlock, templateIssueBlock);
const beforeSendIssueRequestHandler = beforeSendIssueRequest(resultBlock);
const searchHandler = search({
    searchMethod: github.listRepositoryIssues.bind(github),
    beforeSend: beforeSendIssueRequestHandler,
    onSuccess: successfulIssueRequestHandler,
    onError: badIssueRequestHandler
});

/* -- Навешиваем события -- */
searchForm.addEventListener('submit', searchHandler);