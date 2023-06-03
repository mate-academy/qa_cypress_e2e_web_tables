describe('Web Tables page', () => {
  const worker = {
    firstName: 'Roberto',
    lastName: 'Petrushka',
    age: 27,
    email: 'r.petrushka@gmail.com',
    salary: 25000,
    department: 'Marketing',
  }

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    });
  
  
  it('should contain a pagination', () => {
    cy.get('.-pagination')
      .should('exist');

    cy.contains('.-previous', 'Previous')
      .should('exist');

    cy.contains('.-next', 'Next')
      .should('exist');

    cy.contains('.-pageInfo', 'Page')
      .should('exist');
  });

  it('should provide an ability to change number of rows', () => {
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');

    cy.get('.rt-tr-group')
      .should('have.length', 5)
  });

  it('should provide an ability to add new worker', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('.modal-content')
      .should('contain', 'Registration Form');

    cy.findByPlaceholder('First Name')
      .type(worker.firstName);

    cy.findByPlaceholder('Last Name')
      .type(worker.lastName);

    cy.findByPlaceholder('name@example.com')
      .type(worker.email);

    cy.findByPlaceholder('Age')
      .type(worker.age);

    cy.findByPlaceholder('Salary')
      .type(worker.salary);

    cy.findByPlaceholder('Department')
      .type(worker.department);

    cy.get('#submit')
      .click();

    cy.get('.rt-tbody')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should provide an ability to delete worker', () => {
    cy.get('#delete-record-1')
      .should('exist');

    cy.get('#delete-record-1')
      .click();
  });
  
  // it('should delete all workers', () => {
  //   cy.get('.rt-tr-group').each(($row) => {
  //   cy.wrap($row)
  //     .find('[title="Delete"]')
  //     .click();
  //   });
  // });

  it('should delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
      
    cy.get('#delete-record-2')
      .click();

    cy.get('#delete-record-3')
      .click();
  });

  it('should provide an ability to search and edit worker', () => {
    cy.findByPlaceholder('Type to search')
        .type('Alden');

    cy.get('#edit-record-2')
        .click();

    cy.findByPlaceholder('First Name')
        .type('{selectall}Federico');  

    cy.get('#submit')
        .click();

    cy.get('.rt-tbody')
        .should('contain', 'Federico');     
    });  
});
