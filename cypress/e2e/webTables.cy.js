import Webtable from "../Webtable";
const { generateUser } = require("../support/generate");
const { firstName, lastName, email, randomAge, randomSalary, department } =
  generateUser();

describe("Pagination", () => {
  beforeEach(() => {
    Webtable.navigate();
  });

  it("Pagination should have number `1` page as default value", () => {
    Webtable.verifyPageNumber();
  });

  it("buttons `Previous` and `Next` should be disabled if workers count less then page can contain", () => {
    Webtable.verifyPreviousbtn();
    Webtable.verifyNextbtn();
  });

  it("buttons `Next` and `Previous` should be activated when amount of workers > rows amoount limit ", () => {
    Webtable.selectRow("5");
    cy.addNewWorker();
    cy.addNewWorker();
    cy.addNewWorker();
    Webtable.clickNex();
    Webtable.clickPrevious();
  });

  describe("Rows count selection", () => {
    beforeEach(() => {
      Webtable.navigate();
    });
    it("should have `10` as default value", () => {
      Webtable.verifyRow(10);
    });

    it("should provide ability to select `5 rows` value in `select`", () => {
      Webtable.selectRow("5 rows");
    });

    it("should provide ability to select `20 rows` value in `select`", () => {
      Webtable.selectRow("20 rows");
    });

    it("should provide ability to select `25 rows` value in `select`", () => {
      Webtable.selectRow("25 rows");
    });

    it("should provide ability to select `50 rows` value in `select`", () => {
      Webtable.selectRow("50 rows");
    });

    it("should provide ability to select `100 rows` value in `select`", () => {
      Webtable.selectRow("100 rows");
    });
  });

  describe("Add new worker ", () => {
    beforeEach(() => {
      Webtable.navigate();
    });

    it("user should be able to add new worker ", () => {
      cy.addNewWorker();
    });

    it("user should not be able to add an existing worker ", () => {
      Webtable.addNewRecord();
      Webtable.typeFirstName("Cierra");
      Webtable.typeLastName("Vega");
      Webtable.typeEmail("cierra@example.com");
      Webtable.typeAge("39");
      Webtable.typeSalary("10000");
      Webtable.typeDepartment("Insurance");
      Webtable.clickSubmit();
      cy.on("window:alert", (text) => {
        expect(text).to.equal("This worker already exist");
      });
    });
  });

  describe("Validate data in worker row after creating worker", () => {
    beforeEach(() => {
      Webtable.navigate();
    });
    it("should validate a worker after adding it", () => {
      const randomWorker = generateUser();
      Webtable.addNewRecord();
      Webtable.typeFirstName(randomWorker.firstName);
      Webtable.typeLastName(randomWorker.lastName);
      Webtable.typeEmail(randomWorker.email);
      Webtable.typeAge(randomWorker.randomAge);
      Webtable.typeSalary(randomWorker.randomSalary);
      Webtable.typeDepartment(randomWorker.department);
      Webtable.clickSubmit();
      cy.wait(5000);
      Webtable.verifyFirstNme(randomWorker.firstName);
      Webtable.verifyLastName(randomWorker.lastName);
      Webtable.verifyEmail(randomWorker.email);
      Webtable.verifyAge(randomWorker.randomAge);
      Webtable.verifySalary(randomWorker.randomSalary);
      Webtable.verifyDepartment(randomWorker.department);
    });
  });

  describe("Delete a worker and all workers ", () => {
    beforeEach(() => {
      Webtable.navigate();
    });
    it("user should be able to delete an existing worker ", () => {
      Webtable.deleteWorker();
    });

    it("user should be able to delete all existing workers ", () => {
      cy.deleteAllWorkers(3);
    });
  });

  describe("Find worker in search field by all columns", () => {
    it("should provide ability to search a worker by first name", () => {
      Webtable.searchFirstNme("Cierra");
    });

    it("should provide ability to search a worker by last name", () => {
      Webtable.searchLastNAme("Vega");
    });

    it("should provide ability to search a worker by age", () => {
      Webtable.searchAge("39");
    });

    it("should provide ability to search a worker by email", () => {
      Webtable.searchEmail("cierra@example.com");
    });

    it("should provide ability to search a worker by salary", () => {
      Webtable.searchSalary("10000");
    });
    it("should provide ability to search a worker by department", () => {
      Webtable.searchDepartment("Insurance");
    });
  });
  describe("Edit workers information", () => {
    beforeEach(() => {
      Webtable.navigate();
    });

    it("user should be able to edit first name ", () => {
      Webtable.clickEdit();
      Webtable.editFirstName(firstName);
    });

    it("user should be able to edit last name ", () => {
      Webtable.clickEdit();
      Webtable.editLastName(lastName);
    });

    it("user should be able to edit an email ", () => {
      Webtable.clickEdit();
      Webtable.editEmail(email);
    });

    it("user should be able to edit age ", () => {
      Webtable.clickEdit();
      Webtable.editAge(randomAge);
    });

    it("user should be able to edit salary", () => {
      Webtable.clickEdit();
      Webtable.editSalary(randomSalary);
    });

    it("user should be able to edit department ", () => {
      Webtable.clickEdit();
      Webtable.editDepartment(department);
    });
  });
});
