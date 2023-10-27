/// <reference types='cypress' />

const { generateUser } = require("../support/generate");

describe("Web Tables page", () => {
    const { firstName, lastName, email, age, salary, department } =
      generateUser();

    beforeEach(() => {
      cy.visit("/");
    });

    it("should have the pagination visible", () => {
      cy.get(".-pagination").should("exist");
      cy.contains("button", "Previous").should("be.visible");
      cy.contains("button", "Next").should("be.visible");
    });

    it("shoud have the rows count selection", () => {
      cy.get('[aria-label="rows per page"]')
        .should("contain", "5 rows")
        .select("5 rows");

      cy.get('[aria-label="rows per page"]')
        .should("contain", "10 rows")
        .select("10 rows");
    });

    it("should create new worker", () => {
      cy.get("#addNewRecordButton").click();
      cy.get("#firstName").type(firstName);
      cy.get("#lastName").type(lastName);
      cy.get("#userEmail").type(email);
      cy.get("#age").type(age);
      cy.get("#salary").type(salary);
      cy.get("#department").type(department);
      cy.get("#submit")
        .click()
        .then(() => {
          cy.get(".rt-tbody .rt-tr").find(".rt-td").should("contain", lastName);
        });
    });

    it("should delete a worker", () => {
      cy.get("#delete-record-1").click();
      cy.get(".rt-tbody").should("not.contain", "#delete-record-1");
    });

    it("should delete all workers", () => {
      cy.get("#delete-record-1").click();
      cy.get("#delete-record-1").should("not.exist");
      cy.get("#delete-record-2").click();
      cy.get("#delete-record-2").should("not.exist");
      cy.get("#delete-record-3").click();
      cy.get("#delete-record-3").should("not.exist");
    });

    it("should find and edit the worker", () => {
      cy.get('[placeholder="Type to search"]').type("Vega");
      cy.get('[id="edit-record-1"]').click();
      cy.get('[placeholder="First Name"]').type("sh");
      cy.get('[id="submit"]').click();
      cy.get(".rt-td").should("contain", "Cierrash");
    });

    it("should validate data in worker row after creating worker", () => {
      cy.get("#addNewRecordButton").click();
      cy.get("#firstName").type(firstName);
      cy.get("#lastName").type(lastName);
      cy.get("#userEmail").type(email);
      cy.get("#age").type(age);
      cy.get("#salary").type(salary);
      cy.get("#department").type(department);

      cy.get("#submit").click();
      cy.get(".rt-td").should("contain", firstName);
      cy.get(".rt-td").should("contain", lastName);
      cy.get(".rt-td").should("contain", email);
      cy.get(".rt-td").should("contain", age);
      cy.get(".rt-td").should("contain", salary);
      cy.get(".rt-td").should("contain", department);
    });

    it(" should search by all column values", () => {
      cy.get('[placeholder="Type to search"]').type("Cierra");
      cy.get(".rt-tbody").should("contain", "Cierra");
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type("Vega");
      cy.get(".rt-tbody").should("contain", "Vega");
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type("39");
      cy.get(".rt-tbody").should("contain", "39");
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type("cierra@example.com");
      cy.get(".rt-tbody").should("contain", "cierra@example.com");
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type("10000");
      cy.get(".rt-tbody").should("contain", "10000");
      cy.get('[placeholder="Type to search"]').clear();
      cy.get('[placeholder="Type to search"]').type("Insurance");
      cy.get(".rt-tbody").should("contain", "Insurance");
	});
});
