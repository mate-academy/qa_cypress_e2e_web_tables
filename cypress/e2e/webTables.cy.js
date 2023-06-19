const defaultWorkersNum = 3;

function deleteRecord (recordNumber) {
  cy.get('#delete-record-' + recordNumber)
  .click();
}

const columnValues = ['Cierra', 'Cantrell', 29, 'alden@example.com', 2000, 'Legal'];

describe('Web Tables page', () => {
  it('Check pagination', () => {

    cy.visit('');

    cy.get('select')
    .select('5 rows');
    
    cy.get('[type = "number"]')
    .should('have.value', 1);

    for (let i = 0; i < 3; i++) {
      cy.get('#addNewRecordButton')
      .click();
      cy.fillInRegistrationForm();
    };

    cy.contains('Next')
    .click();

    cy.get('[type = "number"]')
    .should('have.value', 2);
  });

  it('Check changing displayed rows', () => {

    cy.visit('');
    
    cy.get('select')
    .select('5 rows');

    cy.get('select')
    .should('contain', '5 rows');

    cy.get('.rt-tr-group').should(($lis) => {
      expect($lis).to.have.length(5)
    });
  });

  it('Check adding new worker', () => {

    cy.visit('');

    cy.get('[class = "rt-tr -odd"], [class = "rt-tr -even"]').should(($lis) => {
      expect($lis).to.have.length(defaultWorkersNum)
    });

    cy.get('#addNewRecordButton')
    .click();

    cy.fillInRegistrationForm();

    cy.get('[class = "rt-tr -odd"], [class = "rt-tr -even"]').should(($lis) => {
      expect($lis).to.have.length(defaultWorkersNum + 1)
    });
  });

  it('Editing certain worker info', () => {

    cy.visit('');
    
    cy.get('#searchBox')
    .type('Cierra');

    cy.get('#edit-record-1')
    .click(); 
    
    cy.get('#firstName')
    .clear()
    .type('Alex');

    cy.get('#submit')
    .click();

    cy.get('#searchBox')
    .clear();

    cy.get('.rt-tbody')
    .should('contain', 'Alex');

    cy.get('.rt-tbody')
    .should('not.contain', 'Cierra');
  });

  it('Check deleting a worker', () => {

    cy.visit('');

    cy.get('[class = "rt-tr -odd"], [class = "rt-tr -even"]').should(($lis) => {
        expect($lis).to.have.length(defaultWorkersNum)
    });

    deleteRecord(1);

    cy.get('[class = "rt-tr -odd"], [class = "rt-tr -even"]').should(($lis) => {
      expect($lis).to.have.length(defaultWorkersNum - 1)
    });
  });

  it('Check deleting all workers', () => {

    cy.visit('');

    for(let i = 1; i < defaultWorkersNum + 1; i++) {
      deleteRecord(i);
    }

    cy.get('[class = "rt-tr -odd"], [class = "rt-tr -even"]').should(($lis) => {
      expect($lis).to.have.length(0)
    });

    cy.get('.ReactTable')
    .should('contain', 'No rows found');
  });

  it('Search by value', () => {

    cy.visit('');

    for (let i = 0; i < columnValues.length; i++) {
      cy.get('#searchBox')
      .clear()
      .type(columnValues[i]);

      cy.get('.rt-tbody')
      .should('contain', columnValues[i]);
    };
  });
});
