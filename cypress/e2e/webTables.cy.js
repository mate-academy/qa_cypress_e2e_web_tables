/* eslint-disable */
/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('the web tables should contain pagination', () => {
    cy.get('.-pageJump > input').should('be.visible');
    cy.get('.-previous > .-btn').should('contain', 'Previous');
    cy.get('.-next > .-btn').should('contain', 'Next');
  });

  it('selecting a list of rows in pagination', () => {
    cy.get('select').should('be.visible');
    cy.get('select').select('20');
  });

  it('should allow adding a new worker; validation of worker data', () => {
    cy.get('#addNewRecordButton').click();

    cy.findByPlaceholder('First Name').type('Stefan');
    cy.findByPlaceholder('Last Name').type('Stefanovski');
    cy.findByPlaceholder('name@example.com').type('pantera@qa.team');
    cy.findByPlaceholder('Age').type('35');
    cy.findByPlaceholder('Salary').type('600');
    cy.findByPlaceholder('Department').type('QADepartment');
    cy.get('#submit').click();

    cy.contains('div.rt-td', 'Stefan').should('be.visible');
    cy.contains('div.rt-td', 'Stefanovski').should('be.visible');
    cy.contains('div.rt-td', 'pantera@qa.team').should('be.visible');
    cy.contains('div.rt-td', '35').should('be.visible');
    cy.contains('div.rt-td', '600').should('be.visible');
    cy.contains('div.rt-td', 'QADepartment').should('be.visible');
  });

  it('should allow deleting a worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.findByPlaceholder('First Name').type('Mario');
    cy.findByPlaceholder('Last Name').type('Super');
    cy.findByPlaceholder('name@example.com').type('supermario@qa.team');
    cy.findByPlaceholder('Age').type('25');
    cy.findByPlaceholder('Salary').type('700');
    cy.findByPlaceholder('Department').type('QAGame');
    cy.get('#submit').click();

    cy.wait(3000);
    cy.get('#delete-record-4').click();
  });

  it('should allow the deletion of all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
  });

  it('should allow to find a worker in the search field and edit it', () => {
    cy.get('#addNewRecordButton').click();

    cy.findByPlaceholder('First Name').type('Petro');
    cy.findByPlaceholder('Last Name').type('Petrovskiy');
    cy.findByPlaceholder('name@example.com').type('petrovskiy@qa.team');
    cy.findByPlaceholder('Age').type('30');
    cy.findByPlaceholder('Salary').type('800');
    cy.findByPlaceholder('Department').type('QAteam');
    cy.get('#submit').click();

    cy.wait(3000);
    cy.findByPlaceholder('Type to search').type('Petrovskiy');
    cy.get('#basic-addon2').click();
    cy.get('#edit-record-4').click();
    cy.findByPlaceholder('Department').type('QAteam123');
    cy.get('#submit').click();
  });

  it('should allow searching on all column values', () => {
    cy.get('#addNewRecordButton').click();

    cy.findByPlaceholder('First Name').type('Petro');
    cy.findByPlaceholder('Last Name').type('Petrovskiy');
    cy.findByPlaceholder('name@example.com').type('petrovskiy@qa.team');
    cy.findByPlaceholder('Age').type('30');
    cy.findByPlaceholder('Salary').type('800');
    cy.findByPlaceholder('Department').type('QAteam');
    cy.get('#submit').click();

    cy.wait(2000);
    cy.findByPlaceholder('Type to search').type('Petro');
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').clear();
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').type('Petrovskiy');
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').clear();
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').type('petrovskiy@qa.team');
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').clear();
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').type('30');
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').clear();
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').type('800');
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').clear();
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').type('QAteam');
    cy.wait(2000);
    cy.findByPlaceholder('Type to search').clear();
  });
});
