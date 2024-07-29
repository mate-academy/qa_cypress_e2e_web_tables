// support.js
export const createUser = (firstName, lastName, email,
  age, salary, department) => {
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
