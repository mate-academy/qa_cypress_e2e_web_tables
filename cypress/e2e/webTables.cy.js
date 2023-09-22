describe('Web Tables Page', () => {
  const worker = {
    firstName: 'Mykhailo',
    lastName: 'Rozmaznin',
    email: 'rozmaznin@gmail.com',
    age: '19',
    salary: '30000',
    department: 'QA',
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should have the pagination', () => {
    
    cy.contains('Page').should('exist');
    cy.get('select').should('exist');
    cy.get('.-next > .-btn').should('exist');
    cy.get('.-previous > .-btn').should('exist');
    cy.get('.-totalPages').should('exist');
    cy.get('.-pageJump > input').should('exist');
    cy.get('.-pageInfo').should('exist');
  });
  

  it('should contain rows', () => {
    const rowCount = 10 + 1;                          // + 1 for info row, cypress counts it as one more row
    cy.get('.rt-tr').should('have.length', rowCount);
  });
 
  it('should provide to add a new worker', () => { 
    cy.contains('Add').click();                       //I'll turn (new user) hardcode into a function in the near future, there was not enough time(((
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
    cy.contains(worker.firstName).should('exist');
    cy.contains(worker.email).should('exist');
    cy.contains(worker.age).should('exist');
    cy.contains(worker.salary).should('exist');
    cy.contains(worker.department).should('exist');
    cy.wait(2000);
  });
  
  it('should provide an ability to delete workers', () => {
    cy.get('#delete-record-3 > svg').click();
    cy.get('.rt-td').should('not.contain', 'Kierra');
  
  });
  


  it('should provide an ability to delete all workers', () => {   
    cy.get('#delete-record-1').click();                    // I tried to do it as a loop, but it hasn't worked out yet. I will try to do it in the near future
    cy.get('.rt-td').not('contain', '#delete-record-1');
    cy.get('#delete-record-2').click();
    cy.get('.rt-td').not('contain', '#delete-record-2');
    cy.get('#delete-record-3').click();
    cy.get('.rt-td').not('contain', '#delete-record-3');
  });
    


  it('should provide an ability to edit workers', () => {
    cy.contains('Add').click();
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
    
    const newAge = '35';
    cy.get('#searchBox').type(worker.firstName);
    cy.wait(2000);
    cy.get('#edit-record-4 > svg > path').click(); 
    cy.get('#age').clear().type(newAge);
    cy.get('#submit').click();
    cy.contains(newAge).should('exist');
  });

  it('should search by user data', () => {
    cy.contains('Add').click();
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
   
    cy.contains(worker.firstName).should('exist');
    cy.contains(worker.lastName).should('exist');
    cy.contains(worker.email).should('exist');
    cy.contains(worker.age).should('exist');
    cy.contains(worker.salary).should('exist');
    cy.contains(worker.department).should('exist');
  });
});
