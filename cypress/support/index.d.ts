/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getById(selector: string): Chainable<any>
  }
}
