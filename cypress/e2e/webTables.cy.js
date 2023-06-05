/// <reference types='cypress' />

describe('Web Tables page', () => {

  it('should check pagination', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.get('.pagination-bottom')
      .should('exist')
      .within(() => {
        cy.get('.-previous')
          .should('exist')
        cy.get('.-next')
          .should('exist');
      });
        cy.contains('.select-wrap','10 rows')
            .click();
    cy.contains('Add').click();
    cy.contains('.modal-content', 'Registration Form')
      .should('exist');
    cy.get('[placeholder="First Name"]')
      .type('Tanya');
    cy.get('[placeholder="Last Name"]')
      .type('Teryn');
    cy.get('#userEmail-wrapper')
      .type('test345@gmail.com');
    cy.get('[placeholder="Age"]')
      .type('32');
    cy.get('[placeholder="Salary"]')
      .type('30000');
    cy.get('[placeholder="Department"]')
      .type('Sales');
    cy.get('#submit')
      .click();
    cy.get('.rt-td').contains('Tanya').should('be.visible');
    cy.get('.rt-td').contains('Teryn').should('be.visible');
    cy.get('.rt-td').contains('test345@gmail.com').should('be.visible');
    cy.get('.rt-td').contains('32').should('be.visible');
    cy.get('.rt-td').contains('30000').should('be.visible');
    cy.get('.rt-td').contains('Sales').should('be.visible');
    cy.get('#delete-record-1')
      .click();
    cy.get('[id^="delete-record-"]').each((deleteButton) => {
        deleteButton.trigger('keydown', { key: 'Enter', force: true });
      });
    cy.get('#searchBox')
      .type('Teryn')
    cy.get('.mr-2')
      .click();
    cy.get('[placeholder="Salary"]')
      .clear()
      .type('32000')
    cy.get('#submit')
      .click();
    cy.get('#searchBox').clear().type('Teryn');
    cy.get('.mr-2').click();
    cy.get('.rt-td').contains('Teryn').should('be.visible');
    cy.get('[placeholder="Salary"]').clear().type('32000');
    cy.get('#submit').click();
    cy.get('.rt-td').contains('Teryn').should('be.visible');
    cy.get('.rt-td').contains('32000').should('be.visible');
    //cy.contains('#item-3','Web Tables')
      //.click();

      })
  });

