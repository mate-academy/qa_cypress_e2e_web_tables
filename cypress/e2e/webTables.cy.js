/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      worker = generateUser;
    });
  });

  it('should check pagination and Rows count selection.', () => {
    cy.createUser(worker);
    cy.createUser(worker);
    cy.createUser(worker);

    cy.get('.select-wrap').should('contain', '5 rows');
    cy.get('.select-wrap').should('contain', '25 rows');
    cy.get('.select-wrap').should('contain', '5 rows');
    cy.get('select').select('5');

    cy.get('.-next').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '2');

    cy.get('.-previous').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '1');

    cy.get('[aria-label="jump to page"]').clear();
    cy.get('[aria-label="jump to page"]').type('2{enter}');
    cy.get('[aria-label="jump to page"]').should('have.value', '2');
  });

  it('should allow to add a new worker', () => {
    // by command
    cy.createUser(worker);

    // by manual way
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('contain', 'Registration Form');

    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('allows to delete a worker', () => {
    cy.createUser(worker);

    cy.get('#delete-record-4').click();
    cy.get('.ReactTable').should('not.contain', worker.firstName)
      .and('not.contain', worker.lastName)
      .and('not.contain', worker.email)
      .and('not.contain', worker.age)
      .and('not.contain', worker.salary)
      .and('not.contain', worker.department);
  });

  it('allows to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.ReactTable').should('contain', 'No rows found');
  });

  it('allows to find worker in search field, edit it and validate', () => {
    const firstWorkerName = 'Cierra';
    cy.get('#searchBox').type(firstWorkerName);
    cy.get('.ReactTable').should('contain', firstWorkerName);
    cy.get('#edit-record-1').click();
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(worker.email);
    cy.get('#salary').clear();
    cy.get('#salary').type(worker.salary);
    cy.get('#department').clear();
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();

    cy.get('#searchBox').clear();
    cy.get('.rt-tbody > :nth-child(1)').should('contain', firstWorkerName)
      .and('contain', worker.email)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('allows to check the search by all column values', () => {
    const firstWorkerFName = 'Cierra';
    const secondWorkerLName = 'Cantrell';
    const thirdWorkerAge = '29';
    const firstWorkeremail = 'cierra@example.com';
    const secondWorkerSalary = '12000';
    const thirdWorkerDepar = 'Legal';

    cy.get('#searchBox').type(firstWorkerFName);
    cy.get('.rt-tbody > :nth-child(1)').should('contain', firstWorkerFName);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(secondWorkerLName);
    cy.get('.rt-tbody > :nth-child(1)').should('contain', secondWorkerLName);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(thirdWorkerAge);
    cy.get('.rt-tbody > :nth-child(1)').should('contain', thirdWorkerAge);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(firstWorkeremail);
    cy.get('.rt-tbody > :nth-child(1)').should('contain', firstWorkeremail);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(secondWorkerSalary);
    cy.get('.rt-tbody > :nth-child(1)').should('contain', secondWorkerSalary);

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(thirdWorkerDepar);
    cy.get('.rt-tbody > :nth-child(1)').should('contain', thirdWorkerDepar);
  });
});
