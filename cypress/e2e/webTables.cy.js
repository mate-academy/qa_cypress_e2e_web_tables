/// <reference types='cypress' />

const faker = require("faker");

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const age = faker.random.number().toString().slice(0, 2);
const salary = faker.random.number().toString().slice(0, 10);
const department = faker.random.word();
const searchItem = 'vega';

describe('Web Tables page', () => 
{
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it.skip('Should navigate through pagination', () => {
    //Since the button is not active, this will not work.
    cy.get('.-next > button:nth-child(1)').click();
    cy.get('.-pageJump > input:nth-child(1)').should('contain', '2');
  });

  it('Should change the number of rows displayed', () => {
    cy.get('.select-wrap > select:nth-child(1)').select('25');
    cy.get('.rt-tr-group').should('have.length', 25);
  });

  it('Should add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('#searchBox').type(email);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(4)')
      .should('contain', email);
  });

  it('Should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
  });

  it('Should delete all workers', () => {
    let number = 1;
    let stopClicking = false;

    function clickUntilNoData() {
      if (stopClicking) {
        return;
      }

    cy.get(`#delete-record-${number}`).click();
    cy.get('.rt-noData', { timeout: 0 }).should(($noData) => {
      if ($noData.length > 0) {
        stopClicking = true;
        expect($noData).to.contain('No rows found');
        }
      }).then(() => {
        if (!stopClicking) {
          number++;
          clickUntilNoData();
        }
      });
    }

  clickUntilNoData();
});

  it('Should find and edit a worker', () => {
    cy.get('#searchBox').type(searchItem);
    cy.get('#edit-record-1').click();
    cy.get('#firstName').type(firstName);
    cy.get('#submit').click();
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(1)')
      .should('contain', firstName);
  });

  it('Should validate data in a worker row after creating a worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('#searchBox').type(email);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(1)')
      .should('contain', firstName);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(2)')
      .should('contain', lastName);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(3)')
      .should('contain', age);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(4)')
      .should('contain', email);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(5)')
      .should('contain', salary);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(6)')
      .should('contain', department);
  });

  it('Should search by all column values', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();

    cy.get('#searchBox').type(firstName);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(1)')
      .should('contain', firstName);
    
    cy.get('#searchBox').clear().type(lastName);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(2)')
        .should('contain', lastName);

    cy.get('#searchBox').clear().type(age);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(3)')
      .should('contain', age);

    cy.get('#searchBox').clear().type(email);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(4)')
      .should('contain', email);

    cy.get('#searchBox').clear().type(salary);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(5)')
      .should('contain', salary);

    cy.get('#searchBox').clear().type(department);
    cy.get('div.rt-tr-group:nth-child(1) > div:nth-child(1) > div:nth-child(6)')
      .should('contain', department);
  });
});
