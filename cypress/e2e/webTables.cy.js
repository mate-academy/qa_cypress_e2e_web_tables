import { faker } from '@faker-js/faker';
/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  const editValue = faker.number.int({ min: 0, max: 100 });
  const editText = faker.lorem.word();

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('pagination should work', () => {
    cy.get('.-pagination').should('exist');

    for (let i = 0; i < 8; i++) {
      cy.get('#addNewRecordButton').click();

      cy.get('[placeholder^="First Name"]').type(user.firstName);
      cy.get('[placeholder^="Last Name"]').type(user.lastName);
      cy.get('[placeholder^="name@example.com"]').type(user.email);
      cy.get('[placeholder^="Age"]').type(user.age);
      cy.get('[placeholder^="Salary"]').type(user.salary);
      cy.get('[placeholder^="Department"]').type(user.department);

      cy.get('#submit').click();
    };

    cy.get('[aria-label="jump to page"]').should('have.value', '1');
    cy.get('[aria-label="jump to page"]').type('2', `{enter}`);
    cy.get('[aria-label="jump to page"]').should('have.value', '2');

    cy.get('[placeholder^="Type to search"]').click();
    /// use it to activate Previos button

    cy.contains('.-btn', 'Previous').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '1');

    cy.contains('.-btn', 'Next').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '2');
  });

  it('rows count should work', () => {
    cy.get('.select-wrap').should('exist');

    cy.get('.rt-tr-group > div').should(($div) => {
      expect($div).to.have.length(10);
    });

    cy.get('[aria-label="rows per page"]').select(0);
    cy.get('.rt-tr-group > div').should(($div) => {
      expect($div).to.have.length(5);
    });
  });

  it('operation adding and deleting with workers should work', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('[placeholder^="First Name"]').type(user.firstName);
    cy.get('[placeholder^="Last Name"]').type(user.lastName);
    cy.get('[placeholder^="name@example.com"]').type(user.email);
    cy.get('[placeholder^="Age"]').type(user.age);
    cy.get('[placeholder^="Salary"]').type(user.salary);
    cy.get('[placeholder^="Department"]').type(user.department);

    cy.get('#submit').click();

    cy.get('.ReactTable').should('contain', user.firstName);
    cy.get('.ReactTable').should('contain', user.lastName);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', user.age);
    cy.get('.ReactTable').should('contain', user.salary);
    cy.get('.ReactTable').should('contain', user.department);

    cy.get('#delete-record-4').click();

    cy.get('.ReactTable').should('not.contain', user.firstName);
    cy.get('.ReactTable').should('not.contain', user.lastName);
    cy.get('.ReactTable').should('not.contain', user.email);
    cy.get('.ReactTable').should('not.contain', user.age);
    cy.get('.ReactTable').should('not.contain', user.salary);
    cy.get('.ReactTable').should('not.contain', user.department);
  });

  it('all worker should can be deleted', () => {
    for (let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`).click();
    };

    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('worker should can be founded and deleted', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('[placeholder^="First Name"]').type(user.firstName);
    cy.get('[placeholder^="Last Name"]').type(user.lastName);
    cy.get('[placeholder^="name@example.com"]').type(user.email);
    cy.get('[placeholder^="Age"]').type(user.age);
    cy.get('[placeholder^="Salary"]').type(user.salary);
    cy.get('[placeholder^="Department"]').type(user.department);

    cy.get('#submit').click();

    cy.get('[placeholder^="Type to search"]').type(user.firstName);

    cy.get('.ReactTable').should('contain', user.firstName);
    cy.get('.ReactTable').should('contain', user.lastName);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', user.age);
    cy.get('.ReactTable').should('contain', user.salary);
    cy.get('.ReactTable').should('contain', user.department);

    cy.get('.mr-2').click();

    cy.get('[placeholder^="First Name"]').type(editText);
    cy.get('[placeholder^="Last Name"]').type(editText);
    cy.get('[placeholder^="Age"]').type(`{backspace}{backspace}${editValue}`);
    cy.get('[placeholder^="Salary"]').type(editValue);
    cy.get('[placeholder^="Department"]').type(editText);

    cy.get('#submit').click();

    cy.get('.ReactTable').should('contain', `${user.firstName}${editText}`);
    cy.get('.ReactTable').should('contain', `${user.lastName}${editText}`);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', editValue);
    cy.get('.ReactTable').should('contain', `${user.salary}${editValue}`);
    cy.get('.ReactTable').should('contain', `${user.department}${editText}`);
  });

  it('all worker date should can used to founded a worker in table', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('[placeholder^="First Name"]').type(user.firstName);
    cy.get('[placeholder^="Last Name"]').type(user.lastName);
    cy.get('[placeholder^="name@example.com"]').type(user.email);
    cy.get('[placeholder^="Age"]').type(user.age);
    cy.get('[placeholder^="Salary"]').type(user.salary);
    cy.get('[placeholder^="Department"]').type(user.department);

    cy.get('#submit').click();

    cy.get('[placeholder^="Type to search"]').type(user.firstName);
    cy.get('.ReactTable').should('contain', user.firstName);
    cy.get('.ReactTable').should('contain', user.lastName);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', user.age);
    cy.get('.ReactTable').should('contain', user.salary);
    cy.get('.ReactTable').should('contain', user.department);

    cy.get('[placeholder^="Type to search"]').clear();
    cy.get('[placeholder^="Type to search"]').type(user.lastName);
    cy.get('.ReactTable').should('contain', user.firstName);
    cy.get('.ReactTable').should('contain', user.lastName);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', user.age);
    cy.get('.ReactTable').should('contain', user.salary);
    cy.get('.ReactTable').should('contain', user.department);

    cy.get('[placeholder^="Type to search"]').clear();
    cy.get('[placeholder^="Type to search"]').type(user.email);
    cy.get('.ReactTable').should('contain', user.firstName);
    cy.get('.ReactTable').should('contain', user.lastName);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', user.age);
    cy.get('.ReactTable').should('contain', user.salary);
    cy.get('.ReactTable').should('contain', user.department);

    cy.get('[placeholder^="Type to search"]').clear();
    cy.get('[placeholder^="Type to search"]').type(user.age);
    cy.get('.ReactTable').should('contain', user.firstName);
    cy.get('.ReactTable').should('contain', user.lastName);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', user.age);
    cy.get('.ReactTable').should('contain', user.salary);
    cy.get('.ReactTable').should('contain', user.department);

    cy.get('[placeholder^="Type to search"]').clear();
    cy.get('[placeholder^="Type to search"]').type(user.salary);
    cy.get('.ReactTable').should('contain', user.firstName);
    cy.get('.ReactTable').should('contain', user.lastName);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', user.age);
    cy.get('.ReactTable').should('contain', user.salary);
    cy.get('.ReactTable').should('contain', user.department);

    cy.get('[placeholder^="Type to search"]').clear();
    cy.get('[placeholder^="Type to search"]').type(user.department);
    cy.get('.ReactTable').should('contain', user.firstName);
    cy.get('.ReactTable').should('contain', user.lastName);
    cy.get('.ReactTable').should('contain', user.email);
    cy.get('.ReactTable').should('contain', user.age);
    cy.get('.ReactTable').should('contain', user.salary);
    cy.get('.ReactTable').should('contain', user.department);
  });
});
