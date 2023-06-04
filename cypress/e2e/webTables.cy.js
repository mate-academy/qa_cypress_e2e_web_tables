describe('Web Tables page', () => {
  const testData = {
    firstname: 'Kendrick',
    lastname: 'Lamar',
    email: 'lamar.k@qa.team',
    age: 35,
    salary: 20000,
    department: 'QA'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should be a pagination in the table', () => {
    cy.get('.-pagination')
      .should('exist');

    cy.get('.-pageInfo')
      .should('exist');

    cy.contains('.-previous', 'Previous')
      .should('exist');

    cy.contains('.-next', 'Next')
      .should('exist');
  });

  it('should select rows number per page', () => {
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');

    cy.get('select')
      .should('contain', '5 rows');
  });

  it('should allow to add new employee', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('.modal-content')
      .should('exist');

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

    cy.get('[role="rowgroup" ]')
      .should('contain', testData.firstname)
      .and('contain', testData.lastname)
      .and('contain', testData.email)
      .and('contain', testData.age)
      .and('contain', testData.salary)
      .and('contain', testData.department);
  });

  it('should allow to delete employee', () => {
    cy.get('#delete-record-3')
      .should('exist');

    cy.get('#delete-record-3')
      .click();
  });

  it('sholud allow to delete all employyes', () => {
    cy.get('.rt-tr-group')
      .its('length')
      .then((initialRecordCount) => {
        initialRecordCount = 3;
        for (let i = 1; i <= initialRecordCount; i++) {
          cy.get(`#delete-record-${i}`)
            .should('exist').click();
        }
      });

    cy.contains('.rt-noData', 'No rows found');
  });

  it('should allow to find a user from the Search field and edit his records', () => {
    cy.get('#searchBox')
      .type('Alden');

    cy.get('#basic-addon2').click();

    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain', 'Alden');

    cy.get('#edit-record-2')
      .click();

    cy.get('#firstName')
      .type('_edited');

    cy.get('#submit')
      .should('exist')
      .click();

    cy.get('[role="row"]')
      .should('contain', 'Alden_edited');
  });

  it('should allow to find employee by all column values', () => {
    cy.get('#searchBox')
      .type('Kierra');

    cy.get('[role="row"]')
      .should('contain', 'Kierra');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('Gentry');

    cy.get('.rt-td')
      .should('contain', 'Gentry');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('29');

    cy.get('.rt-td')
      .should('contain', '29');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('kierra@example.com');

    cy.get('.rt-td')
      .should('contain', 'kierra@example.com');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('2000');

    cy.get('.rt-td')
      .should('contain', '2000');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('Legal');

    cy.get('.rt-td')
      .should('contain', 'Legal');
  });
});
