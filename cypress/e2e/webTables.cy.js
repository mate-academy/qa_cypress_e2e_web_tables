/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should have the ability to navigate pages', () => {
    cy.addWorker(100);
    //const pageSizeOption = ['5 rows', '10 rows', '20 rows', '25 rows', '50 rows', '100 rows'];
    cy.get('select[aria-label="rows per page"] option').each(($option) => {
      const optionText = $option.text();
      cy.get('select[aria-label="rows per page"]').select(optionText);
      cy.get('.-next button').should('exist').should('not.be.disabled');
      cy.get('.-next button').click();
      cy.get('.-pageJump input[type="number"]').should('have.value', '2');
      cy.get('.-previous').click();
      cy.get('.-pageJump input[type="number"]').should('have.value', '1');
    });
  });

  it('should have the ability to selection count of rows', () => {
    cy.get('select[aria-label="rows per page"] option').each(($option) => {
      const optionText = $option.text();
      const optionValue = $option.val();
      cy.get('select[aria-label="rows per page"]').select(optionText);
      cy.get('select[aria-label="rows per page"]').should(
        'have.value',
        optionValue
      );
    });
  });

  it('should have the ability to add a new worker', () => {
    cy.generateWorker().then((worker) => {
      cy.findById('addNewRecordButton').click();
      cy.findById('firstName').type(worker.firstName);
      cy.findById('lastName').type(worker.lastName);
      cy.findById('userEmail').type(worker.email);
      cy.findById('age').type(worker.age);
      cy.findById('salary').type(worker.salary);
      cy.findById('department').type(worker.department);
      cy.findById('submit').click();
      cy.get('.rt-tr:not(.rt-tr.-padRow.-odd, .rt-tr.-padRow.-even)')
        .last()
        .find('.rt-td')
        .then(($td) => {
          cy.wrap($td.eq(0)).should('have.text', worker.firstName);
          cy.wrap($td.eq(1)).should('have.text', worker.lastName);
          cy.wrap($td.eq(2)).should('have.text', worker.age);
          cy.wrap($td.eq(3)).should('have.text', worker.email);
          cy.wrap($td.eq(4)).should('have.text', worker.salary);
          cy.wrap($td.eq(5)).should('have.text', worker.department);
        });
    });
  });

  it('should have the ability to delete a worker', () => {
    cy.addWorker(1);
    cy.get('.rt-tr:not(.rt-tr.-padRow.-odd, .rt-tr.-padRow.-even)')
      .its('length')
      .then((countOfRows) => {
        cy.get('[title="Delete"]').last().click();
        cy.get('.rt-tr:not(.rt-tr.-padRow.-odd, .rt-tr.-padRow.-even)')
          .its('length')
          .should('eq', countOfRows - 1);
      });
  });

  it('should have the ability to delete all workers', () => {
    cy.get(
      '[title="Delete"]:not(.rt-tr.-padRow.-odd, .rt-tr.-padRow.-even)'
    ).then(($buttons) => {
      const countOfRows = $buttons.length;

      function deleteRow() {
        cy.get(
          '[title="Delete"]:not(.rt-tr.-padRow.-odd, .rt-tr.-padRow.-even)'
        )
          .first()
          .click();
      }
      for (let i = 0; i < countOfRows; i++) {
        deleteRow();
      }
      cy.contains('No rows found').should('exist');
    });
  });

  it('should have the ability to find a worker in the search field and edit it', () => {
    const editedFirstName = 'editTest';
    cy.generateWorker().then((worker) => {
      cy.findById('addNewRecordButton').click();
      cy.findById('firstName').type(worker.firstName);
      cy.findById('lastName').type(worker.lastName);
      cy.findById('userEmail').type(worker.email);
      cy.findById('age').type(worker.age);
      cy.findById('salary').type(worker.salary);
      cy.findById('department').type(worker.department);
      cy.findById('submit').click();
      cy.findById('searchBox').type(worker.firstName);
      cy.get('.mr-2').click();
      cy.findById('firstName').clear().type(`${editedFirstName}`);
      cy.findById('submit').click();
      cy.findById('searchBox').clear().type(editedFirstName);
      cy.contains('.rt-td', editedFirstName).should('exist');
    });
  });

  it('should have the ability to find a worker in the search field by Last Name', () => {
    cy.generateWorker().then((worker) => {
      cy.findById('addNewRecordButton').click();
      cy.findById('firstName').type(worker.firstName);
      cy.findById('lastName').type(worker.lastName);
      cy.findById('userEmail').type(worker.email);
      cy.findById('age').type(worker.age);
      cy.findById('salary').type(worker.salary);
      cy.findById('department').type(worker.department);
      cy.findById('submit').click();
      // by Last Name
      cy.findById('searchBox').type(worker.lastName);
      cy.contains('.rt-td', worker.lastName).should('exist');
      // by email
      cy.findById('searchBox').clear().type(worker.email);
      cy.contains('.rt-td', worker.email).should('exist');
      // by age
      cy.findById('searchBox').clear().type(worker.age);
      cy.contains('.rt-td', worker.age).should('exist');
      // by salary
      cy.findById('searchBox').clear().type(worker.salary);
      cy.contains('.rt-td', worker.salary).should('exist');
      // by department
      cy.findById('searchBox').clear().type(worker.department);
      cy.contains('.rt-td', worker.department).should('exist');
    });
  });
});
