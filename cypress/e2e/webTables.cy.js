/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should test pagination', () => {
    cy.get('.left-pannel').click();
  });

  it('should test rows count selection', () => {
    cy.get('.col-md-6').should('be.visible').click();
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    const firstName = 'Kierra';
    const lastName = 'Gentry';
    const userEmail = 'kierra@example.com';
    const age = '29';
    const salary = '2000';
    const department = 'Legal';
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(userEmail);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
  });

  it('should find and edit a worker', () => {
    cy.contains('Kierra')
      .parent()
      .find('#edit-record-3 > svg > path')
      .click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('Kirra');
    cy.get('#submit').click();
  });
  it('should validate data in worker row after creating worker', () => {
    const expectedData = {
      firstName: 'Kierra',
      lastName: 'Gentry',
      userEmail: 'kierra@example.com',
      age: '29',
      salary: '2000',
      department: 'Legal'
    };

    cy.contains(expectedData.firstName).should('be.visible');
    cy.contains(expectedData.firstName)
      .parent()
      .within(() => {
        cy.contains(expectedData.firstName).should('be.visible');
        cy.contains(expectedData.lastName).should('be.visible');
        cy.contains(expectedData.userEmail).should('be.visible');
        cy.contains(expectedData.age).should('be.visible');
        cy.contains(expectedData.salary).should('be.visible');
        cy.contains(expectedData.department).should('be.visible');
      });
  });

  it('should check search by all column values', () => {
    const searchQuery = 'Gentry';
    cy.get('#searchBox').type(searchQuery);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .each(($cell) => {
        cy.wrap($cell).should('contain.text', searchQuery);
      });
  });

  it('should delete a worker', () => {
    cy.contains(':nth-child(3) > .rt-tr > :nth-child(2)', 'Gentry')
      .parent()
      .find('#delete-record-3 > svg > path')
      .click();
  });

  it('should delete all workers', () => {
    const lastNameDeleteButtonMapping = {
      Vega: 1,
      Cantrell: 2,
      Gentry: 3
    };

    for (const lastName of Object.keys(lastNameDeleteButtonMapping)) {
      const deleteButtonId =
        `#delete-record-${lastNameDeleteButtonMapping[lastName]} > svg > path`;
      cy.get(deleteButtonId).click();
    }
  });
});
