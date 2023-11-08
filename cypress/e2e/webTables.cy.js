/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    cy.task('generateUser').then(generateUser => {
      worker = generateUser;
    });
  });

  it('Should provide an ability to add a new worker', () => {
    cy.addWorker2(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  })
  
  it('Should provide an ability to find a worker in the search field and edit it', () => {
    cy.addWorker1(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.get('#searchBox')
      .type(worker.firstName);
    cy.get('#basic-addon2')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
    cy.get('#edit-record-4')
      .click();
    cy.get('#department')
      .type('{selectAll}' + worker.departmentNew);
    cy.get('#salary')
      .type('{selectAll}' + worker.salaryNew);
    cy.get('#submit')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.departmentNew)
      .and('contain', worker.salaryNew);
  })

  it('Should provide an ability to delete a worker', () => {
    cy.addWorker3(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.get('#delete-record-4')
      .click();
    cy.contains('.rt-table', worker.firstName)
      .should('not.exist');
    cy.contains('.rt-table', worker.lastName)
      .should('not.exist');
    cy.contains('.rt-table', worker.email)
      .should('not.exist');
    cy.contains('.rt-table', worker.age)
      .should('not.exist');
    cy.contains('.rt-table', worker.salary)
      .should('not.exist');
    cy.contains('.rt-table', worker.department)
      .should('not.exist');
  })

  it('Should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  })

  it('Should provide an ability to use pagination and rows count selection', () => {
    cy.contains('[type="button"]', 'Previous')
      .should('exist');
    cy.contains('[type="button"]', 'Next')
      .should('exist');
    cy.get('[aria-label="jump to page"]')
      .should('exist');
    cy.addWorker1(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.addWorker2(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.addWorker3(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '5 rows');
    cy.contains('[type="button"]', 'Next')
      .click();
    cy.get('[type="number"]')
      .should('have.value', '2');
    cy.contains('[type="button"]', 'Previous')
      .click();
    cy.get('[type="number"]')
      .should('have.value', '1');
  });

  it('Should provide an ability to change rows count', () => {
    cy.get('[aria-label="rows per page"]')
      .should('exist');
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '5 rows');
    cy.get('[aria-label="rows per page"]')
      .select('20 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '20 rows');
    cy.get('[aria-label="rows per page"]')
      .select('25 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '25 rows');
  });

  it('Should provide an ability to check the search by column values', () => {
    cy.addWorker1(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.get('#searchBox')
      .type(worker.firstName);
    cy.get('#basic-addon2')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type(worker.lastName);
    cy.get('#basic-addon2')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type(worker.age);
    cy.get('#basic-addon2')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type(worker.email);
    cy.get('#basic-addon2')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type(worker.salary);
    cy.get('#basic-addon2')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type(worker.department);
    cy.get('#basic-addon2')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
    cy.get('#searchBox')
  })
});


