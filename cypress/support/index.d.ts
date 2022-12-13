/// <reference types="cypress" />

interface Worker {
    firstName: string;
    lastName: string;
    email: string
    age: number;
    salary: number;
    department: string;
}

declare namespace Cypress {
    interface Chainable<Subject> {
        addRandomWorker(worker: Worker): Chainable<any>
        addSeveralWorkers(count: number): Chainable<any>
        deleteAllWorkers(numOfWorkers: number): Chainable<any>
    }
}
