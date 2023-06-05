describe('Web Tables page', () => {

  const newWorker = {
    firstName: 'Lilith',
    lastName: 'Mother',
    email: 'liliththemother@mail.com',
    age: 18,
    salary: 10000,
    department: 'Testing'
  }

  const worker = {
    firstName: 'Kierra',
    lastName: 'Gentry',
    email: 'kierra@example.com',
    age: 29,
    salary: 2000,
    department: 'Legal'
  }

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should check pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    cy.get('.-pageInfo')
      .should('contain', 'Page');
  });

  it('should cleck rows count selection ', () => {
    cy.get('select')
      .select('5 rows')
    cy.get('select')
      .should('contain', '5 rows')
  });

  it('should provide an ability to add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(newWorker.firstName);

    cy.get('#lastName')
      .type(newWorker.lastName);

    cy.get('#userEmail')
      .type(newWorker.email);

    cy.get('#age')
      .type(newWorker.age);

    cy.get('#salary')
      .type(newWorker.salary);

    cy.get('#department')
      .type(newWorker.department);

    cy.get('#submit')
      .click();

    cy.get('.rt-tr-group')
      .should('contain', newWorker.firstName)
      .and('contain', newWorker.lastName)
      .and('contain', newWorker.email)
      .and('contain', newWorker.salary)
      .and('contain', newWorker.age)
      .and('contain', newWorker.department)
  });

  it('should provide an ability to delete worker', () => {
    cy.get('#delete-record-1')
      .should('exist');

    cy.get('#delete-record-1')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-1');
  });

  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-1');

    cy.get('#delete-record-2')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-2');

    cy.get('#delete-record-3')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-3');
  });

  it('should provide an ability to search worker and edit it', () => {
    cy.get('#searchBox')
      .type(worker.firstName);

    cy.get('#basic-addon2')
      .click();

    cy.get('.rt-tr-group')
      .should('contain', worker.firstName);

    cy.get('#searchBox')
      .type('{selectAll}'+ worker.lastName);

    cy.get('.rt-tr-group')
      .should('contain', worker.lastName);

    cy.get('#searchBox')
      .type('{selectAll}' + worker.age);

    cy.get('.rt-tr-group')
      .should('contain', worker.age);

    cy.get('#searchBox')
      .type('{selectAll}' + worker.email);

    cy.get('.rt-tr-group')
      .should('contain', worker.email);

    cy.get('#searchBox')
      .type('{selectAll}' + worker.salary);

    cy.get('.rt-tr-group')
      .should('contain', worker.salary);

    cy.get('#searchBox')
      .type('{selectAll}' + worker.department);

    cy.get('.rt-tr-group')
      .should('contain', worker.department);

    cy.get('#basic-addon2')
      .click();

    cy.get('[title="Edit"]')
      .click();

    cy.get('#firstName')
      .type('{selectAll}' + worker.firstName);

    cy.get('#submit')
      .click();

    cy.get('.rt-tr-group')
      .should('contain', worker.firstName);
  });
});
