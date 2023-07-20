/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='cypress' />
describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit(`/`);
  });

  it('should change the page number  ', () => {
    for (let i = 0; i < 3; i++) {
      cy.task('generateUser').then((generateUser) => {
        const user = generateUser;
        cy.create(user);
      });
    }
    cy.get('select').select(`5 rows`);
    cy.contains(`button`, `Next`).click();
    cy.get('[class="-pageInfo"]').should('contain', `2`);
  });

  it('should select count of rows', () => {
    for (let i = 0; i < 3; i++) {
      cy.task('generateUser').then((generateUser) => {
        const user = generateUser;
        cy.create(user);
      });
    }
    cy.get('select').select(`5 rows`);
    cy.get('[aria-label="rows per page"]').should('contain', `5`);
  });

  it('should add new workers', () => {
    cy.task('generateUser').then((generateUser) => {
      const user = generateUser;
      cy.get(`#addNewRecordButton`).click();
      cy.findByPlaceholder(`First Name`).type(user.firstname);
      cy.findByPlaceholder(`Last Name`).type(user.lastname);
      cy.findByPlaceholder(`name@example.com`).type(user.email);
      cy.findByPlaceholder(`Age`).type(user.age);
      cy.findByPlaceholder(`Salary`).type(user.salary);
      cy.findByPlaceholder(`Department`).type(user.department);
      cy.get(`#submit`).click();
      cy.get('.rt-td').should('contain', user.firstname);
      cy.get('.rt-td').should('contain', user.lastname);
      cy.get('.rt-td').should('contain', user.email);
      cy.get('.rt-td').should('contain', user.age);
      cy.get('.rt-td').should(`contain`, user.salary);
      cy.get('.rt-td').should('contain', user.department);
    });
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2');
    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
  });

  it('should search a worker', () => {
    cy.task('generateUser').then((generateUser) => {
      const user1 = generateUser;
      cy.create(user1);
      cy.findByPlaceholder('Type to search').type(user1.firstname);
      cy.findByPlaceholder('Type to search').clear().type(user1.lastname);
      cy.findByPlaceholder('Type to search').clear().type(user1.email);
      cy.findByPlaceholder('Type to search').clear().type(user1.age);
      cy.findByPlaceholder('Type to search').clear().type(user1.salary);
      cy.findByPlaceholder('Type to search').clear().type(user1.department);
      cy.get('.mr-2').click();
      cy.findByPlaceholder('First Name').clear().type('firstName');
      cy.get('#submit').click();
    });
  });

  it('should edit a worker', () => {
    cy.task('generateUser').then((generateUser) => {
      const user1 = generateUser;
      cy.create(user1);
      cy.findByPlaceholder('Type to search').clear().type(user1.department);
      cy.get('.mr-2').click();
      cy.findByPlaceholder('First Name').clear().type('firstName');
      cy.get('#submit').click();
    });
  });

  it('data of worker should match with data inputted by registration', () => {
    cy.task('generateUser').then((generateUser) => {
      const user = generateUser;
      cy.create(user);
      cy.get('.rt-td').should('contain', user.firstname);
      cy.get('.rt-td').should('contain', user.lastname);
      cy.get('.rt-td').should('contain', user.email);
      cy.get('.rt-td').should('contain', user.age);
      cy.get('.rt-td').should(`contain`, user.salary);
      cy.get('.rt-td').should('contain', user.department);
    });
  });

  it('should the search by all column values', () => {
    cy.task('generateUser').then((generateUser) => {
      const user1 = generateUser;
      cy.create(user1);
      cy.findByPlaceholder('Type to search').type(user1.firstname);
      cy.get('#delete-record-4').should('be.visible');
      cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
      cy.findByPlaceholder('Type to search').clear().type(user1.lastname);
      cy.get('#delete-record-4').should('be.visible');
      cy.get('.rt-tbody').should('not.contain', '#delete-record-2');
      cy.findByPlaceholder('Type to search').clear().type(user1.email);
      cy.get('#delete-record-4').should('be.visible');
      cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
      cy.findByPlaceholder('Type to search').clear().type(user1.age);
      cy.get('#delete-record-4').should('be.visible');
      cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
      cy.findByPlaceholder('Type to search').clear().type(user1.salary);
      cy.get('#delete-record-4').should('be.visible');
      cy.get('.rt-tbody').should('not.contain', '#delete-record-2');
      cy.findByPlaceholder('Type to search').clear().type(user1.department);
      cy.get('#delete-record-4').should('be.visible');
      cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
    });
  });
});
