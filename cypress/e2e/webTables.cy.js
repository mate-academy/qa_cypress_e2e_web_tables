/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should navigate through pagination', () => {
    // Check if pagination is available
    cy.get('.-next').should('be.visible').click();
    cy.get('.-prev').should('be.visible').click();
  });

  it('should change rows count selection', () => {
    // Select different row count from the dropdown
    cy.get('.react-select__value-container').click(); // Open the dropdown
    cy.contains('10').click(); // Select 10 rows per page
    cy.contains('25').click(); // Select 25 rows per page
    cy.contains('50').click(); // Select 50 rows per page
  });

  it('should add a new worker', () => {
    // Click on the "Add" button to add a new worker
    cy.get('#addNewRecordButton').click();
    const newWorker = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: '30',
      salary: '50000',
      department: 'Engineering'
    };

    // Fill in the form to add a new worker
    cy.get('#firstName').type(newWorker.firstName);
    cy.get('#lastName').type(newWorker.lastName);
    cy.get('#userEmail').type(newWorker.email);
    cy.get('#age').type(newWorker.age);
    cy.get('#salary').type(newWorker.salary);
    cy.get('#department').type(newWorker.department);

    // Submit the form to add the new worker
    cy.get('#submit').click();

    // Verify if the worker was added (check the table for the new worker's name)
    cy.contains(newWorker.firstName).should('be.visible');
    cy.contains(newWorker.lastName).should('be.visible');
  });

  it('should delete a worker', () => {
    // Assuming there is at least one worker, delete the first worker
    cy.get('.action-buttons').first()
      .contains('Delete')
      .click();

    // Verify the worker is deleted
    cy.contains('John Doe').should('not.exist'); // Replace with actual worker name
  });

  it('should delete all workers', () => {
    // Click on the delete button for each row (Assuming there are multiple workers)
    cy.get('.action-buttons').each(($btn) => {
      cy.wrap($btn).contains('Delete')
        .click();
    });

    // Verify that the table is empty
    cy.get('.rt-tbody').should('not.contain', 'John Doe'); // Replace with actual worker name
  });

  it('should find a worker in the search field and edit it', () => {
    const workerName = 'John Doe'; // The worker to find

    // Search for the worker
    cy.get('#searchBox').type(workerName);
    cy.contains(workerName).should('be.visible');

    // Edit the worker
    cy.get('.action-buttons').contains('Edit')
      .click();

    // Modify the worker details
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#firstName').clear().type('Jane');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#lastName').clear().type('Smith');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#userEmail').clear().type('jane.smith@example.com');
    cy.get('#submit').click();

    // Verify if the worker's details are updated
    cy.contains('Jane Smith').should('be.visible');
    cy.contains('jane.smith@example.com').should('be.visible');
  });

  it('should check the search by all column values', () => {
    // Search by different columns (e.g., first name, last name, email)
    cy.get('#searchBox').type('Jane');
    cy.contains('Jane Smith').should('be.visible');

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').clear().type('smith');
    cy.contains('Jane Smith').should('be.visible');

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').clear().type('jane.smith@example.com');
    cy.contains('Jane Smith').should('be.visible');
  });
});
