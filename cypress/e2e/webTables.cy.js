/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;
  beforeEach(() => {
    cy.visit('/');

    cy.task('addNewWorker')
      .then((addNewWorker) => {
        worker = addNewWorker;
      }
      );
  });

  it('should allow to check pagination', () => {
    cy.contains('button', 'Previous')
      .should('be.visible');

    cy.contains('button', 'Next')
      .should('be.visible');

    cy.get('.-pagination')
      .find('button')
      .eq(0)
      .should('have.text', 'Previous');

    cy.get('.-pagination')
      .find('button')
      .eq(1)
      .should('have.text', 'Next');

    // cy.contains('Previous').as('previousButton');
    // const goToPreviousPage = () => {
    //   cy.get('@previousButton').invoke('attr', 'disabled').then(disabled => {
    //     if (disabled === 'disabled') {
    //       cy.get('@previousButton').should('have.attr', 'disabled')
    //     } else {
    //       cy.get('@previousButton').click().then(goToPreviousPage)
    //     }
    //   });
    //   goToPreviousPage();
    // };

    // cy.contains('Next').as('nextButton');
    // const goToNextPage = () => {
    //   cy.get('@nextButton').invoke('attr', 'disabled').then(disabled => {
    //     if (disabled === 'disabled') {
    //       cy.get('@nextButton').should('have.attr', 'disabled')
    //     } else {
    //       cy.get('@nextButton').click().then(goToNextPage)
    //     }
    //   });
    //   goToNextPage();
    // };
  });
  it('should check rows count selection', () => {
    const randomIndex = Math.floor(Math.random() * 5);
    const rowsNumbers = ['5', '10', '20', '25', '50', '100'];
    const rowsNumber = rowsNumbers[randomIndex];

    cy.get('select[aria-label="rows per page"]')
      .select(rowsNumber);

    cy.get('select[aria-label="rows per page"]')
      .find('option')
      .eq(0)
      .should('have.text', '5 rows');

    cy.get('select[aria-label="rows per page"]')
      .find('option')
      .eq(1)
      .should('have.text', '10 rows');

    cy.get('select[aria-label="rows per page"]')
      .find('option')
      .eq(2)
      .should('have.text', '20 rows');

    cy.get('select[aria-label="rows per page"]')
      .find('option')
      .eq(3)
      .should('have.text', '25 rows');

    cy.get('select[aria-label="rows per page"]')
      .find('option')
      .eq(4)
      .should('have.text', '50 rows');

    cy.get('select[aria-label="rows per page"]')
      .find('option')
      .eq(5)
      .should('have.text', '100 rows');
  });
  it('should allow to add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('#firstName')
      .type(worker.firstName);

    cy.get('#lastName')
      .type(worker.lastName);

    cy.get('#userEmail')
      .type(worker.email);

    cy.get('#age')
      .type(worker.age);

    cy.get('#salary')
      .type(worker.salary);

    cy.get('#department')
      .type(worker.department);

    cy.get('#submit')
      .click();

    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });
  it('should allow to delete added worker', () => {
    cy.get('#delete-record-1')
      .click();

    cy.get('#delete-record-1')
      .should('not.exist');
  });
  it('should allow to delete all workers', () => {
    cy.get('span[title="Delete"]')
      .each(() => {
        cy.get('span[title="Delete"]')
          .first()
          .click();
      });

    cy.get('.rt-noData')
      .contains('No rows found');
  });
  it('should allow to find worker in search field and edit it', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('#firstName')
      .type(worker.firstName);

    cy.get('#lastName')
      .type(worker.lastName);

    cy.get('#userEmail')
      .type(worker.email);

    cy.get('#age')
      .type(worker.age);

    cy.get('#salary')
      .type(worker.salary);

    cy.get('#department')
      .type(worker.department);

    cy.get('#submit')
      .click();

    cy.get('#searchBox')
      .type(worker.firstName + '{enter}');

    cy.get('span[title="Edit"]')
      .first()
      .click();

    cy.get('#firstName')
      .type(worker.firstName, 'new');

    cy.get('#submit')
      .click();

    cy.get('.rt-table')
      .should('contain', worker.firstName, 'new');
  });
  it('should allow to check search by all column values', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('#firstName')
      .type(worker.firstName);

    cy.get('#lastName')
      .type(worker.lastName);

    cy.get('#userEmail')
      .type(worker.email);

    cy.get('#age')
      .type(worker.age);

    cy.get('#salary')
      .type(worker.salary);

    cy.get('#department')
      .type(worker.department);

    cy.get('#submit')
      .click();

    cy.get('#searchBox')
      .type(worker.firstName + '{enter}');

    cy.get('.rt-table')
      .should('contain', worker.firstName);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(worker.lastName + '{enter}');

    cy.get('.rt-table')
      .should('contain', worker.lastName);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(worker.age + '{enter}');

    cy.get('.rt-table')
      .should('contain', worker.age);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(worker.email + '{enter}');

    cy.get('.rt-table')
      .should('contain', worker.email);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(worker.salary + '{enter}');

    cy.get('.rt-table')
      .should('contain', worker.salary);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(worker.department + '{enter}');

    cy.get('.rt-table')
      .should('contain', worker.department);
  });
});
