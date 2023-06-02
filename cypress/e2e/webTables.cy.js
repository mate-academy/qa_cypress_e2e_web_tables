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
  });

  it('should allow to delete workers', () => {
    cy.findById('delete-record-1')
      .click();

    cy.get('span[data-toggle="tooltip"][title="Delete"]')
      .click({ multiple: true });
  });

  it('should allow to find and edit worker', () => {
    const search = {
      fName: 'Cierra',
      lName: 'Vegaa',
      aAge: 39,
      eEmail: 'cierra@example.com',
      sSalary: 10000,
      dDepartment: 'Insurance'
    };
    const edit = 'a';

    cy.findById('searchBox')
      .clear()
      .type(search.fName);

    cy.get('span[data-toggle="tooltip"][title="Edit"]')
      .click();

    cy.findById('lastName')
      .type(edit);

    cy.findById('submit')
      .click();

    cy.contains('[role="row"]', `Vega${edit}`)
      .should('exist');

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
