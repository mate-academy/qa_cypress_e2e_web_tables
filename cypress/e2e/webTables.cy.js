/// <reference types='cypress' />

const { generateWorker } = require("../support/generate");
const { searchData } = require("../support/generate");

describe('Web Tables page', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('has pagination', () => {
    cy.get('.-pagination').should('contain', 'Previous').and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page').should('exist');
  });

  it('has row count selection', () => {
    cy.get('select').select('5 rows');
    cy.get(':nth-child(6) > .rt-tr').should('not.exist');
  });

  it('add new worker and validate data in worker row', () => {
    let worker = generateWorker(); 

    cy.contains('Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstname);
    cy.findByPlaceholder('Last Name').type(worker.lastname);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('Submit').click();

    cy.get(':nth-child(4) > .rt-tr')
      .should('contain', worker.firstname)
      .and('contain', worker.lastname)
      .and('contain', worker.email)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('delete a worker', () => {
    cy.get(`#delete-record-1`).click();
    cy.get('.rt-tbody').should('not.contain.html', `#delete-record-1`)
  });

  it('delete all workers', () => {
    for (let i = 1; i < 4; i++) {cy.get(`#delete-record-${i}`).click()}
    cy.get('[id^="delete-record-"]').should('not.exist');
  });

  it('find worker in search field and edit it', () => {
    let newData = generateWorker(); 
    let worker = searchData();

    cy.findByPlaceholder('Type to search').type(worker.firstname); 
    cy.get(`#edit-record-1`).click();
    cy.findByPlaceholder('First Name').clear().type(newData.firstname);
    cy.contains('Submit').click();
    cy.get(':nth-child(1) > .rt-tr').should('contain', newData.firstname);
  });

  it('check search by all column values', () => {
    let worker = searchData();

    cy.findByPlaceholder('Type to search').type(worker.firstname); 
    cy.get(':nth-child(1) > .rt-tr').should('contain', worker.firstname);
    cy.findByPlaceholder('Type to search').clear().type(worker.lastname); 
    cy.get(':nth-child(1) > .rt-tr').should('contain', worker.lastname);
    cy.findByPlaceholder('Type to search').clear().type(worker.age); 
    cy.get(':nth-child(1) > .rt-tr').should('contain', worker.age);
    cy.findByPlaceholder('Type to search').clear().type(worker.salary); 
    cy.get(':nth-child(1) > .rt-tr').should('contain', worker.salary);
    cy.findByPlaceholder('Type to search').clear().type(worker.department); 
    cy.get(':nth-child(1) > .rt-tr').should('contain', worker.department);
  });
});
