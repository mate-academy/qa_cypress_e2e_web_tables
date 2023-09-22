/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {

    clickOnElement (element: string, text: string): Chainable<any>
 
  }
}