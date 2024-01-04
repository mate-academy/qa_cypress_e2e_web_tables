/// <reference types='cypress' />

describe('Web Tables page', () => {
  
  const newWorker = {
    firstName: 'Anna',
    lastName: 'Maria',
    email: 'anna@qa.team',
    age: 30,
    salary: 1500,
    department: 'QA'
  };

  const worker = {
    firstName: 'Kierra',
    lastName: 'Gentry',
    email: 'kierra@example.com',
    age: 29,
    salary: 2000,
    department: 'Legal',
    newLastName: 'Larson',
    newAge: 31,
    newSalary: 3500
  };

  beforeEach(() => {
    cy.viewport(1980, 1080);
    cy.visit('https://demoqa.com/webtables');
  });

  it('should check a pagination', () => {
    cy.get('.-pagination')
    .should('exist')
    cy.get('.-previous > .-btn')
    .should('contain', 'Previous')
    cy.get('.-next > .-btn')
    .should('contain', 'Next')
    cy.get('.-pageInfo')
    .should('exist')
    .and('contain', 'Page')
    cy.get('.-pageJump > input')
    .should('exist')
    cy.get('.-totalPages')
    .should('exist')
  });

  it('should check a row count selection', () => {
    cy.get('select')
    .should('contain', '5 rows')
    .and('contain', '10 rows')
    .and('contain', '20 rows')
    .and('contain', '25 rows')
    .and('contain', '50 rows')
    .and('contain', '100 rows')
    .select('5 rows')
  });

  it('should check adding a new worker and validate his data in worker row ', () => {
    cy.get('#addNewRecordButton')
    .should('exist')
    .click()
    cy.get('#registration-form-modal')
    .should('exist')
    .and('contain', 'Registration Form')
    cy.findByPlaceholder('First Name')
    .type(newWorker.firstName)
    cy.findByPlaceholder('Last Name')
    .type(newWorker.lastName)
    cy.findByPlaceholder('name@example.com')
    .type(newWorker.email)
    cy.findByPlaceholder('Age')
    .type(newWorker.age)
    cy.findByPlaceholder('Salary')
    .type(newWorker.salary)
    cy.findByPlaceholder('Department')
    .type(newWorker.department)
    cy.get('#submit')
    .click()
    cy.get('.rt-tr-group')
    .should('contain', newWorker.firstName)
    .and('contain', newWorker.lastName)
    .and('contain', newWorker.email)
    .and('contain', newWorker.age)
    .and('contain', newWorker.salary)
    .and('contain', newWorker.department)

  });

  it('should check deliting of worker', () => {
    cy.get(':nth-child(3) > .rt-tr > :nth-child(1)')
    .should('contain', worker.firstName)
    cy.findByPlaceholder('Type to search')
    .type(worker.firstName)
    cy.get('#delete-record-3')
    .click()
    cy.contains(':nth-child(3) > .rt-tr > :nth-child(1)', worker.firstName)
    .should('not.exist')

  });

  it('should check deliting all workers', () => {
    for(let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`)
      .click()
    }
    cy.get('.rt-noData')
    .should('contain', 'No rows found')
  });

  it('should find worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search')
    .type(worker.firstName)
    cy.get('#edit-record-3')
    .click()
    cy.findByPlaceholder('Last Name')
    .clear()
    .type(worker.newLastName)
    cy.findByPlaceholder('Age')
    .clear()
    .type(worker.newAge)
    cy.findByPlaceholder('Salary')
    .clear()
    .type(worker.newSalary)
    cy.get('#submit')
    .click()
    cy.get('.rt-tr-group')
    .should('contain', worker.firstName)
    .and('contain', worker.newLastName)
    .and('contain', worker.email)
    .and('contain', worker.newAge)
    .and('contain', worker.newSalary)
    .and('contain', worker.department)
  });

  it('should check search by all column values', () => {
    cy.findByPlaceholder('Type to search')
    .type(worker.firstName)
    cy.get('.rt-td')
    .should('contain', worker.firstName)

    cy.findByPlaceholder('Type to search')
    .clear()
    .type(worker.lastName)
    cy.get('.rt-td')
    .should('contain', worker.lastName)

    cy.findByPlaceholder('Type to search')
    .clear()
    .type(worker.email)
    cy.get('.rt-td')
    .should('contain', worker.email)

    cy.findByPlaceholder('Type to search')
    .clear()
    .type(worker.age)
    cy.get('.rt-td')
    .should('contain', worker.age)

    cy.findByPlaceholder('Type to search')
    .clear()
    .type(worker.salary)
    cy.get('.rt-td')
    .should('contain', worker.salary)

    cy.findByPlaceholder('Type to search')
    .clear()
    .type(worker.department)
    cy.get('.rt-td')
    .should('contain', worker.department)
  });

});
