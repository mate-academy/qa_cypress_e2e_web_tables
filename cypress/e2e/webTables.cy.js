const { generateUser } = require('../support/generate');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('should have pagination', () => {
    cy.findByClassName('-pageInfo')
      .should('be.visible');

    cy.findByProperty('aria-label', 'jump to page')
      .should('have.value', '1');

    cy.findByContent('button', 'Previous')
      .should('be.visible');

    cy.findByContent('button', 'Next')
      .should('be.visible');
  });

  it('should have rows-count selector', () => {
    cy.findByProperty('aria-label', 'rows per page')
      .should('have.value', '10');

    cy.findByProperty('aria-label', 'rows per page')
      .select('25');

    cy.findByProperty('aria-label', 'rows per page')
      .should('have.value', '25');
  });

  it('should create new worker', () => {
    const worker = generateUser();

    cy.findByContent('button', 'Add')
    .should('be.visible');

    cy.findByContent('button', 'Add')
      .click();

    cy.addNewWorker(worker);

    cy.validateWorker(worker, true);

  });

  it('should remove the worker', () => {
    const worker = generateUser();

    cy.findByContent('button', 'Add')
    .should('be.visible');

    cy.findByContent('button', 'Add')
      .click();

    cy.addNewWorker(worker);

    let len;

    cy.findByProperty('title', 'Delete')
      .then((elements) => {
        len = elements.length;

        const rndIdx = Math.round(Math.random() * (len - 1));

        cy.findByProperty('title', 'Delete')
          .eq(rndIdx)
          .click({force: true});
      });

    cy.findByProperty('title', 'Delete')
      .should('have.length', 3);
  });

  it('should remove all workers', () => {
    let len;
  
    cy.findByProperty('title', 'Delete')
      .then((elements) => {
        len = elements.length;
        
        let i = 0;

        while (len > i) {
          cy.findByProperty('title', 'Delete')
          .eq(0)
          .click({force: true});

          i++;
        }
      });

    cy.findByContent('div', 'No rows found')
      .should('be.visible');
  });

  it.only('should find the worker', () => {
    const worker = generateUser();

    cy.findByContent('button', 'Add')
      .click();

    cy.addNewWorker(worker);

    cy.validateByValue(worker.firstName);
    cy.validateByValue(worker.lastName);
    cy.validateByValue(worker.email);
    cy.validateByValue(worker.age);
    cy.validateByValue(worker.salary);
    cy.validateByValue(worker.department);
  });

  it('should edit the worker', () => {
    let len;

    cy.findByProperty('title', 'Edit')
      .then((elements) => {
        len = elements.length;

        const rndIdx = Math.round(Math.random() * (len - 1));
        
        cy.findByProperty('title', 'Edit')
          .eq(rndIdx)
          .click({force: true});

        const updatedWorker = generateUser();

        cy.addNewWorker(updatedWorker);

        cy.findByProperty('title', 'Edit')
          .eq(rndIdx)
          .then(() => {
            cy.validateWorker(updatedWorker, false);
          })
      });
  });
});
