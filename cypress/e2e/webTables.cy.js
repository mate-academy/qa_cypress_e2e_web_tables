/// <reference types='cypress' />

const generateUser = require('../support/generateUser');
const addEmployee = require('../support/addEmployee');
const searchAndVerify = (searchValue) => {
  cy.get('#searchBox').clear().type(searchValue);
  cy.get('#basic-addon2').click();
  cy.get('.rt-tbody').contains('.rt-tr-group', searchValue)
    .should('be.visible');
};

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between pages', () => {
    cy.get('.-pageInfo')
      .contains('Page')
      .should('exist')
      .and('be.visible');
    cy.get('input[aria-label="jump to page"]')
      .should('exist')
      .and('be.visible')
      .and('have.value', '1');
    cy.get('.-btn')
      .contains('Previous')
      .should('exist')
      .and('be.visible');
    cy.get('.-btn')
      .contains('Next')
      .should('exist')
      .and('be.visible');
  });

  it('should allow row count selection', () => {
    const rowCounts = [5, 10, 20, 25, 50, 100];
    rowCounts.forEach((count) => {
      cy.get('select[aria-label="rows per page"]')
        .select(count.toString())
        .should('have.value', count.toString());
    });
  });

  it('should add a new worker', () => {
    const user = generateUser();
    addEmployee(user);
  });

  it('should find and edit a worker', () => {
    const user = generateUser();
    addEmployee(user);
    searchAndVerify(user.lastName);
    cy.get('span[title="Edit"]').click();
    cy.get('.modal-header').should('exist').and('be.visible');
    cy.get('#firstName').clear().type('Testname');
    cy.get('#submit').click();
    searchAndVerify('Testname');
    cy.get('span[title="Edit"]').click();
    cy.get('#lastName').clear().type('Testsurname');
    cy.get('#submit').click();
    searchAndVerify('Testsurname');
    cy.get('span[title="Edit"]').click();
    cy.get('#userEmail').clear().type('testemail@gmail.com');
    cy.get('#submit').click();
    searchAndVerify('testemail@gmail.com');
    cy.get('span[title="Edit"]').click();
    cy.get('#age').clear().type('50');
    cy.get('#submit').click();
    searchAndVerify('50');
    cy.get('span[title="Edit"]').click();
    cy.get('#salary').clear().type('20000');
    cy.get('#submit').click();
    searchAndVerify('20000');
    cy.get('span[title="Edit"]').click();
    cy.get('#department').clear().type('testdepartment');
    cy.get('#submit').click();
    searchAndVerify('testdepartment');
  });

  it('should delete a worker', () => {
    const user = generateUser();
    addEmployee(user);
    cy.get('#searchBox').type(user.lastName);
    cy.get('#basic-addon2').click();
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', user.lastName)
      .should('be.visible');
    cy.get('span[title="Delete"]')
      .click();
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', user.lastName)
      .should('not.exist');
  });

  it('should delete all workers', () => {
    const users = [generateUser(), generateUser()];
    users.forEach((user) => addEmployee(user));
    const deleteAllWorkers = () => {
      cy.get('.rt-tbody .rt-tr-group').then(($rows) => {
        if ($rows.length > 0) {
          const firstRow = $rows.first();
          cy.wrap(firstRow).find('.rt-td').eq(0).invoke('text')
            .then((firstName) => {
              if (firstName.trim() === '') {
              } else {
                cy.wrap(firstRow).find('span[title="Delete"]').click()
                  .then(() => {
                    deleteAllWorkers();
                  });
              }
            });
        } else {
          cy.get('.rt-tbody').should('not.exist');
        }
      });
    };
    deleteAllWorkers();
    cy.get('.rt-tbody .rt-tr-group').first().find('.rt-td')
      .first().invoke('text')
      .then((firstName) => {
        expect(firstName.trim()).to.equal('');
      });
  });
});
