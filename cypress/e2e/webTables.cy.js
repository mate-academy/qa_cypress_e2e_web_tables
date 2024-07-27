/// <reference types='cypress' />

// Define the createUser function
const createUser = (firstName, lastName, email, age, salary, department) => {
  // Click on the add button
  cy.get('#addNewRecordButton').click();
  // Fill in the new worker details
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#userEmail').type(email);
  cy.get('#age').type(age);
  cy.get('#salary').type(salary);
  cy.get('#department').type(department);

  // Click the submit button
  cy.get('#submit').click();

  // Return user details as an object
  return { firstName, lastName, email, age, salary, department };
};

describe('Web Tables Pagination', () => {
  it('should confirm that pagination is present', () => {
    cy.visit('https://demoqa.com/webtables');

    // Assert that the Previous button is initially disabled
    cy.get('.-previous button').should('be.disabled');
    // Assert that the Previous and Next buttons are visible
    cy.get('.-previous button').should('be.visible');
    cy.get('.-next button').should('be.visible');
  });
});

describe('Web Tables Rows Count Selection', () => {
  it('should select 20 rows per page', () => {
    cy.visit('https://demoqa.com/webtables');
    // Open the dropdown for rows per page and select 20 rows
    cy.get('[aria-label="rows per page"]').select('20 rows');
    // Assert that "20 rows" is selected in the dropdown
    cy.get('[aria-label="rows per page"]').should('have.value', '20');
  });

  it('should select 50 rows per page', () => {
    cy.visit('https://demoqa.com/webtables');
    // Open the dropdown for rows per page and select 50 rows
    cy.get('[aria-label="rows per page"]').select('50 rows');
    // Assert that "50 rows" is selected in the dropdown
    cy.get('[aria-label="rows per page"]').should('have.value', '50');
  });
});

describe('Add a New Worker', () => {
  it('should successfully add a new worker', () => {
    // Increase the page load timeout
    cy.visit('https://demoqa.com/webtables', {
      timeout: 120000 // Increase timeout if needed
    });

    // Use the createUser function to add a new worker
    // eslint-disable-next-line max-len
    createUser('John', 'Doe', 'john.doe@example.com', '30', '50000', 'Engineering');

    // Verify the new worker is added to the table
    cy.contains('John').should('exist');
  });
});

describe('Delete a Worker', () => {
  it('should successfully delete a worker', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.get('.action-buttons').its('length').then((rowsLength) => {
      cy.get('#delete-record-' + rowsLength).click();

      cy.get('.action-buttons').its('length').should('eq', rowsLength - 1);
    });
  });
});

describe('Delete All Workers', () => {
  it('should have an ability to delete all users', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.get('.action-buttons').its('length').then((rowsLength) => {
      while (rowsLength > 0) {
        cy.get('#delete-record-' + rowsLength).click();
        rowsLength--;
      }
    });

    cy.get('.rt-noData').should('contain', 'No rows found');
  });
});

describe('Edit Worker', () => {
  it('should find and edit a worker', () => {
    cy.visit('https://demoqa.com/webtables');

    // Use the createUser function to add a new worker
    // eslint-disable-next-line max-len
    const user = createUser('John', 'Doe', 'john.doe@example.com', '30', '50000', 'Engineering');

    // Search for a worker (assuming a search functionality exists)
    cy.get('#searchBox').type(user.firstName);

    // Click on the edit button for the found worker
    cy.get('#edit-record-4').click();

    // Modify the worker's details in the form
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#firstName').clear().type('Edited');

    // Click on the "Submit" button to save the edited record
    cy.get('#submit').click();

    // Assert that the worker's details are updated in the table
    cy.contains('Edited').should('exist');
  });
});

describe('Search by All Column Values', () => {
  it('should search by all column values', () => {
    cy.visit('https://demoqa.com/webtables');
    // Use the createUser function to add a new worker
    // eslint-disable-next-line max-len
    const user = createUser('John', 'Doe', 'john.doe@example.com', '30', '50000', 'Engineering');
    // Perform search by typing in the search box

    // Array of properties to search by
    // eslint-disable-next-line max-len
    const properties = ['firstName', 'lastName', 'email', 'age', 'salary', 'department'];
    // Iterate over each property
    properties.forEach((property) => {
      const value = user[property];

      // Perform search by typing in the search box
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('#searchBox').clear().type(value);

      // Assert that the searched value appears in any column
      cy.get('div[role="grid"] .rt-tr').should('contain', value);
    });
  });
});
