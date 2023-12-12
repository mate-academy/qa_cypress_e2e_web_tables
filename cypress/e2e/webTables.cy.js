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
    cy.get('.-pageJump').should('be.visible');
    cy.get('[aria-label="jump to page"]').should('contain.value', '1');
    cy.get('.select-wrap.-pageSizeOptions').click()
    cy.get('[aria-label="rows per page"]').select('10 rows');
    cy.get('.rt-tbody').find('.rt-tr-group').should('have.length', '10');
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('.rt-tbody').find('.rt-tr-group').should('have.length', '5');
    //Add a worker
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
    //Delete
    cy.get('#delete-record-4').click();
    //Assertion to deleted worker
    cy.get('.rt-td').should('not.contain.text', worker.firstName);
    cy.get('.rt-td').should('not.contain.text', worker.lastName);
    cy.get('.rt-td').should('not.contain.text', worker.email);
    cy.get('.rt-td').should('not.contain.text', worker.age);
    cy.get('.rt-td').should('not.contain.text', worker.salary);
    cy.get('.rt-td').should('not.contain.text', worker.department);
    //Delete all workers
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    //Assertion
    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });
  it.only('should find a worker from the search field', () => {
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
    // Search for a wroker 
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
});
