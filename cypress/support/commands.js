// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addRundomUsersInTable', (count) => {
  for (let i = 1; i <= count; i++) {
    function generateRandomEnglishString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let randomString = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
      }
      return randomString;
    }

    function generateRandomEmail() {
      const boxName = generateRandomEnglishString(10);
      const domain1 = generateRandomEnglishString(7);
      const domain2 = generateRandomEnglishString(4);
      return `${boxName}@${domain1}.${domain2}`;
    }

    const age = Math.floor(Math.random() * 91) + 7;
    const salary = Math.floor(Math.random() * 99444) + 666;

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(`${i}-${generateRandomEnglishString(7)}`);
    cy.get('#lastName').type(generateRandomEnglishString(14));
    cy.get('#userEmail').type(generateRandomEmail());
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(generateRandomEnglishString(5));
    cy.get('#submit').click();
  }
});

Cypress.Commands.add('clickBtnName', (BntName) => {
  cy.contains('.-btn', BntName).click();
});
