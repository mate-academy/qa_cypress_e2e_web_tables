const { faker } = require('@faker-js/faker');

class UserPageObject {
  addedUser;

  get search() {
    return cy.get('#searchBox');
  }

  openModal() {
    cy.get('#addNewRecordButton')
      .click();
  }

  existModal() {
    cy.get('#addNewRecordButton')
      .should('exist');
  }

  fillModal() {
    this.addedUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 60 }),
      salary: faker.number.int({ min: 1000, max: 5000 }),
      department: faker.commerce.department()
    };

    cy.get('#firstName')
      .type(this.addedUser.firstName);

    cy.get('#lastName')
      .type(this.addedUser.lastName);

    cy.get('#userEmail')
      .type(this.addedUser.email);

    cy.get('#age')
      .type(this.addedUser.age);
    cy.get('#salary')
      .type(this.addedUser.salary);
    cy.get('#department')
      .type(this.addedUser.department);
  }

  addPerson() {
    cy.get('#submit')
      .click();
  }

  checkUser() {
    if (this.addedUser) {
      cy.contains('.rt-td', this.addedUser.firstName)
        .should('exist');
      cy.contains('.rt-td', this.addedUser.lastName)
        .should('exist');
      cy.contains('.rt-td', this.addedUser.age)
        .should('exist');
      cy.contains('.rt-td', this.addedUser.salary)
        .should('exist');
      cy.contains('.rt-td', this.addedUser.email)
        .should('exist');
      cy.contains('.rt-td', this.addedUser.department)
        .should('exist');
    }
  }

  removeUser() {
    if (this.addedUser) {
      cy.get('#searchBox')
        .type(this.addedUser.email);

      cy.get('[id^="delete-record-"]')
        .click();

      cy.contains('No rows found')
        .should('exist');
    }
  }

  selectCount(count) {
    cy.get('[aria-label="rows per page"')
      .select(count);
  }

  checkCount(count) {
    cy.get('.rt-tr').should('have.length', count);
  }

  changePage(page) {
    cy.get('[aria-label="jump to page"]')
      .type(page + '{Enter}');
  }

  haveLength(length) {
    cy.get('.-padRow').should('have.length', length);
  }

  removeAllUsers() {
    cy.get('[id^="delete-record-"]').then(($items) => {
      const itemCount = $items.length;

      for (let i = 0; i < itemCount; i++) {
        cy.get('[id^="delete-record-"]')
          .first()
          .click();
      }
    });

    cy.contains('No rows found')
      .should('exist');
  }

  findAndEdit() {
    this.openModal();

    this.fillModal();
    this.addPerson();

    this.search.type(this.addedUser.email);

    cy.get('[id^="edit-record-"]')
      .click();

    this.fillModal();
    this.addPerson();

    this.search.type('');

    this.checkUser();
  }

  searchByField(search) {
    this.search.type(search);
  }
}

export default UserPageObject;
