/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;
  const defaultWorker = {
    name: 'Cierra',
    surname: 'Vega',
    age: '39',
    email: 'cierra@example.com',
    salary: '10000',
    department: 'Insurance'
  }
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateWorker').then(generateWorker => {
      worker = generateWorker
    });
  })

  it('should contain the pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.contains('.-previous > .-btn', 'Previous');
    cy.contains('.-next > .-btn', 'Next');
    cy.get('.-pageInfo').should('contain.text','Page')
  });

  it('should provide an ability to select the rows count', () => {
    cy.get('[aria-label="rows per page"]').should('exist').and('contain.text', '10 rows');
    cy.get('.rt-tr-group').should('have.length', 10);
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('.rt-tr-group').should('have.length', 5);
    cy.get('[aria-label="rows per page"]').select('20 rows');
    cy.get('.rt-tr-group').should('have.length', 20);
    cy.get('[aria-label="rows per page"]').select('25 rows');
    cy.get('.rt-tr-group').should('have.length', 25);


  });

  it('should provide an ability to add new worker', () => {
    cy.contains('[id="addNewRecordButton"]', 'Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('[id="submit"]', 'Submit').click();
    cy.get('.rt-tr').should('contain', worker.firstName)
  });

  it('should provide an ability to delete the worker', () => {
    cy.contains('[id="addNewRecordButton"]', 'Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('[id="submit"]', 'Submit').click();
    cy.get('#delete-record-4').click();
    cy.get('.rt-tr').should('not.contain', worker.firstName)
  });

  it('should provide an ability to delete all workers', () => {
    cy.deleteAllWorkers(3);
    cy.get('.rt-tr').should('not.have.value')
  });

  it('should provide an ability to find the worker by search and edit their data', () => {
    cy.findByPlaceholder('Type to search').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.findByPlaceholder('First Name').clear()
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('[id="submit"]', 'Submit').click();
    cy.findByPlaceholder('Type to search').clear();
    cy.get('.rt-tr').should('contain', worker.firstName)
  });

  it('should contain the worker\'s data after creating new worker', () => {
    cy.contains('[id="addNewRecordButton"]', 'Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('[id="submit"]', 'Submit').click();

    cy.get('.rt-tr').should('contain', worker.firstName);
    cy.get('.rt-tr').should('contain', worker.lastName);
    cy.get('.rt-tr').should('contain', worker.email);
    cy.get('.rt-tr').should('contain', worker.age);
    cy.get('.rt-tr').should('contain', worker.salary);
    cy.get('.rt-tr').should('contain', worker.department);
  });

  it.only('should provide an ability to find the worker by all column values', () => {
    cy.findByPlaceholder('Type to search').type(defaultWorker.name);
    cy.get('.rt-tr').should('contain', defaultWorker.name, defaultWorker.surname, defaultWorker.age, defaultWorker.email, defaultWorker.salary, defaultWorker.department)
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(defaultWorker.surname);
    cy.get('.rt-tr').should('contain', defaultWorker.name, defaultWorker.surname, defaultWorker.age, defaultWorker.email, defaultWorker.salary, defaultWorker.department)
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(defaultWorker.age);
    cy.get('.rt-tr').should('contain', defaultWorker.name, defaultWorker.surname, defaultWorker.age, defaultWorker.email, defaultWorker.salary, defaultWorker.department)
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(defaultWorker.email);
    cy.get('.rt-tr').should('contain', defaultWorker.name, defaultWorker.surname, defaultWorker.age, defaultWorker.email, defaultWorker.salary, defaultWorker.department)
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(defaultWorker.salary);
    cy.get('.rt-tr').should('contain', defaultWorker.name, defaultWorker.surname, defaultWorker.age, defaultWorker.email, defaultWorker.salary, defaultWorker.department)
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(defaultWorker.department);
    cy.get('.rt-tr').should('contain', defaultWorker.name, defaultWorker.surname, defaultWorker.age, defaultWorker.email, defaultWorker.salary, defaultWorker.department)
  });
});
