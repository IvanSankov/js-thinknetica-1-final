'use strict';

/**
 * Обработчик данных при успешном запросе Github issue
 *
 * @param {HTMLElement} notificationBlock
 * @param {HTMLTemplateElement} childBlockTemplate
 * @returns {function(...[*]=)}
 */
function successfulIssueRequest(notificationBlock, childBlockTemplate) {

    /**
     * Обрабатывает issue и добавляет его на страницу
     *
     * @param {Object} issue
     */
    function issueHandler(issue) {
        let cloneTemplate = childBlockTemplate.content.cloneNode(true);

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

        notificationBlock.append(cloneTemplate);
    }

    return function (data) {
        if (data.length === 0) {
            let p = document.createElement('p');
            p.innerText = `Issue не найдены`;
            notificationBlock.append(p);

            return;
        }

        data.forEach(issueHandler);
    }
}