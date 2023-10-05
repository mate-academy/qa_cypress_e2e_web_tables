/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getElementById(id: string): Chainable<any>;
    getElementByAttribute(name: string, value: string): Chainable<any>;
    selectRowsNumber(rowsNumber: number): Chainable<any>;
    addRandomUser(user: any): Chainable<any>;
    findAndFillInput(id: string, value: string): Chainable<any>;
    findOneUser(query: string): Chainable<any>;
    editUser(user: any): Chainable<any>;
  }
}
