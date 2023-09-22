/// <reference types='cypress' />
import Chance from 'chance';
describe("WebTables App Tests", () => {
    beforeEach(() => {
      cy.visit('https://demoqa.com/webtables');
  });
  const chance = new Chance();
  const randomNum = Math.random().toString().slice(2);
  const username = chance.first();
  const surname = chance.last();
  const email = `test_email_${randomNum}@gmail.com`;
  const depart = 'finance'
  const age = Math.random().toString().slice(2, 4);
  const new_username = chance.first();
  const new_surname = chance.last();
   
    it("Should test pagination", () => {
      cy.get('input[value = "1"]').should('exist');
      cy.contains('button','Previous').should('exist');
      cy.contains('button','Next').should("exist");
    });
  
    it("Should test rows count selection", () => {
        cy.get('option[value = "5"]').should("exist");
        cy.get('option[value = "5"]').click({force: true});
        cy.get('option[value = "10"]').should("exist");
        cy.get('option[value = "10"]').click({force: true});
        cy.get('option[value = "20"]').should("exist");
        cy.get('option[value = "20"]').click({force: true});
        cy.get('option[value = "25"]').should("exist");
        cy.get('option[value = "25"]').click({force: true})
        cy.get('option[value = "50"]').should("exist");
        cy.get('option[value = "50"]').click({force: true})
        cy.get('option[value = "100"]').should("exist");
        cy.get('option[value = "100"]').click({force: true})
    });
  
    it("Should add a new worker", () => {
      cy.contains('button', 'Add').click();
      cy.get('div[class = "modal-header"]').should('exist');
      cy.get('div[class = "modal-title h4"]').should('contain.text', 'Registration Form');
      cy.get('input[placeholder = "First Name"]').type(username);
      cy.get('input[placeholder = "Last Name"]').type(surname);
      cy.get('input[placeholder = "name@example.com"]').type(email);
      cy.get('input[placeholder = "Age"]').type(age);
      cy.get('input[placeholder = "Salary"]').type(randomNum);
      cy.get('input[placeholder = "Department"]').type(depart + `{Enter}`); 
    });
  
    it("Should delete a worker", () => {
        cy.contains('button', 'Add').click();
        cy.get('div[class = "modal-header"]').should('exist');
        cy.get('div[class = "modal-title h4"]').should('contain.text', 'Registration Form');
        cy.get('input[placeholder = "First Name"]').type(username);
        cy.get('input[placeholder = "Last Name"]').type(surname);
        cy.get('input[placeholder = "name@example.com"]').type(email);
        cy.get('input[placeholder = "Age"]').type(age);
        cy.get('input[placeholder = "Salary"]').type(randomNum);
        cy.get('input[placeholder = "Department"]').type(depart + `{Enter}`); 
        cy.contains('div.rt-td', email)
    .parent('div.rt-tr')
    .find('span[id^="delete-record"]')
    .should('be.visible')
    .click();
    });
  
    it("Should delete all workers", () => {
        cy.contains('button', 'Add').click();
        cy.get('div[class = "modal-header"]').should('exist');
        cy.get('div[class = "modal-title h4"]').should('contain.text', 'Registration Form');
        cy.get('input[placeholder = "First Name"]').type(username);
        cy.get('input[placeholder = "Last Name"]').type(surname);
        cy.get('input[placeholder = "name@example.com"]').type(email);
        cy.get('input[placeholder = "Age"]').type(age);
        cy.get('input[placeholder = "Salary"]').type(randomNum);
        cy.get('input[placeholder = "Department"]').type(depart + `{Enter}`); 
        const deleteUsers = () => {
            // Check if there are any delete buttons left
            cy.get('span[id^="delete-record"]').should('be.visible').then((deleteButtons) => {
              if (deleteButtons.length > 1) {
                // Click the first visible delete button
                cy.wrap(deleteButtons.first()).click();
                // Wait for a moment to ensure the row is deleted (adjust the wait time if needed)
                cy.wait(1000);
                // Recursively delete the next user
                deleteUsers();
              } else {
                // No more users to delete, exit the function
                return;
              }
            });
          };
        
          // Start deleting users
          deleteUsers();
          cy.contains('div.rt-td', email)
    .parent('div.rt-tr')
    .find('span[id^="delete-record"]')
    .should('be.visible')
    .click();
    cy.contains('body', 'No rows found').should('exist');
    });
  
    it("Should find a worker in the search field and edit it", () => {
        cy.contains('button', 'Add').click();
        cy.get('div[class = "modal-header"]').should('exist');
        cy.get('div[class = "modal-title h4"]').should('contain.text', 'Registration Form');
        cy.get('input[placeholder = "First Name"]').type(username);
        cy.get('input[placeholder = "Last Name"]').type(surname);
        cy.get('input[placeholder = "name@example.com"]').type(email);
        cy.get('input[placeholder = "Age"]').type(age);
        cy.get('input[placeholder = "Salary"]').type(randomNum);
        cy.get('input[placeholder = "Department"]').type(depart + `{Enter}`); 
        cy.get('input[placeholder = "Type to search"]').type(email)
        cy.contains('div.rt-td', email)
          .parent('div.rt-tr')
          .find('span[id^="edit-record"]')
          .should('be.visible')
          .click();
        cy.get('div[class = "modal-header"]').should('exist');
        cy.get('div[class = "modal-title h4"]').should('contain.text', 'Registration Form');
        cy.get('input[placeholder = "First Name"]')
          .clear(username)
          .type(new_username);
        cy.get('input[placeholder = "Last Name"]')
          .clear(surname)
          .type(new_surname + `{Enter}`);
    });
  
    it("Should validate data in worker row after creating worker", () => {
        cy.contains('button', 'Add').click();
        cy.get('div[class = "modal-header"]').should('exist');
        cy.get('div[class = "modal-title h4"]').should('contain.text', 'Registration Form');
        cy.get('input[placeholder = "First Name"]').type(username);
        cy.get('input[placeholder = "Last Name"]').type(surname);
        cy.get('input[placeholder = "name@example.com"]').type(email);
        cy.get('input[placeholder = "Age"]').type(age);
        cy.get('input[placeholder = "Salary"]').type(randomNum);
        cy.get('input[placeholder = "Department"]').type(depart + `{Enter}`); 
        cy.get('input[placeholder = "Type to search"]').type(email);
        cy.contains('div[role="row"]', email).should('exist').within(() => {
            // Assuming the email is unique and used to locate the row
        cy.contains('div[role="gridcell"]', username).should('exist');
        cy.contains('div[role="gridcell"]', surname).should('exist');
        cy.contains('div[role="gridcell"]', email).should('exist');
        cy.contains('div[role="gridcell"]', age).should('exist');
        cy.contains('div[role="gridcell"]', randomNum).should('exist');
        cy.contains('div[role="gridcell"]', depart).should('exist');
        });
    });
    it("Check search by all column values.", () => {
        cy.contains('button', 'Add').click();
        cy.get('div[class = "modal-header"]').should('exist');
        cy.get('div[class = "modal-title h4"]').should('contain.text', 'Registration Form');
        cy.get('input[placeholder = "First Name"]').type(username);
        cy.get('input[placeholder = "Last Name"]').type(surname);
        cy.get('input[placeholder = "name@example.com"]').type(email);
        cy.get('input[placeholder = "Age"]').type(age);
        cy.get('input[placeholder = "Salary"]').type(randomNum);
        cy.get('input[placeholder = "Department"]').type(depart + `{Enter}`); 
        cy.get('input[placeholder = "Type to search"]').type(email);
        cy.get('input[placeholder = "Type to search"]').clear().type(surname);
        cy.get('input[placeholder = "Type to search"]').clear().type(username)
        cy.get('input[placeholder = "Type to search"]').clear().type(age);
        cy.get('input[placeholder = "Type to search"]').clear().type(randomNum)
        cy.get('input[placeholder = "Type to search"]').clear().type(depart)
      });
      
  });
