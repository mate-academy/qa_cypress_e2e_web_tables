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
    cy.get('[id^=delete-record-]').then($elements => {
      $elements.each((index) => {
        const deleteButton = `#delete-record-${index + 1}`;
        cy.get(deleteButton)
          .should('exist');
        cy.get(deleteButton)
          .click();
        cy.get(deleteButton)
          .should('not.exist');
      });
    });
  });

  it.only('find worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('.rt-tr-group')
      .should('contain', 'Cierra');
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
    cy.get('.rt-tr-group')
      .should('contain', 'Vega');
    cy.get('#searchBox')
      .clear()
      .type(testData.firstname);
    cy.get('.rt-tr-group')
      .should('contain', testData.firstname);
    cy.get('#searchBox')
      .clear()
      .type(39);
    cy.get('.rt-tr-group')
      .should('contain', 39);
    cy.get('#searchBox')
      .clear()
      .type('cierra@example.com');
    cy.get('.rt-tr-group')
      .should('contain', 'cierra@example.com');
    cy.get('#searchBox')
      .clear()
      .type(10000);
    cy.get('.rt-tr-group')
      .should('contain', 10000);
    cy.get('#searchBox')
      .clear()
      .type('Insurance');
    cy.get('.rt-tr-group')
      .should('contain', 'Insurance');
  });
});

