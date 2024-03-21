/// <reference types='cypress' />


describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

 
  let worker;

  before(() => {
    cy.task('generateWorker').then((generateWorker) => {
      worker = generateWorker;
    });
  }); 

  it('should check pagination on the page', () => {
    cy.addNewEmployee(worker);
    cy.addNewEmployee(worker);
    cy.addNewEmployee(worker);

    cy.get('[aria-label="rows per page"]').select('5');
    cy.contains('[type="button"]', 'Next').click();
    cy.get('[type="number"]').should('have.value', '2');
    cy.contains('[type="button"]', 'Previous').click();
    cy.get('[type="number"]').should('have.value', '1');
  });

  
  it('should assert rows count selection', () => {
    cy.checkRowsSelector(5);
    cy.checkRowsSelector(10);
    cy.checkRowsSelector(20);
    cy.checkRowsSelector(25);
    cy.checkRowsSelector(50);
    cy.checkRowsSelector(100);
  });

  it('should be able to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('contain', 'Registration Form');

    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should be able to delete a worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();
    cy.get('#delete-record-4').click();
    cy.get('.ReactTable').should('not.contain', worker.firstName)
      .and('not.contain', worker.lastName);
  });


  it('should be able to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.ReactTable').should('contain', 'No rows found');
    cy.get('.ReactTable').should('not.contain', '#delete-record^');
  });

  it('should be able to to find a worker and edit it', () => {
    const editedFirstName = 'editTest';
    cy.task('generateWorker').then((generateWorker) => {
      cy.findById('addNewRecordButton').click();
      cy.findById('firstName').type(worker.firstName);
      cy.findById('lastName').type(worker.lastName);
      cy.findById('userEmail').type(worker.email);
      cy.findById('age').type(worker.age);
      cy.findById('salary').type(worker.salary);
      cy.findById('department').type(worker.department);
      cy.findById('submit').click();
      cy.findById('searchBox').type(worker.firstName);
      cy.get('.mr-2').click();
      cy.findById('firstName').clear().type(`${editedFirstName}`);
      cy.findById('submit').click();
      cy.findById('searchBox').clear().type(editedFirstName);
      cy.contains('.rt-td', editedFirstName).should('exist');
    });
  });

  it('should provide to search by all column values', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('.rt-td').should('contain', 'Alden');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Cantrell');
    cy.get('.rt-td').should('contain', 'Cantrell');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('45');
    cy.get('.rt-td').should('contain', '45');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@example.com');
    cy.get('.rt-td').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('12000');
    cy.get('.rt-td').should('contain', '12000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Compliance');
    cy.get('.rt-td').should('contain', 'Compliance');
  });
});