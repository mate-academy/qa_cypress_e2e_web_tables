import faker from 'faker'

describe('Web Tables Test Suite', () => {
  const generateWorker = () => {
      return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      age: faker.random.number({ min: 20, max: 60 }),
    };
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should test pagination', () => {

    cy.get('select[aria-label="rows per page"]').select('5');

    const workers = [];
    for (let i = 0; i < 3; i++) {
      const worker = generateWorker();
      workers.push(worker);
  
      cy.get('#addNewRecordButton').click();
  
      cy.get('#firstName').type(worker.firstName);
      cy.get('#lastName').type(worker.lastName);
      cy.get('#userEmail').type(worker.email);
      cy.get('#age').type(worker.age);
      cy.get('#salary').type('12000');
      cy.get('#department').type('Sales');
  
      cy.get('#submit').click();
      cy.wait(2000);
    }
  
      cy.get('.-btn').contains('Next').click();  
      cy.wait(2000);

      const lastWorker = workers[workers.length - 1];
      cy.get('.rt-tbody .rt-td').should('contain', lastWorker.firstName);
      cy.get('.rt-tbody .rt-td').should('contain', lastWorker.lastName);
      cy.get('.rt-tbody .rt-td').should('contain', lastWorker.email);
      cy.get('.rt-tbody .rt-td').should('contain', lastWorker.age.toString());
    
      cy.get('.-btn').contains('Previous').click();  
            
      cy.get('.rt-tbody .rt-tr-group .rt-td').should('not.contain', lastWorker.firstName);
  });

  it('should test rows count selection', () => {
    
    cy.get('select[aria-label="rows per page"]').select('5');
    cy.get('.rt-tbody .rt-tr').should('have.length', 5);

    cy.get('select[aria-label="rows per page"]').select('10');
    cy.get('.rt-tbody .rt-tr').should('have.length', 10);

    cy.get('select[aria-label="rows per page"]').select('20', { force: true });
    cy.get('.rt-tbody .rt-tr').should('have.length', 20);

    cy.get('select[aria-label="rows per page"]').select('25', { force: true });
    cy.get('.rt-tbody .rt-tr').should('have.length', 25);

    cy.get('select[aria-label="rows per page"]').select('50', { force: true });
    cy.get('.rt-tbody .rt-tr').should('have.length', 50);

    cy.get('select[aria-label="rows per page"]').select('100', { force: true });
    cy.get('.rt-tbody .rt-tr').should('have.length', 100);
  });


  it('should add a new worker', () => {
    
    const worker = generateWorker();
  
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type('12550');
    cy.get('#department').type('Sales');

    cy.get('#submit').click();

    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age.toString());
    cy.get('#salary').should('have.value', '12550');
    cy.get('#department').should('have.value', 'Sales');
  });

  it('should delete a worker', () => {  
    
    cy.get('#addNewRecordButton').click();

  
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userEmail').type('johndoe@mail.com');
    cy.get('#age').type('30');
    cy.get('#salary').type('5550');
    cy.get('#department').type('IT');

    cy.get('#submit').click();

    cy.get('.rt-tbody .rt-td').should('contain', 'John');
    cy.get('.rt-tbody .rt-td').should('contain', 'Doe');
    cy.get('.rt-tbody .rt-td').should('contain', 'johndoe@mail.com');
    cy.get('.rt-tbody .rt-td').should('contain', '30');
    cy.get('.rt-tbody .rt-td').should('contain', '5550');
    cy.get('.rt-tbody .rt-td').should('contain', 'IT');
      
    cy.wait(2000); 
    cy.get('span[data-toggle="tooltip"][title="Delete"]').last().click();
     
    cy.get('.rt-tbody .rt-td').should('not.contain', 'John');
    cy.get('.rt-tbody .rt-td').should('not.contain', 'Doe');
    cy.get('.rt-tbody .rt-td').should('not.contain', 'johndoe@mail.com');
    cy.get('.rt-tbody .rt-td').should('not.contain', '30');
    cy.get('.rt-tbody .rt-td').should('not.contain', '5550');
    cy.get('.rt-tbody .rt-td').should('not.contain', 'IT');
      
  });

  it('should delete all workers', () => {
    
    cy.get('.rt-tbody .rt-td').should('exist');

    const deleteButton = cy.get('span[data-toggle="tooltip"][title="Delete"]');

    deleteButton.then((buttons) => {
      for (let i = buttons.length - 1; i >= 0; i--) {
        cy.get('span[data-toggle="tooltip"][title="Delete"]').should('exist');
        cy.get('span[data-toggle="tooltip"][title="Delete"]').last().click();
      }
    });

    cy.contains('No rows found').should('be.visible');
  
  });

  it('should find and edit a worker', () => {
    
    const worker = generateWorker();

    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type('12000');
    cy.get('#department').type('Sales');

    cy.get('#submit').click();

    cy.wait(2000); 
    cy.get('input#searchBox').clear().type(worker.firstName);

    cy.get('.rt-tbody .rt-td').should('contain', worker.firstName);
    cy.get('.rt-tbody .rt-td').should('contain', worker.lastName);

    
    cy.get('span[data-toggle="tooltip"][title="Edit"]').last().click();

   
    cy.get('#firstName').clear().type(worker.firstName);
    cy.get('#lastName').clear().type(worker.lastName);
    cy.get('#userEmail').clear().type(worker.email);
    cy.get('#age').clear().type(worker.age);
    cy.get('#salary').clear().type('15000');
    cy.get('#department').clear().type('Marketing');

    cy.get('#submit').click();

    cy.get('.rt-tbody .rt-td').should('contain',worker.firstName);
    cy.get('.rt-tbody .rt-td').should('contain',worker.lastName);
    cy.get('.rt-tbody .rt-td').should('contain',worker.email);
    cy.get('.rt-tbody .rt-td').should('contain',worker.age.toString());
   
  });

  it('should validate data in worker row after creating worker', () => {
    
    const worker = generateWorker();

    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type('15000');
    cy.get('#department').type('Sales');

    cy.get('#submit').click();

 
    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age.toString());
    cy.get('#salary').should('have.value', '15000');
    cy.get('#department').should('have.value', 'Sales');
  });

  it('should check search by all column values', () => {
    
    const worker = generateWorker();

    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type('12000');
    cy.get('#department').type('Sales');

    cy.get('#submit').click();
    

    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age.toString());
    //cy.get('#salary').should('have.value', '12000');
    //cy.get('#department').should('have.value', 'Sales');

    cy.get('input#searchBox').clear().type(worker.firstName);
    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age.toString());
    cy.wait(500); 

    cy.get('input#searchBox').clear().type(worker.lastName);  
    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age.toString());

    cy.get('input#searchBox').clear().type(worker.email);  
    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age.toString());

    cy.get('input#searchBox').clear().type(worker.age);  
    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age.toString());
  });
});