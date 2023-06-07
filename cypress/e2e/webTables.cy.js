/// <reference types="cypress" />

describe('Web Tables page', () => {
  const worker = {
    firstName: 'Danylo',
    lastName: 'Plutenko',
    email: 'danyloplutenko@qa.team',
    age: 21,
    salary: 10000,
    department: 'QA'
  };

  const changedWorker = {
    firstName: 'Goofy',
    lastName: 'Goober',
    email: 'goofygoober@qa.team',
    age: 18,
    salary: 70000,
    department: 'QC',
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
  });

  it('should have pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    
    cy.contains('.-pageInfo', 'Page')
      .should('exist');
  });

  it('should have rows count selection', () => {
    cy.get('select')
      .select('5 rows');

    cy.get('select')
      .should('contain', '5 rows');
  });

  it('should add new worker', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('#firstName')
      .type(worker.firstName);

    cy.get('#lastName')
      .type(worker.lastName);

    cy.get('#userEmail')
      .type(worker.email);

    cy.get('#age')
      .type(worker.age);

    cy.get('#salary')
      .type(worker.salary);

    cy.get('#department')
      .type(worker.department);

    cy.get('#submit')
      .click();

    cy.get('.rt-tbody')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    for(let i = 1; i <= 3; i++){
      cy.get(`#delete-record-${i}`)
        .click();

      cy.get('.rt-tbody')
        .should('not.contain', `#delete-record-${i}`);
    };
  });

  it('should find worker in search field and edit it', () => {
    cy.createWorker(worker);
    
    cy.get('#searchBox')
      .type(worker.firstName)
    
    cy.get('#edit-record-4')
      .click();
    
    cy.get('#firstName').clear()
      .type(changedWorker.firstName);
    
    cy.get('#lastName').clear()
      .type(changedWorker.lastName);
    
    cy.get('#userEmail').clear()
      .type(changedWorker.email);
    
    cy.get('#age').clear()
      .type(changedWorker.age);
    
    cy.get('#salary').clear()
      .type(changedWorker.salary);
    
    cy.get('#department').clear()
      .type(changedWorker.department);
      
    cy.get('#submit')
      .click();

    cy.get('.rt-tbody')
      .should('contain', changedWorker.firstName)
      .and('contain', changedWorker.lastName)
      .and('contain', changedWorker.email)
      .and('contain', changedWorker.age)
      .and('contain', changedWorker.salary)
      .and('contain', changedWorker.department);
  });

  it('should search by all column values', () => {
    cy.createWorker(worker);
    cy.get('#searchBox').clear()
      .type(worker.firstName);

    cy.get('.rt-tbody')
      .should('contain', worker.firstName);

    cy.get('#searchBox').clear()
      .type(worker.lastName);

    cy.get('.rt-tbody')
      .should('contain', worker.lastName);

    cy.get('#searchBox').clear()
      .type(worker.email);

    cy.get('.rt-tbody')
      .should('contain', worker.email);

    cy.get('#searchBox').clear()
      .type(worker.age);

    cy.get('.rt-tbody')
      .should('contain', worker.age);

    cy.get('#searchBox').clear()
      .type(worker.salary);

    cy.get('.rt-tbody')
      .should('contain', worker.salary);

    cy.get('#searchBox').clear()
      .type(worker.department);

    cy.get('.rt-tbody')
      .should('contain', worker.department);
  });
});