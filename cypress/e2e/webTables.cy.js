import { generateUser } from '../support/generate';
/// <reference types='cypress' />

const user = generateUser();

const rowsChoose = user.rows[Math.floor(Math.random() * user.rows.length)];

const worker = 'Cierra';

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('pagination testing', () => {
    cy.get('.-pageInfo').should('contain', 'Page');

    cy.get('select').select(rowsChoose);

    for (let i = 0; i < parseInt(rowsChoose.split(' ')[0]); i++) {
      cy.get(`:nth-child(${i + 1})`).should('exist');
    }
  });

  it('should able to add and delete new worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);

    cy.get('#submit').click();

    cy.get('[id="delete-record-4"]').click();

    cy.get(':nth-child(4)').should('not.contain', user.firstName);
  });

  it('should be able to delete all workers', () => {
    for (let i = 0; i < 3; i++) {
      cy.get(`[id="delete-record-${i + 1}"]`).click();
    }

    cy.get(':nth-child(4)').should('not.contain', user.firstName);

    cy.get('div.noData').should('contain', 'No rows found');
  });

  it.only('should find a worker in the search field and edit it', () => {
    cy.get('#searchBox').type(worker);

    cy.get(`#edit-record-1`).click();

    cy.get('#firstName').clear();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(user.email);
    cy.get('#age').clear();
    cy.get('#age').type(user.age);
    cy.get('#salary').clear();
    cy.get('#salary').type(user.salary);
    cy.get('#department').clear();
    cy.get('#department').type(user.department);

    cy.get('#submit').click();

    cy.get('#searchBox').clear();

    for (let i = 0; i < user.checkRow.length; i++) {
      cy.get('#searchBox').type(user.checkRow[i]);

      for (let i = 0; i < user.checkRow.length; i++) {
        cy.get(`.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(${i + 1})`).should('contain', user.checkRow[i]);
      }

      cy.get('#searchBox').clear();
    }
  });
});
