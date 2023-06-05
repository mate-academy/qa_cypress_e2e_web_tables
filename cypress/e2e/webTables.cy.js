describe('Web Tables page', () => {
  const user = {
    firstName: 'Test',
    lastName: 'User',
    Email: 'testUser@qa.team',
    age: '21',
    salary: '100000',
    department: 'QA'
  }

    beforeEach(() => {
      cy.visit('https://demoqa.com/webtables')
    });

    it('should have pagination', () => {
      cy.get('.-pagination').should('contain', 'Previous').and('contain', 'Next');
      cy.contains('.-pageInfo', 'Page').should('exist');
    });
  
    it('should have row count selection', () => {
      cy.get('select').select('5 rows');
    });
  
    it('should add a new worker and check it value using Search', () => {
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(user.firstName);
      cy.get('#lastName').type(user.lastName);
      cy.get('#userEmail').type(user.Email);
      cy.get('#age').type(user.age);
      cy.get('#salary').type(user.salary);
      cy.get('#department').type(user.department);  
      cy.get('#submit').click();
      cy.get('.rt-tbody').should('contain', user.firstName).and('contain', user.lastName).and('contain', user.Email);
      cy.get('#searchBox').type(user.firstName);
      cy.get('.rt-tbody').should('contain', user.firstName);
      cy.get('#searchBox').clear().type(user.lastName);
      cy.get('.rt-tbody').should('contain', user.lastName);
      cy.get('#searchBox').clear().type(user.age);
      cy.get('.rt-tbody').should('contain', user.age);
      cy.get('#searchBox').clear().type(user.Email);
      cy.get('.rt-tbody').should('contain', user.Email);
      cy.get('#searchBox').clear().type(user.salary);
      cy.get('.rt-tbody').should('contain', user.salary);
      cy.get('#searchBox').clear().type(user.department);
      cy.get('.rt-tbody').should('contain', user.department);
    });
  
    // it('should delete a worker', () => {
    //   cy.get('#delete-record-1').click();
    // });
  
    it('should delete worker', () => {
      cy.get(`#delete-record-1`).click();
      cy.get('.rt-tbody').should('not.contain.html', `#delete-record-1`);
    });
  
    it('should find a worker and edit it', () => {
      cy.get('#searchBox').type('Cierra');
      cy.get('[title="Edit"]').click();
      cy.get('#firstName').type('_test_new');
      cy.get('#submit').click();
    });
  })