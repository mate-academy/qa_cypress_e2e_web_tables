const { generateWorker } = require('../support/generateWorker');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const worker = generateWorker();

  it('should have navigation elements', () => {
    const selectRow = '5 rows';
    cy.get('.-pageInfo')
      .should('exist');

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('select')
      .select(selectRow)
      .should('have.value', '5');
  });

  it('should allow to add worker', () => {
    cy.findById('addNewRecordButton')
      .click();

    cy.findById('firstName')
      .type(worker.firstName);

    cy.findById('lastName')
      .type(worker.lastName);

    cy.findById('userEmail')
      .type(worker.email);

    cy.findById('age')
      .type(worker.age);

    cy.findById('salary')
      .type(worker.salary);

    cy.findById('department')
      .type(worker.department);

    cy.findById('submit')
      .click();

    cy.get('.rt-td')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should allow to delete workers', () => {
    cy.findById('delete-record-1')
      .click();

    cy.get('[id^=delete-record-]').then($elements => {
      $elements.each((index) => {
        const deleteButtonSelector = `#delete-record-${index + 2}`;
        cy.get(deleteButtonSelector)
          .should('exist');
        cy.get(deleteButtonSelector)
          .click();
        cy.get(deleteButtonSelector)
          .should('not.exist');
      });
    });
  });

  it('should allow to find and edit workers', () => {
    const search = {
      fName: 'Cierra',
      lName: 'Vega',
      aAge: 39,
      eEmail: 'cierra@example.com',
      sSalary: 10000,
      dDepartment: 'Insurance'
    };
    const edit = 'edit';

    cy.findById('searchBox')
      .clear()
      .type(search.fName);

    cy.get('span[data-toggle="tooltip"][title="Edit"]')
      .click();

    cy.findById('lastName')
      .type(edit);

    cy.findById('submit')
      .click();

    cy.get('[role="row"]')
      .should('contain', `Vega${edit}`);

    cy.findById('searchBox')
      .clear()
      .type(search.lName);

    cy.findById('searchBox')
      .clear()
      .type(search.aAge);

    cy.findById('searchBox')
      .clear()
      .type(search.eEmail);

    cy.findById('searchBox')
      .clear()
      .type(search.sSalary);

    cy.findById('searchBox')
      .clear()
      .type(search.dDepartment);
  });
});
