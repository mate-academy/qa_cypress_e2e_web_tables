describe('Web Tables page', () => {
  const worker = {
    firstName: 'Maria',
    lastName: 'Fletcher',
    email: 'testdata.628@gmail.com',
    age: 25,
    salary: 800,
    department: 'QA'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('the table should have the pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');

    cy.contains('.-pageInfo', 'Page').should('exist');
  });

  it('the table should have row count selection', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
  });

  it('should add a new worker to the table', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();

    cy.get('.rt-tbody')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.age)
      .and('contain', worker.email)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should search by all column values', () => {
    cy.get('#searchBox').clear().type(worker.firstName);
    cy.get('#searchBox').clear().type(worker.lastName);
    cy.get('#searchBox').clear().type(worker.age);
    cy.get('#searchBox').clear().type(worker.email);
    cy.get('#searchBox').clear().type(worker.salary);
    cy.get('#searchBox').clear().type(worker.department);
  });

  it('should delete the worker from the table', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should find the worker in the search field and edit it', () => {
    cy.get('#searchBox').type('Kierra');
    cy.get('#edit-record-3').click();
    cy.get('#lastName').clear().type(worker.lastName);
    cy.get('#userEmail').clear().type(worker.email);
    cy.get('#age').clear().type(worker.age);
    cy.get('#salary').clear().type('10000');
    cy.get('#department').clear().type(worker.department);
    cy.get('#submit').click();

    cy.get('.rt-tbody')
      .should('contain', 'Kierra')
      .and('contain', worker.lastName)
      .and('contain', worker.age)
      .and('contain', worker.email)
      .and('contain', '10000')
      .and('contain', worker.department);
  });

  it('should delete all workers from the table', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');

    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2');

    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
  });
});
