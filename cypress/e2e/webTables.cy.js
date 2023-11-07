describe("Web Tables Page", () => {
  const worker = {
    firstName: "Mykhailo",
    lastName: "Rozmaznin",
    email: "rozmaznin@gmail.com",
    age: "19",
    salary: "30000",
    department: "QA",
  };

  const def_worker1 = "Cierra";

  const def_worker2 = "Alden";

  const def_worker3 = "Kierra";

  function addNewWorker(worker) {
    cy.contains("Add").click();
    cy.get("#firstName").type(worker.firstName);
    cy.get("#lastName").type(worker.lastName);
    cy.get("#userEmail").type(worker.email);
    cy.get("#age").type(worker.age);
    cy.get("#salary").type(worker.salary);
    cy.get("#department").type(worker.department);
    cy.get("#submit").click();
    cy.wait(2000);
  }

  beforeEach(() => {
    cy.visit("https://demoqa.com/webtables");
  });

  it("should have the pagination", () => {
    cy.contains("Page").should("exist");
    cy.get("select").should("exist");
    cy.get(".-next > .-btn").should("exist");
    cy.get(".-previous > .-btn").should("exist");
    cy.get(".-totalPages").should("exist");
    cy.get(".-pageJump > input").should("exist");
    cy.get(".-pageInfo").should("exist");
  });

  it("should contain rows", () => {
    cy.get('[aria-label="rows per page"]').select("5");
    cy.contains("5 rows").click({ force: true });
    const rowCount = 5 + 1; // + 1 for info row, cypress counts it as one more row
    cy.get(".rt-tr").should("have.length", rowCount);
  });

  it("should provide to add a new worker", () => {
    addNewWorker(worker);
    cy.contains(worker.firstName).should("exist");
    cy.contains(worker.email).should("exist");
    cy.contains(worker.age).should("exist");
    cy.contains(worker.salary).should("exist");
    cy.contains(worker.department).should("exist");
  });

  it("should provide an ability to delete workers", () => {
    cy.get("#delete-record-3 > svg").click();
    cy.get(".rt-td").should("not.contain", def_worker3);
  });

  it("should provide an ability to delete all workers", () => {
    const totalRecords = 3;

    for (let i = 1; i <= totalRecords; i++) {
      cy.get(`#delete-record-${i}`).click();

      cy.get(".rt-td").should("not.contain", `#delete-record-${i}`);
    }
  });

  it("should provide an ability to edit workers", () => {
    addNewWorker(worker);
    const newAge = "35";
    cy.get("#searchBox").type(worker.firstName);
    cy.wait(2000);
    cy.get("#edit-record-4 > svg > path").click();
    cy.get("#age").clear().type(newAge);
    cy.get("#submit").click();
    cy.contains(newAge).should("exist");
  });

  it("should search for existing workers", () => {
    const workerNames = [def_worker1, def_worker2, def_worker3];

    workerNames.forEach((workerName) => {
      cy.get("#searchBox").type(workerName);
      cy.wait(500);
      cy.contains(workerName).should("exist");

      cy.get("#searchBox").clear();
    });
  });
});
