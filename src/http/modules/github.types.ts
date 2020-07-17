/**
 * Файл для хранения всех типов, для github.class.ts
 */

interface IssueInterface {
    html_url: string,
    comments: number,
    labels: Array<IssueLabelInterface>,
    title: string,
    number: number,
    user: IssueUserInterface
}

interface IssueLabelInterface {
    color: string,
    name: string
}

interface IssueUserInterface {
    login: string
}
