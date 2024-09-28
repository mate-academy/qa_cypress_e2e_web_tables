class RegistrationForm {
  get formTitle() {
    return cy.getById('registration-form-modal');
  }

  get firstNameField() {
    return cy.getById('firstName');
  }

  get lastNameField() {
    return cy.getById('lastName');
  }

  get emailField() {
    return cy.getById('userEmail');
  }

  get ageField() {
    return cy.getById('age');
  }

  get salaryField() {
    return cy.getById('salary');
  }

  get departmentField() {
    return cy.getById('department');
  }

  get submitBtn() {
    return cy.get('button[id=submit]');
  }

  assertFormExists(title, submitBtn) {
    this.formTitle
      .should('exist')
      .and('be.visible')
      .and('contain.text', title);

    this.firstNameField
      .should('exist')
      .and('be.visible');

    this.lastNameField
      .should('exist')
      .and('be.visible');

    this.emailField
      .should('exist')
      .and('be.visible');

    this.ageField
      .should('exist')
      .and('be.visible');

    this.salaryField
      .should('exist')
      .and('be.visible');

    this.departmentField
      .should('exist')
      .and('be.visible');

    this.submitBtn
      .should('exist')
      .and('be.visible')
      .and('contain.text', submitBtn);

    return this;
  }

  fillFormAndSubmit(workerData) {
    const {
      firstName,
      lastName,
      email,
      age,
      salary,
      department
    } = workerData;

    this.firstNameField
      .type(firstName);

    this.lastNameField
      .type(lastName);

    this.emailField
      .type(email);

    this.ageField
      .type(age);

    this.salaryField
      .type(salary);

    this.departmentField
      .type(department);

    this.submitBtn
      .click();

    return this;
  }

  assertFormContainsWorkerData(workerData) {
    const {
      firstName,
      lastName,
      email,
      age,
      salary,
      department
    } = workerData;

    this.firstNameField
      .should('contain.value', firstName);

    this.lastNameField
      .should('contain.value', lastName);

    this.emailField
      .should('contain.value', email);

    this.ageField
      .should('contain.value', age);

    this.salaryField
      .should('contain.value', salary);

    this.departmentField
      .should('contain.value', department);

    return this;
  }

  editFormAndSubmit(updatedData) {
    const {
      email: updatedEmail,
      age: updatedAge,
      salary: updatedSalary,
      department: updatedDepartment
    } = updatedData;
    const updatedPart = ' edited';

    this.firstNameField
      .type(updatedPart);

    this.lastNameField
      .type(updatedPart);

    this.emailField
      .clear()
      .type(updatedEmail);

    this.ageField
      .clear()
      .type(updatedAge);

    this.salaryField
      .clear()
      .type(updatedSalary);

    this.departmentField
      .clear()
      .type(updatedDepartment);

    this.submitBtn
      .click();

    return this;
  }
}

export default RegistrationForm;
