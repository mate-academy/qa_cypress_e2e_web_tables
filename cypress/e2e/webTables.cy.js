/// <reference types='cypress' />

describe('Web Tables', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://demoqa.com/webtables');
  });

  it('should provide an ability to move to different pages', () => {
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('input[aria-label="jump to page"]').should('have.value', '1');

    cy.createNewWorker('Name', 'Surname', 'new@example.com', '30', '50000', 'IT');
    cy.createNewWorker('Name2', 'Surname2', 'new2@example.com', '35', '50000', 'IT');
    cy.createNewWorker('Name3', 'Surname3', 'new3@example.com', '40', '50000', 'IT');

    cy.get('.-next > button:nth-child(1)').should('contain', 'Next').click();
    cy.get('input[aria-label="jump to page"]').should('have.value', '2');
  });

  it('should provide an ability to select rows count', () => {
    cy.get('[aria-label="rows per page"]').select('25 rows');
    cy.get('.rt-tr-group').should('have.length', 25);
  });

  it('should provide an ability to add new worker', () => {
    cy.createNewWorker('Name', 'Surname', 'new@example.com', '30', '50000', 'IT');

    cy.get('.rt-td').should('contain', 'Name');
    cy.get('.rt-td').should('contain', 'Surname');
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1').should('exist');
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
  });

  it('should provide an ability to delete all workers', () => {
    /*cy.get('#delete-record-1').should('exist');
    cy.get('[id^="delete-record-"]').each(($btn) => {
      cy.wrap($btn).click();
    });*/
    /*function deleteEmployee() {
      // Найти и выбрать кнопку "Delete" для текущего сотрудника
      cy.get('[id^="delete-record-"]').first().click({ force: true });
  
      // Проверить, что все сотрудники еще не удалены
      cy.get('[id^="delete-record-"]').should('exist');
  
      // Рекурсивно вызвать функцию удаления, если есть еще сотрудники
      if (Cypress.$('[id^="delete-record-"]').length > 0) {
        cy.wait(1000);
        deleteEmployee();
      }
    }
    deleteEmployee();*/
    cy.get('#delete-record-1').should('exist');
    cy.get('#delete-record-3 > svg > path').click();
    cy.get('#delete-record-2 > svg > path').click();
    cy.get('#delete-record-1 > svg > path').click();
    cy.get('#delete-record-1').should('not.exist');
  });

  it('should provide an ability to find worker in search field and edit it', () => {
    cy.createNewWorker('Name', 'Surname', 'new@example.com', '30', '50000', 'IT');
    
    cy.get('[placeholder="Type to search"]').type('Name');
    cy.get('[id^="edit-record-"]').click();
    cy.get('#firstName').clear().type('New');
    cy.get('#submit').click();

    cy.get('[placeholder="Type to search"]').clear();
    cy.get('.rt-td').should('contain', 'New');
  });

  it('should provide an ability to search by all column values', () => {
    cy.createNewWorker('Name', 'Surname', 'new@example.com', '30', '50000', 'IT');

    cy.get('[placeholder="Type to search"]').clear().type('Name');
    cy.get('.rt-td').should('contain', 'Name');
    cy.get('[placeholder="Type to search"]').clear().type('Surname');
    cy.get('.rt-td').should('contain', 'Surname');
    cy.get('[placeholder="Type to search"]').clear().type('new@example.com');
    cy.get('.rt-td').should('contain', 'new@example.com');
    cy.get('[placeholder="Type to search"]').clear().type('30');
    cy.get('.rt-td').should('contain', '30');
    cy.get('[placeholder="Type to search"]').clear().type('50000');
    cy.get('.rt-td').should('contain', '50000');
    cy.get('[placeholder="Type to search"]').clear().type('IT');
    cy.get('.rt-td').should('contain', 'IT');
  });
});
