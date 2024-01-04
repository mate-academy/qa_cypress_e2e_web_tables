/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.visit('/');
    });
    });


    it('Should provide the user to using pagination', () => {
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.get('.-next > .-btn').click();
      cy.get('input[aria-label="jump to page"]').should('have.value', '2');   
    });

    it('Should provide the user to adding a new worker', () => {
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(user.firstName);
      cy.get('#lastName').type(user.lastName);
      cy.get('#userEmail').type(user.email);
      cy.get('#age').type(user.age);
      cy.get('#salary').type(user.salary);
      cy.get('#department').type(user.department);
      cy.get('#submit').click();
      cy.contains(':nth-child(4) > .rt-tr > :nth-child(1)', user.firstName);
      cy.contains(':nth-child(4) > .rt-tr > :nth-child(2)', user.lastName);
    });

    it('Should provide the user to choosing the rows count selection', () => {
      cy.get('select[aria-label="rows per page"]').select(0);
      cy.get('.rt-tr-group').should('have.length', 5);
    });

    it('Should provide the user to delete a worker', () => {
      cy.task('generateUser').then(generateUser => {
        cy.addingNewUser(generateUser);
      }); 
      cy.get('#delete-record-4').click();
      cy.get('span[id^="delete-record-4"]').should('not.exist');
    });

    it('Should provide the user to delete all workers', () => {
      cy.get('#delete-record-3').click();
      cy.get('#delete-record-2').click();
      cy.get('#delete-record-1').click();
      cy.get('span[id^="delete-record-1"]').should('not.exist');
    });

    it('Should provide the user to find a worker in the search field and edit it', () => {
      cy.get('#searchBox').type('K');
      cy.get('#edit-record-3').click();
      cy.get('#firstName').type('K');
      cy.get('#submit').click();
    });

    it('Should provide to validatation data in the worker row after editing the worker', () => {
      cy.get('#searchBox').type('K');
      cy.get('#edit-record-3').click();
      cy.get('#firstName').type('K');
      cy.get('#submit').click();
      cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)').should('contain', 'KierraK');
    });

    it('Should provide to searching by all column values', () => {
      cy.get('#searchBox').type('K');
      cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)').should('contain', 'Kierra');
      cy.get('#searchBox').type('{backspace}Gen');
      cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)').should('contain', 'Gentry');
      cy.get('#searchBox').type('{selectall}{backspace}29');
      cy.get('.rt-tbody > :nth-child(1) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]').should('contain', '29');
      cy.get('#searchBox').type('{selectall}{backspace}kierra@');
      cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)').should('contain', 'kierra@example.com');
      cy.get('#searchBox').type('{selectall}{backspace}2000');
      cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(5)').should('contain', '2000');
      cy.get('#searchBox').type('{selectall}{backspace}Leg');
      cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(6)').should('contain', 'Legal');
    });
  });