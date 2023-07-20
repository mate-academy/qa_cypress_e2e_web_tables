/// <reference types='cypress' />

describe('Web Tables page', () => {
  let addWorker;
  const editWorker = {
    firstName: 'Anna',
    lastName: 'Smith',
    email: 'AnnaSmith@qa.com',
    age: 23,
    salary: 15000,
    department: 'SMM'
  };

  beforeEach(() => {
    cy.task('generateWorker').then((generateWorker) => {
      addWorker = generateWorker;
    });
    cy.visit('/');
  });

  it('should have a pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page').should('exist');
  });

  it('should have rows', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
    cy.get('select').select('10 rows');
    cy.get('select').should('contain', '10 rows');
    cy.get('select').select('20 rows');
    cy.get('select').should('contain', '20 rows');
    cy.get('select').select('50 rows');
    cy.get('select').should('contain', '50 rows');
    cy.get('select').select('100 rows');
    cy.get('select').should('contain', '100 rows');
  });

  it('should allow to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(addWorker.firstName);
    cy.findByPlaceholder('Last Name').type(addWorker.lastName);
    cy.findByPlaceholder('name@example.com').type(addWorker.email);
    cy.findByPlaceholder('Age').type(addWorker.age);
    cy.findByPlaceholder('Salary').type(addWorker.salary);
    cy.findByPlaceholder('Department').type('Marketing');
    cy.contains('#submit', 'Submit').click();
    cy.get('.rt-tbody')
      .should('contain', addWorker.firstName)
      .and('contain', addWorker.lastName)
      .and('contain', addWorker.email)
      .and('contain', addWorker.age)
      .and('contain', addWorker.salary)
      .and('contain', 'Marketing');
  });

  it('should allow to delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1')
      .and('not.contain', '#delete-record-2')
      .and('not.contain', '#delete-record-3');
  });

  it('should allow to find worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('#edit-record-2').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(editWorker.firstName);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(editWorker.lastName);
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(editWorker.email);
    cy.get('#age').clear();
    cy.get('#age').type(editWorker.age);
    cy.get('#salary').clear();
    cy.get('#salary').type(editWorker.salary);
    cy.get('#department').clear();
    cy.get('#department').type(editWorker.department);
    cy.contains('#submit', 'Submit').click();
    cy.get('#searchBox').clear();
    cy.get('.rt-tbody')
      .should('contain', editWorker.firstName)
      .and('contain', editWorker.lastName)
      .and('contain', editWorker.email)
      .and('contain', editWorker.age)
      .and('contain', editWorker.salary)
      .and('contain', editWorker.department);
  });

  it('should allow to search by all column values', () => {
    cy.get('#searchBox').type('Kierra');
    cy.get('.rt-tbody').should('contain', 'Kierra');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Gentry');
    cy.get('.rt-tbody').should('contain', 'Gentry');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(29);
    cy.get('.rt-tbody').should('contain', 29);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@example.com');
    cy.get('.rt-tbody').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(2000);
    cy.get('.rt-tbody').should('contain', 2000);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Legal');
    cy.get('.rt-tbody').should('contain', 'Legal');
    cy.get('#searchBox').clear();
  });
});
