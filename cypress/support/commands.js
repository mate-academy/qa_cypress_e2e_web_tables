Cypress.Commands.add('fillInRegistrationForm', () => {
    const names = ['James', 'Robert', 'Paul', 'David', 'William'];
    const lastNames = ['Smith', 'Devi', 'Clarkson', 'Bowie', 'Bush'];
    const email = Math.random().toString(36).slice(2, 9) + '@mail.com';
    const age = randomIntFromInterval(20, 60);
    const salary = (Math.floor(Math.random() * 90 + 10)) + '00';
    const departments = ['Insurance', 'Legal', 'Compliance', 'Finances'];
    
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    };

    function selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    cy.get('#firstName')
    .type(selectRandom(names));

    cy.get('#lastName')
    .type(selectRandom(lastNames));

    cy.get('#userEmail')
    .type(email);

    cy.get('#age')
    .type(age);

    cy.get('#salary')
    .type(salary);

    cy.get('#department')
    .type(selectRandom(departments));

    cy.get('#submit')
    .click();
});

Cypress.Commands.add('addWorker', () => {
    
    cy.get('#addNewRecordButton')
    .click();

    cy.fillInRegistrationForm();
});
