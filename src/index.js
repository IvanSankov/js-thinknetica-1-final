'use strict';

/* -- Инициализируем сервисы, обработчики -- */
const github = new Github();
const searchHandler = search(github.listRepositoryIssues.bind(github));

/* -- Инициализируем DOM Elements -- */
const searchForm = document.getElementById('js-search-issue');

/* -- Навешиваем события -- */
searchForm.addEventListener('submit', searchHandler);