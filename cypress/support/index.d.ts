/// <reference types ="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    findByPlaceholder(placeholder: string): Chainable<any>
    getTestEl(dataCy: string): Chainable<any>
    createNewUser(firstName: string, lastName: string, email: string, age: string, salary: string, department: string): Chainable<any>
  }
}