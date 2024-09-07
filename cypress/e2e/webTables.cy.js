/// <reference types='cypress' />

describe("Web Tables page visibility ", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com/webtables");
  });

  it("Should check the visibility of pagination", () => {
    cy.get(".-pagination").should("be.visible");
  });

  it("Should check the visibility of Rows count selection option", () => {
    cy.get(".-pageSizeOptions").should("be.visible");
  });

  it("Should check the visibility and functionality of Add a new worker option", () => {
    cy.get("#addNewRecordButton").should("be.visible");
    cy.get("#addNewRecordButton").click();
    cy.get('input[placeholder="First Name"]').type("Michał");
    cy.get('input[placeholder="Last Name"]').type("Anioł");
    cy.get("#userEmail").type("michalaniol@gmail.com");
    cy.get('input[placeholder="Age"]').type("20");
    cy.get('input[placeholder="Salary"]').type("10000");
    cy.get('input[placeholder="Department"]').type("Burgers");
    cy.get("#submit").click();
  });

  it("Should test the functionality of delete worker", () => {
    cy.get("#delete-record-1").click();
  });
  it("Should delete all workers", () => {
    cy.get("#delete-all-records").click();
    //there is no such button??
  });

  it("Should find a worker in a search bar and edit it and check edited properties visibility ", () => {
    cy.get("#searchBox").type("Cierra");
    cy.get("#edit-record-1").should("be.visible").click();
    cy.get('input[placeholder="First Name"]').clear().type("Cierrra");
    cy.get("#submit").click();
    cy.get("div.rt-td").contains("Cierrra").should("be.visible");
  });
  it("Search by all column values", () => {
    const searchValues = [
      "Cierra",
      "Vega",
      "39",
      "cierra@example.com",
      "10000",
      "Insurance",
    ];

    searchValues.forEach((value) => {
      cy.get("#searchBox").clear().type(value);
      cy.get(".rt-tbody").should("contain", value);
    });
  });
});
