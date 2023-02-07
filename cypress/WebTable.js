class WebTable {
  elements = {
    paginationInput: () => cy.get(".-pageJump > input"),
    prevBtnInput: () => cy.get(".-previous > .-btn"),
    nextBtnInput: () => cy.get(".-next > .-btn"),
    rowsPerPageInput: () => cy.get('select'),
    addNewRecordBtn: () => cy.get("#addNewRecordButton"),
    firstNameInput: () => cy.get("#firstName"),
    lastNameInput: () => cy.get("#lastName"),
    emailInput: () => cy.get("#userEmail"),
    ageInput: () => cy.get("#age"),
    salaryInput: () => cy.get("#salary"),
    departmentInput: () => cy.get("#department"),
    submitBtn: () => cy.get("#submit"),
    editBtn: () => cy.get("#edit-record-1"),
    ageElement: () =>
      cy.get(
        '.rt-tbody > :nth-child(1) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]'
      ),
    salaryElement: () =>
      cy.get(".rt-tbody > :nth-child(1) > .rt-tr > :nth-child(5)"),
    departElement: () =>
      cy.get(".rt-tbody > :nth-child(1) > .rt-tr > :nth-child(6)"),
    emailElement: () =>
      cy.get(".rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)"),
    lasNameElement: () =>
      cy.get(".rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)"),
    firstNmElement: () =>
      cy.get(".rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)"),
    deleteBtn: () => cy.get("#delete-record-1"),
    srchBoxInput: () => cy.get("#searchBox"),
    firstNameEl: () => cy.get(":nth-child(4) > .rt-tr > :nth-child(1)"),
    lastNameEl : () => cy.get(":nth-child(4) > .rt-tr > :nth-child(2)"),
    randAgeEl : () => cy.get(":nth-child(4) > .rt-tr > :nth-child(3)"),
    emailEl : () => cy.get(":nth-child(4) > .rt-tr > :nth-child(4)"),
    salaryEl: () => cy.get(":nth-child(4) > .rt-tr > :nth-child(5)"),
    departmentEl: () => cy.get(":nth-child(4) > .rt-tr > :nth-child(6)"),
  };
  navigate() {
    cy.visit("/webtables");
  }

  verifyPageNumber(value = 1) {
    this.elements.paginationInput().should("have.value", value);
  }

  verifyPreviousbtn(value = "Previous") {
    this.elements.prevBtnInput().should("have.text", value).and("be.disabled");
  }

  verifyNextbtn(value = "Next") {
    this.elements.nextBtnInput().should("have.text", value).and("be.disabled");
  }

  selectRow(value) {
    this.elements.rowsPerPageInput().select(value)
    
  }
  addNewRecord() {
    this.elements.addNewRecordBtn().click();
  }
  typeFirstName(input) {
    this.elements.firstNameInput().type(input);
  }
  typeLastName(input) {
    this.elements.lastNameInput().type(input);
  }
  typeEmail(input) {
    this.elements.emailInput().type(input);
  }
  typeAge(input) {
    this.elements.ageInput().type(input);
  }
  typeSalary(input) {
    this.elements.salaryInput().type(input);
  }
  typeDepartment(input) {
    this.elements.departmentInput().type(input);
  }
  clickSubmit() {
    this.elements.submitBtn().click();
  }
  clickNex() {
    this.elements.nextBtnInput().click();
  }
  clickPrevious() {
    this.elements.prevBtnInput().click();
  }
  verifyRow(value) {
    this.elements.rowsPerPageInput().should("have.value", value);
  }
  clickEdit() {
    this.elements.editBtn().click();
  }
  editAge(randomAge) {
    this.elements.ageInput().clear().type(randomAge);
    this.elements.submitBtn().click();
    this.elements.ageElement().should("contain.text", randomAge);
  }
  editSalary(randomSalary) {
    this.elements.salaryInput().clear().type(randomSalary);
    this.elements.submitBtn().click();
    this.elements.salaryElement().should("contain.text", randomSalary);
  }
  editDepartment(department) {
    this.elements.departmentInput().clear().type(department);
    this.elements.submitBtn().click();
    this.elements.departElement().should("contain.text", department);
  }
  editEmail(email) {
    this.elements.emailInput().clear().type(email);
    this.elements.submitBtn().click();
    this.elements.emailElement().should("contain.text", email);
  }
  editLastName(lastName) {
    this.elements.lastNameInput().clear().type(lastName);
    this.elements.submitBtn().click();
    this.elements.lasNameElement().should("contain.text", lastName);
  }
  editFirstName(firstName) {
    this.elements.firstNameInput().clear().type(firstName);
    this.elements.submitBtn().click();
    this.elements.firstNmElement().should("contain.text", firstName);
  }
  verifyFirstNme(firstName) {
    this.elements.firstNameEl().should("contain.text", firstName);
  }
  verifyLastName(lastName) {
    this.elements.lastNameEl().should("contain.text", lastName);
  }
  verifyAge(randomAge) {
    this.elements.randAgeEl().should("contain.text", randomAge);
  }
  verifyEmail(email) {
    this.elements.emailEl().should("contain.text", email);
  }
  verifySalary(randomSalary) {
    this.elements.salaryEl().should("contain.text", randomSalary);
  }
  verifyDepartment(department) {
    this.elements.departmentEl().should("contain.text", department);
  }
  deleteWorker() {
    this.elements.deleteBtn().click();
  }
  searchFirstNme(firstName) {
    this.elements.srchBoxInput().type(firstName);
    this.elements.firstNmElement().should("contain.text", firstName);
  }
  searchLastNAme(lastName) {
    this.elements.srchBoxInput().type(lastName);
    this.elements.lasNameElement().should("contain.text", lastName);
  }
  searchAge(randomAge) {
    this.elements.srchBoxInput().type(randomAge);
    this.elements.ageElement().should("contain.text", randomAge);
  }
  searchEmail(email) {
    this.elements.srchBoxInput().type(email);
    this.elements.emailElement().should("contain.text", email);
  }
  searchSalary(randomSalary) {
    this.elements.srchBoxInput().type(randomSalary);
    this.elements.salaryElement().should("contain.text", randomSalary);
  }
  searchDepartment(department) {
    this.elements.srchBoxInput().type(department);
    this.elements.departElement().should("contain.text", department);
  }

}

module.exports = new WebTable();
