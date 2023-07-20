/// <reference types='cypress' />
const faker = require('faker');

let userok;

beforeEach(() => {
  cy.task('generateUser').then((generateUser) => {
    userok = generateUser;
  });
  cy.visit('/');
});

describe('Web Tables page', () => {
  it('should switch pagination', () => {
    cy.addTenUsers();
    cy.contains('button', 'Next').should('be.visible');
    cy.contains('button', 'Next').click({ force: true });
    cy.contains('button', 'Previous').should('be.visible');
    cy.contains('button', 'Previous').click({ force: true });
    cy.get('[aria-label="jump to page"]').type('2{enter}');
    cy.get('[aria-label="jump to page"]').type(`1{enter}`);
  });

  it('should add user', () => {
  let user; 

  user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: String(Math.floor(Math.random(100) * 100)),
    salary: Math.floor(Math.random(10000) * 10000),
    email: faker.internet.email(),
    department: faker.lorem.word()
  };

  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(user.firstName);
  cy.get('#lastName').type(user.lastName);
  cy.get('#userEmail').type(user.email);
  cy.get('#age').type(user.age);
  cy.get('#salary').type(user.salary);
  cy.get('#department').type(user.department);
  cy.get('#submit').click();

  cy.contains('div', user.firstName).should('have.text', user.firstName);
  cy.contains('div', user.lastName).should('have.text', user.lastName);;
  cy.contains('div', user.email).should('have.text', user.email);
  cy.contains('div', user.age).should('have.text', user.age);
  cy.contains('div', user.salary).should('have.text', user.salary);
  cy.contains('div', user.department).should('have.text', user.department);
  });
  
  it('should delete user', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
  })

  it('should select rows count', () => {
    const randomIndex = Math.floor(Math.random() * 5);
    const rowNumerations = ['5', '10', '20', '25', '50', '100'];
    const rowsNumeration = rowNumerations[randomIndex];

    cy.get('[aria-label="rows per page"]').select(rowsNumeration);

    cy.get('.rt-tr-group').should('have.length', rowsNumeration);
  });

  it('should delete all users', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
    cy.get('.rt-noData').should('contain', 'No rows found');
  });
  
  it('should search user and edit their data', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(userok.firstName);
    cy.get('#submit').click()
    cy.contains('div', userok.firstName).should('have.text', userok.firstName);
  });

  it('should search user through any column values', () => {
    cy.get('#searchBox').type('Ci');
    cy.get('.rt-table').should('have.text', 'Cierra');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('cant');
    cy.get('.rt-table').should('have.text', 'Cantrell');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('29');
    cy.get('.rt-table').should('have.text', '29');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('kierra');
    cy.get('.rt-table').should('have.text', 'kierra@example.com');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('2000');
    cy.get('.rt-table').should('have.text', '2000');
    cy.get('#searchBox').clear();

    cy.findById('searchBox').type('leg');
    cy.get('.rt-table').should('have.text', 'Legal');
    cy.get('#searchBox').clear();
  });
});


