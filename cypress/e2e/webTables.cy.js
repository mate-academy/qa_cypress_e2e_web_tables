/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  before(() => {
    cy.task('generateWorker').then(generatedWorker => {
      worker = generatedWorker;
    });
  });

  it('pagination should be displayed', () => {
    cy.visit('/webtables');
    //Pagination assertions
    cy.get('.-pageJump').should('be.visible');
    cy.get('[aria-label="jump to page"]').should('contain.value', '1');
  });

  it('rows should be displayed', () => {
    cy.visit('/webtables');
    //Rows assertions
    cy.get('.select-wrap.-pageSizeOptions').click()
    cy.get('[aria-label="rows per page"]').select('10 rows');
    cy.get('.rt-tbody').find('.rt-tr-group').should('have.length', '10');
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('.rt-tbody').find('.rt-tr-group').should('have.length', '5');
  })

  it('should add a new worker', () => {
    cy.visit('/webtables');
    //Add a new worker
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type(worker.firstName);
    cy.get('[placeholder="Last Name"]').type(worker.lastName);
    cy.get('[placeholder="name@example.com"]').type(worker.email);
    cy.get('[placeholder="Age"]').type(worker.age);
    cy.get('[placeholder="Salary"]').type(worker.salary);
    cy.get('[placeholder="Department"]').type(worker.department);
    cy.get('button').contains('Submit').click();
    //Added worker asserction
    cy.get('.rt-td').should('contain.text', worker.firstName);
    cy.get('.rt-td').should('contain.text', worker.lastName);
    cy.get('.rt-td').should('contain.text', worker.email);
    cy.get('.rt-td').should('contain.text', worker.age);
    cy.get('.rt-td').should('contain.text', worker.salary);
    cy.get('.rt-td').should('contain.text', worker.department);
  })

  it('should delete a worker', () => {
    cy.visit('/webtables');
    //Add a new worker before deleting
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type(worker.firstName);
    cy.get('[placeholder="Last Name"]').type(worker.lastName);
    cy.get('[placeholder="name@example.com"]').type(worker.email);
    cy.get('[placeholder="Age"]').type(worker.age);
    cy.get('[placeholder="Salary"]').type(worker.salary);
    cy.get('[placeholder="Department"]').type(worker.department);
    cy.get('button').contains('Submit').click();
    //Delete
    cy.get('#delete-record-4').click();
    //Assertion to deleted worker
    cy.get('.rt-td').should('not.contain.text', worker.firstName);
    cy.get('.rt-td').should('not.contain.text', worker.lastName);
    cy.get('.rt-td').should('not.contain.text', worker.email);
    cy.get('.rt-td').should('not.contain.text', worker.age);
    cy.get('.rt-td').should('not.contain.text', worker.salary);
    cy.get('.rt-td').should('not.contain.text', worker.department);
  })

  it('should delete all workers', () => {
    cy.visit('/webtables');
    //Delete all workers
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    //Assertion
    cy.get('.rt-noData').should('contain.text', 'No rows found');
  })

  it('should find a worker from the search field and edit data', () => {
    cy.visit('/webtables');
    //Add a worker
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type(worker.firstName);
    cy.get('[placeholder="Last Name"]').type(worker.lastName);
    cy.get('[placeholder="name@example.com"]').type(worker.email);
    cy.get('[placeholder="Age"]').type(worker.age);
    cy.get('[placeholder="Salary"]').type(worker.salary);
    cy.get('[placeholder="Department"]').type(worker.department);
    cy.get('button').contains('Submit').click();
    // Search for a worker 
    cy.get('[placeholder="Type to search"]')
      .type(`${worker.email}`);
      cy.get('.action-buttons').find('[title="Edit"]').click();
    //Change the data
    cy.get('[placeholder="First Name"]').clear()
    .type(worker.changedFirstName);
    cy.get('[placeholder="Last Name"]').clear()
    .type(worker.changedLastName);
    cy.get('[placeholder="name@example.com"]').clear()
    .type(worker.changedEmail);
    cy.get('[placeholder="Age"]').clear()
    .type(worker.changedAge);
    cy.get('[placeholder="Salary"]').clear()
    .type(worker.changedSalary);
    cy.get('[placeholder="Department"]').clear()
    .type(worker.changedDepartment);
    cy.get('button').contains('Submit').click();
    cy.get('[placeholder="Type to search"]').clear();
    //Assertion if data were changed
    cy.get('.rt-td').should('contain.text', worker.changedFirstName);
    cy.get('.rt-td').should('contain.text', worker.changedLastName);
    cy.get('.rt-td').should('contain.text', worker.changedEmail);
    cy.get('.rt-td').should('contain.text', worker.changedAge);
    cy.get('.rt-td').should('contain.text', worker.changedSalary);
    cy.get('.rt-td').should('contain.text', worker.changedDepartment);
  })

    it('should check the search by all column values', () => {
      cy.visit('/webtables');
      //Add a worker before searching
      cy.get('#addNewRecordButton').click();
      cy.get('[placeholder="First Name"]').type(worker.changedFirstName);
      cy.get('[placeholder="Last Name"]').type(worker.changedLastName);
      cy.get('[placeholder="name@example.com"]').type(worker.changedEmail);
      cy.get('[placeholder="Age"]').type(worker.changedAge);
      cy.get('[placeholder="Salary"]').type(worker.changedSalary);
      cy.get('[placeholder="Department"]').type(worker.changedDepartment);
      cy.get('button').contains('Submit').click();
      //Check the search by column First Name
      cy.get('[placeholder="Type to search"]').type(worker.changedFirstName);
      cy.get('.rt-tbody').should('contain.text', worker.changedFirstName);
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type(worker.changedLastName);
      cy.get('.rt-tbody').should('contain.text', worker.changedLastName);
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type(worker.changedEmail);
      cy.get('.rt-tbody').should('contain.text', worker.changedEmail);
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type(worker.changedAge);
      cy.get('.rt-tbody').should('contain.text', worker.changedAge);
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type(worker.changedSalary);
      cy.get('.rt-tbody').should('contain.text', worker.changedSalary);
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type(worker.changedDepartment);
      cy.get('.rt-tbody').should('contain.text', worker.changedDepartment);
      cy.get('[placeholder="Type to search"]').clear();
    });
});
