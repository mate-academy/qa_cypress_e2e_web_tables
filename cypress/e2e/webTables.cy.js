/// <reference types='cypress' />
const { generateWorker, generateWorkers } =
  require('../support/generateWorker');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow to use pagination', () => {
    const workers = generateWorkers(3);
    cy.addNewWorkers(workers);

    cy.selectRows('5');
    cy.contains('.-totalPages', '2').should('be.visible');
    cy.checkNumberOfPage('1');
    cy.contains('button', 'Next').click();
    cy.checkNumberOfPage('2');
    cy.contains('button', 'Previous').click();
    cy.checkNumberOfPage('1');

    cy.get('[aria-label="jump to page"]').type('2' + `{enter}`);
    cy.checkNumberOfPage('2');
  });

  it('should allow to select rows count', () => {
    cy.selectRows('5');
    cy.checkRows(5);

    cy.selectRows('10');
    cy.checkRows(10);

    cy.selectRows('20');
    cy.checkRows(20);

    cy.selectRows('25');
    cy.checkRows(25);

    cy.selectRows('50');
    cy.checkRows(50);

    cy.selectRows('100');
    cy.checkRows(100);
  });

  it('should allow to add a new worker and delete a worker', () => {
    const worker = generateWorker();
    cy.addNewWorker(worker);
    cy.get('.rt-td').should('contain', worker.workerEmail);
    cy.get('#delete-record-4').click();
    cy.get('.rt-td').should('not.contain', worker.workerEmail);
  });

  it('should allow to delete all workers', () => {
    cy.deleteAllWorkers(3);
    cy.get('.rt-noData').should('exist');
  });

  it('should allow to find a worker in the search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type('Lora');
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'Lora');
  });

  it('should allow to search by all column values', () => {
    cy.findByPlaceholder('Type to search').type('Kierra');
    cy.get('.rt-td').should('contain', 'Kierra');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('Gentry');
    cy.get('.rt-td').should('contain', 'Gentry');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('29');
    cy.get('.rt-td').should('contain', '29');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('kierra@example.com');
    cy.get('.rt-td').should('contain', 'kierra@example.com');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('2000');
    cy.get('.rt-td').should('contain', '2000');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('Legal');
    cy.get('.rt-td').should('contain', 'Legal');
  });
});
