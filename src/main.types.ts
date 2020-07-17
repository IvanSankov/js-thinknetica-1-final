/**
 * Все типы для main.ts
 */

interface SearchSubmitEventInterface extends Event {
    target: SearchEventTargetInterface
}

interface SearchEventTargetInterface extends EventTarget {
    elements: SearchFormElementsInterface
}

interface SearchFormElementsInterface {
    owner: FormElementInterface,
    repo: FormElementInterface
}

interface FormElementInterface {
    value: string,
}
