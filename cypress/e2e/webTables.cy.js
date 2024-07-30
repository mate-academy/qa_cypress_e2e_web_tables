/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should allow to use pagination', () => {
    let workers;
    cy.selectRows('5');
    cy.task('generateWorkers').then((generateWorkers) => {
      workers = generateWorkers;
    }).then(() => {
      workers.forEach((worker) => {
        cy.fillInForm(worker);
      });
    });

    cy.getBySelector('.-next');
    cy.get('[aria-label="jump to page"]').should('contain.value', '2');
    cy.checkTextByClass('-totalPages', '2');
  });

  it('should allow to change the number of rows', () => {
    cy.selectRows('25');
    cy.get('.rt-tbody').find('.rt-tr-group').should('have.length', 25);
  });

  it('should allow to add a new worker', () => {
    let worker;
    cy.task('generateWorkers').then((generateWorkers) => {
      worker = generateWorkers[0];
    }).then(() => {
      cy.fillInForm(worker);
    }).then(() => {
      cy.checkTextByClass('rt-tr-group', worker.firstName);
      cy.checkTextByClass('rt-tr-group', worker.lastName);
    });
  });

  it('should allow to delete worker', () => {
    cy.getBySelector('#delete-record-3');
    cy.get('.rt-tbody').find('.action-buttons').should('have.length', 2);
  });

  it('should allow to delete all workers', () => {
    let tableRowsLength;
    cy.get('.rt-tbody').find('.action-buttons').then((elements) => {
      tableRowsLength = elements.length;
    }).then(() => {
      for (let i = 1; i <= tableRowsLength; i++) {
        cy.getBySelector(`#delete-record-${i}`);
      };

      cy.get('.rt-tbody').find('.action-buttons').should('have.length', 0);
    });
  });

  it('should allow to find a worker in the search field and edit it', () => {
    const workerName = 'Cierra';
    const newWorkerName = 'Alina';

    cy.searchByValue(workerName);
    cy.getBySelector('[title="Edit"]');
    cy.get('#firstName').clear();
    cy.get('#firstName').type(newWorkerName);
    cy.getBySelector('#submit');

    // Validate data in the worker row after editing the worker
    cy.checkTextByClass('rt-td', newWorkerName);
  });

  it('should allow to search by all column values', () => {
    const firstRowData = [];
    cy.get('.rt-tr-group')
      .first()
      .find('.rt-td:not(:last)')
      .each(($column) => {
        firstRowData.push($column.text());
      });
    firstRowData.forEach((value) => {
      cy.searchByValue(value);
      cy.get('#searchBox').clear();
    });
  });
});
