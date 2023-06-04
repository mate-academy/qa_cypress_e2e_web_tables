describe("Web Tables page", () => {
  let worker;

  beforeEach(() => {
    cy.visit("/");
  });

  it("should add new workers and page navigation", () => {
    for (let i = 0; i < 5; i++) {
      cy.task("generateWorker").then((generateWorker) => {
        const worker = generateWorker;
        cy.get("#addNewRecordButton").click();
        cy.findByPlaceholder("First Name").type(worker.firstName);
        cy.findByPlaceholder("Last Name").type(worker.lastName);
        cy.findByPlaceholder("name@example.com").type(worker.email);
        cy.findByPlaceholder("Age").type(worker.age);
        cy.findByPlaceholder("Salary").type(worker.salary);
        cy.findByPlaceholder("Department").type(worker.department);
        cy.get("#submit").click();

        cy.get(".ReactTable").should("contain", worker.firstName);
        cy.get(".ReactTable").should("contain", worker.lastName);
        cy.get(".ReactTable").should("contain", worker.email);
        cy.get(".ReactTable").should("contain", worker.age);
        cy.get(".ReactTable").should("contain", worker.salary);
        cy.get(".ReactTable").should("contain", worker.department);
      });
    }
    cy.get('[aria-label="rows per page"]').select("5");
    cy.get(".-next > .-btn").click();
    cy.get(".-previous > .-btn").click();
    cy.get(".-pageJump > input").type("2 {enter}");
    cy.get(".-pageJump > input").clear().type("1 {enter}");
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');

    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2');

    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
  });

  it("should search and edit workers", () => {
    cy.task("generateWorker").then((generateWorker) => {
      const worker = generateWorker;
      cy.get("#addNewRecordButton").click();
      cy.findByPlaceholder("First Name").type(worker.firstName);
      cy.findByPlaceholder("Last Name").type(worker.lastName);
      cy.findByPlaceholder("name@example.com").type(worker.email);
      cy.findByPlaceholder("Age").type(worker.age);
      cy.findByPlaceholder("Salary").type(worker.salary);
      cy.findByPlaceholder("Department").type(worker.department);
      cy.get("#submit").click();
      cy.findByPlaceholder("Type to search").type(worker.firstName);
      cy.findByPlaceholder("Type to search").clear().type(worker.lastName);
      cy.findByPlaceholder("Type to search").clear().type(worker.email);
      cy.findByPlaceholder("Type to search").clear().type(worker.age);
      cy.findByPlaceholder("Type to search").clear().type(worker.salary);
      cy.findByPlaceholder("Type to search").clear().type(worker.department);
      cy.get(".mr-2").click();
      cy.findByPlaceholder("First Name").clear().type("firstName");
      cy.get("#submit").click();
    });
  });
});