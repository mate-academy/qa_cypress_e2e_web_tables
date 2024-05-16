describe("Web Tables page", () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit("https://demoqa.com/webtables");
  });

  it("should have the pagination", () => {
    cy.get(".-pagination").should("exist");
    cy.get(".-pagination").should("contain.text", "Previous");
    cy.get(".-pagination").should("contain.text", "Page");
    cy.get(".-pagination").should("contain.text", "Next");
    cy.get(".-pagination .-pageJump input").should("have.attr", "type", "number");
  });

  it("should have Rows count selection", () => {
    cy.get('[aria-label="rows per page"]').should("exist");
    cy.get('[aria-label="rows per page"]').select("5 rows").should('have.value', '5');
    cy.get('[aria-label="rows per page"]').select("10 rows").should('have.value', '10');
    cy.get('[aria-label="rows per page"]').select("20 rows").should('have.value', '20');
    cy.get('[aria-label="rows per page"]').select("25 rows").should('have.value', '25');
  });

  it("should add a new worker", () => {
    for (let i = 0; i < 2; i++) {
      cy.log(`Iteration ${i + 1}`);
      cy.get("#addNewRecordButton").click();
      cy.get("#firstName").type(user.firstName);
      cy.get("#lastName").type(user.lastName);
      cy.get("#userEmail").type(user.email);
      cy.get("#age").type(user.age);
      cy.get("#salary").type(user.salary);
      cy.get("#department").type(user.department);
      cy.get("#submit").click();
      cy.get(".rt-tbody").should("contain", user.firstName);
      cy.get(".rt-tbody").should("contain", user.lastName);
      cy.get(".rt-tbody").should("contain", user.email);
      cy.get(".rt-tbody").should("contain", user.age);
      cy.get(".rt-tbody").should("contain", user.salary);
      cy.get(".rt-tbody").should("contain", user.department);
    }
  });

  it("should validate data in worker row after creating worker", () => {
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#userEmail").type(user.email);
    cy.get("#age").type(user.age);
    cy.get("#salary").type(user.salary);
    cy.get("#department").type(user.department);
    cy.get("#submit").click();

    cy.get(".rt-td").should("contain", user.firstName);
    cy.get(".rt-td").should("contain", user.lastName);
    cy.get(".rt-td").should("contain", user.email);
    cy.get(".rt-td").should("contain", user.age);
    cy.get(".rt-td").should("contain", user.salary);
    cy.get(".rt-td").should("contain", user.department);
  });

  it("should find worker in search field and edit it", () => {
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#userEmail").type(user.email);
    cy.get("#age").type(user.age);
    cy.get("#salary").type(user.salary);
    cy.get("#department").type(user.department);
    cy.get("#submit").click();

    cy.get("#searchBox").type(user.firstName);
    cy.get(".rt-td").should("contain", user.firstName);
    cy.get('.rt-table').scrollIntoView().scrollTo('right');
    cy.get("#edit-record-4 > svg").click();
    cy.get("#firstName").clear().type(user.firstName + user.lastName);
    cy.get("#lastName").clear().type(user.lastName);
    cy.get("#userEmail").clear().type(user.email);
    cy.get("#age").clear().type(user.age);
    cy.get("#salary").clear().type(user.salary);
    cy.get("#department").clear().type(user.department);
    cy.get("#submit").click();

    cy.get(".rt-td").should("contain", user.firstName + user.lastName);
    cy.get(".rt-td").should("contain", user.lastName);
    cy.get(".rt-td").should("contain", user.email);
    cy.get(".rt-td").should("contain", user.age);
    cy.get(".rt-td").should("contain", user.salary);
    cy.get(".rt-td").should("contain", user.department);
  });

  it("should check search by all column values", () => {
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#userEmail").type(user.email);
    cy.get("#age").type(user.age);
    cy.get("#salary").type(user.salary);
    cy.get("#department").type(user.department);
    cy.get("#submit").click();

    cy.get("#searchBox").type(user.firstName);
    cy.get(".rt-td").should("contain", user.firstName);
    cy.get("#searchBox").clear().type(user.lastName);
    cy.get(".rt-td").should("contain", user.lastName);
    cy.get("#searchBox").clear().type(user.age);
    cy.get(".rt-td").should("contain", user.age);
    cy.get("#searchBox").clear().type(user.email);
    cy.get(".rt-td").should("contain", user.email);
    cy.get("#searchBox").clear().type(user.salary);
    cy.get(".rt-td").should("contain", user.salary);
    cy.get("#searchBox").clear().type(user.department);
    cy.get(".rt-td").should("contain", user.department);
  });

  it("should delete worker by Delete button", () => {
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#userEmail").type(user.email);
    cy.get("#age").type(user.age);
    cy.get("#salary").type(user.salary);
    cy.get("#department").type(user.department);
    cy.get("#submit").click();

    cy.get("#delete-record-1").click();
    cy.get(".rt-tbody").should("not.contain", user.firstName);
    cy.get(".rt-tbody").should("not.contain", user.lastName);
    cy.get(".rt-tbody").should("not.contain", user.email);
  });

  it("should delete workers by Delete buttons", () => {
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#userEmail").type(user.email);
    cy.get("#age").type(user.age);
    cy.get("#salary").type(user.salary);
    cy.get("#department").type(user.department);
    cy.get("#submit").click();

    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#userEmail").type(user.email);
    cy.get("#age").type(user.age);
    cy.get("#salary").type(user.salary);
    cy.get("#department").type(user.department);
    cy.get("#submit").click();

    cy.get("#delete-record-1").click();
    cy.get(".rt-tbody").should("not.contain", user.firstName);
    cy.get("#delete-record-2").click();
    cy.get(".rt-tbody").should("not.contain", user.firstName);
  });
});
