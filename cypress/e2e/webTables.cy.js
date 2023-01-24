/// <reference types='cypress' />

const test1 = require("../support/Web_Po.js");
const worker = new test1.worker();
const rowsCountSelection = new test1.rowsCountSelection();
const pagination = new test1.pagination()


describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');   
    Cypress.on('uncaught:exception', (err, runnable) =>{
      return false;
    })   
  });


  it('Pagination', () => { 
    cy.selectRowParPage('5');
   
    for (let i = 0; i < 5; i++) {
      cy.clickAddWorker();
      worker.fillRegistrationForm();
      cy.submitWorker();  
    };

    pagination.clickNextButton();
    pagination.checkNextButton('disabled');
    pagination.checkPreviousButton('enabled');
    cy.checkNumberOfPage('2');
    pagination.clickPreviousButton();
    pagination.checkNextButton('enabled');
    pagination.checkPreviousButton('disabled');
    cy.checkNumberOfPage('1');
  });

  it('Rows count selection', () => { 
       rowsCountSelection.rowsCount();
  });

  it('Add new worker', () => { 
      cy.clickAddWorker();
      worker.fillRegistrationForm();
      cy.submitWorker();  
      cy.fixture('example').then((data) => { 
      worker.checkWorker('4','4', data.email); 
      });   
  });

  it('Delete a new worker', () => {
      cy.clickAddWorker();
      worker.fillRegistrationForm(); 
      cy.submitWorker(); 
      cy.deleteNewWorker('4');
      worker.checkWorker('4','4','');   
  });

  it('Delete all workers', () => { //I don't like how i have done it...

    for (let i = 1; i <=3; i++) {
      cy.deleteNewWorker(i);
    };
    worker.checkWorker('1', '4','');
    
  });  

  it('Find worker in search field and edit it.', () => {
    cy.clickAddWorker();
    worker.fillRegistrationForm(); 
    cy.submitWorker(); 

    cy.fixture('example').then((data) => {
      cy.getSearchBox().type(data.email);
      worker.checkWorker('1', '4', `Email${data.email}`);
    });
   
    cy.clickEdit();
    worker.editRegistrationForm();
    cy.submitWorker();

    cy.fixture('example').then((data) => {
      cy.getSearchBox().type(data.email1);
      worker.checkWorker('1', '4',`Email${data.email1}`);
    }); 
  });
  
  it('Validate data in worker row after creating worker', () => {
    cy.clickAddWorker();
    worker.fillRegistrationForm(); 
    cy.submitWorker(); 
    cy.fixture('example').then((data) => {     
      worker.checkWorker('4','1',data.firstName);
      worker.checkWorker('4','2',data.lastName);
      worker.checkWorker('4','3',data.age);
      worker.checkWorker('4','4',data.email);
      worker.checkWorker('4','5',data.salary);
      worker.checkWorker('4','6',data.department);
    });

    
  });

  it('Check search by all column values.', () => {
    cy.clickAddWorker();
    worker.fillRegistrationForm(); 
    cy.submitWorker(); 

    cy.fixture('example').then((data) => {
      cy.getSearchBox().type(data.firstName);
      worker.checkWorker('1', '1', `First Name${data.firstName}`);
      cy.getSearchBox().type(data.lastName);
      worker.checkWorker('1', '2', `Last Name${data.lastName}`);
      cy.getSearchBox().type(data.age);
      worker.checkWorker('1', '3', `Age${data.age}`);
      cy.getSearchBox().type(data.email);
      worker.checkWorker('1', '4', `Email${data.email}`);
      cy.getSearchBox().type(data.salary);
      worker.checkWorker('1', '5', `Salary${data.salary}`);
      cy.getSearchBox().type(data.department);
      worker.checkWorker('1', '6', `Department${data.department}`);
    });
  });
}); 
  



