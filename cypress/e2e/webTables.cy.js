describe('Web Tables page', () => {

  const testData = {
    firstname: 'Frank',
    lastname: 'Lampard',
    email: 'userqa007@qa.team',
    age: 35,
    salary: 20000,
    department: 'QA',
  };

  beforeEach(() => {
    cy.visit('/')
  });

  it('table should contain a paganation', () => {
    cy.get('.-pagination')
      .should('exist');
    cy.get('.-pageInfo')
      .should('exist');
    cy.contains('.-previous', 'Previous')
      .should('exist');
    cy.contains('.-next', 'Next')
      .should('exist');
  });

  it('rows count selection', () => {
    cy.get('select')
      .select('5 rows');
    cy.get('select')
      .should('contain', '5 rows');
  });

  it('add new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.findByPlaceholder('First Name')
      .type(testData.firstname);
    cy.findByPlaceholder('Last Name')
      .type(testData.lastname);
    cy.get('#userEmail')
      .type(testData.email);
    cy.findByPlaceholder('Age')
      .type(testData.age);
    cy.findByPlaceholder('Salary')
      .type(testData.salary);
    cy.findByPlaceholder('Department')
      .type(testData.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-tr-group')
      .should('contain', testData.firstname)
      .and('contain', testData.lastname)
      .and('contain', testData.email)
      .and('contain', testData.age)
      .and('contain', testData.salary)
      .and('contain', testData.department);
  });

  it('delete worker', () => {
    cy.get('#delete-record-1')
      .should('exist');
    cy.get('#delete-record-1')
      .click();
    });

  it('delete all worker', () => {
    cy.get('.rt-tr-group').each(($row) => {
    cy.wrap($row)
      .find('[title="Delete"]')
      .click();
    });
  });

  it('find worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('.rt-tr-group')
      .should('contain', 'Cierra')
      .and('contain', 'Vega');
    cy.get('.mr-2')
      .click();
    cy.findByPlaceholder('First Name')
      .clear()
      .type(testData.firstname);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .clear()
      .type('Vega');
    cy.get('#searchBox')
      .clear()
      .type(testData.firstname);
    cy.get('#searchBox')
      .clear()
      .type(39);
    cy.get('#searchBox')
      .clear()
      .type('cierra@example.com');
    cy.get('#searchBox')
      .clear()
      .type(10000);
    cy.get('#searchBox')
      .clear()
      .type('Insurance');
  });
});
