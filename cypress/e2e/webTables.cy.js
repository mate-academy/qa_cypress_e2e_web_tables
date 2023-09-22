/// <reference types='cypress' />

describe('Web Tables page', () => {
  it('checks the pagination', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
    cy.get('select[aria-label="rows per page"]').select('5');
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type('user1');
    cy.get('[placeholder="Last Name"]').type('qwe1');
    cy.get('#userEmail').type('test1@test.com');
    cy.get('#age').type('20');
    cy.get('#salary').type('444');
    cy.get('#department').type('a1');
    cy.get('#submit').click();
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type('user2');
    cy.get('[placeholder="Last Name"]').type('qwe2');
    cy.get('#userEmail').type('test2@test.com');
    cy.get('#age').type('20');
    cy.get('#salary').type('444');
    cy.get('#department').type('a2');
    cy.get('#submit').click();
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type('user3');
    cy.get('[placeholder="Last Name"]').type('qwe3');
    cy.get('#userEmail').type('test3@test.com');
    cy.get('#age').type('20');
    cy.get('#salary').type('444');
    cy.get('#department').type('a3');
    cy.get('#submit').click();
    cy.get('.-pageJump > input').type('2{enter}');
    cy.get('.rt-table').should('contain', 'user3');
  });

  it('checks the rows count selection', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
    cy.get('select[aria-label="rows per page"]').select('5');
    cy.get('select[aria-label="rows per page"]').select('10');
  });

  it('allow to add new worker', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type('user4');
    cy.get('[placeholder="Last Name"]').type('qwe4');
    cy.get('#userEmail').type('test4@test.com');
    cy.get('#age').type('20');
    cy.get('#salary').type('444');
    cy.get('#department').type('a4');
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'user4');
  });

  it('allow to delete worker', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
    cy.get('#delete-record-3 > svg > path').click();
  });

  it('allow to delete all workers', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
    cy.get('#delete-record-3 > svg > path').click();
    cy.get('#delete-record-2 > svg > path').click();
    cy.get('#delete-record-1 > svg > path').click();
  });

  it('allow to find worker in search field and edit it', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
    cy.get('#searchBox').type('Alden');
    cy.get('#edit-record-2 > svg > path').click();
    cy.get('#firstName').type('a');
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'Aldena');
  });

  it('allow to validate data in worker row after creating worker', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type('user1');
    cy.get('[placeholder="Last Name"]').type('qwe1');
    cy.get('#userEmail').type('test1@test.com');
    cy.get('#age').type('20');
    cy.get('#salary').type('444');
    cy.get('#department').type('a1');
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'user1');
    cy.get('.rt-td').should('contain', 'qwe1');
    cy.get('.rt-td').should('contain', 'test1@test.com');
    cy.get('.rt-td').should('contain', '20');
    cy.get('.rt-td').should('contain', '444');
    cy.get('.rt-td').should('contain', 'a1');
  });

  it('allow to check search by all column values', () => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-td').should('contain', 'Cierra');
    cy.get('#searchBox').clear().type('Vega');
    cy.get('.rt-td').should('contain', 'Vega');
    cy.get('#searchBox').clear().type('39');
    cy.get('.rt-td').should('contain', '39');
    cy.get('#searchBox').clear().type('cierra@example.com');
    cy.get('.rt-td').should('contain', 'cierra@example.com');
    cy.get('#searchBox').clear().type('10000');
    cy.get('.rt-td').should('contain', '10000');
    cy.get('#searchBox').clear().type('Insurance');
    cy.get('.rt-td').should('contain', 'Insurance');
  });
});
