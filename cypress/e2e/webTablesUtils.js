
const faker = require('faker');

const worker = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  age: faker.random.number({ min: 18, max: 65 }),
  salary: faker.random.number({ min: 1000, max: 20000 }).toString(),
  department: faker.commerce.department()
};
const number = [5, 20, 25];
const rowCount = faker.random.arrayElement(number);
const editName = 'EDIT';

export function addWorker() {
  cy.get('#addNewRecordButton').click();
  cy.get('#registration-form-modal').should('be.visible');
  cy.getByPlaceholder('First Name').type(worker.firstName);
  cy.getByPlaceholder('Last Name').type(worker.lastName);
  cy.getByPlaceholder('name@example.com').type(worker.email);
  cy.getByPlaceholder('Age').type(worker.age);
  cy.getByPlaceholder('Salary').type(worker.salary);
  cy.getByPlaceholder('Department').type(worker.department);
  cy.get('#submit').click();
}
export function validateNewWorker() {
  cy.get('.rt-td').should('include.text', worker.firstName);
  cy.get('.rt-td').should('include.text', worker.lastName);
  cy.get('.rt-td').should('include.text', worker.email);
  cy.get('.rt-td').should('include.text', worker.age);
  cy.get('.rt-td').should('include.text', worker.salary);
  cy.get('.rt-td').should('include.text', worker.department);
}

export function validateWorkerRow() {
  cy.get('.rt-tr[role="row"]').should(($elements) => {
    const isDataFound = $elements.toArray().some(($element) => {
      const text = $element.innerText;
      return (
        text.includes(worker.firstName) &&
        text.includes(worker.lastName) &&
        text.includes(worker.email) &&
        text.includes(worker.age.toString()) &&
        text.includes(worker.salary.toString()) &&
        text.includes(worker.department)
      );
    });
    expect(isDataFound).to.be.true;
  });
}

export function validatePagination() {
  cy.get(`div[class='-previous'] button[type='button']`).should('exist');
  cy.get('.-pageInfo').should('exist');
  cy.get(`select[aria-label='rows per page']`).should('exist');
  cy.get(`div[class='-next'] button[type='button']`).should('exist');
}

export function validateRowCount() {
  cy.get(`select[aria-label='rows per page']`).select(`${rowCount}`);
  cy.get('.rt-tr[role="row"]').should('have.length', rowCount + 1);
}

export function deleteWorker() {
  cy.get('#delete-record-1').click();
  cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
}

export function deleteAllWorkers() {
  cy.get('[id^="delete-record"]').its('length').then((length) => {
    cy.log(length);
    for (let i = 1; i <= length; i++) {
      cy.get('[id^="delete-record"]').eq(0).click();
    }
  });
  cy.get('[id^="delete-record"]').should('not.exist');
}

export function findByFirstName() {
  cy.get('#searchBox').type(worker.firstName);
  cy.get('.rt-tr[role="row"]').eq(1).should('contain', worker.firstName);
}

export function findByLastName() {
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type(worker.lastName);
  cy.get('.rt-tr[role="row"]').eq(1).should('contain', worker.lastName);
}
export function findByEmail() {
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type(worker.email);
  cy.get('.rt-tr[role="row"]').eq(1).should('contain', worker.email);
}
export function findByAge() {
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type(worker.age);
  cy.get('.rt-tr[role="row"]').eq(1).should('contain', worker.age);
}
export function findBySalary() {
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type(worker.salary);
  cy.get('.rt-tr[role="row"]').eq(1).should('contain', worker.salary);
}
export function findByDepartment() {
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type(worker.department);
  cy.get('.rt-tr[role="row"]').eq(1).should('contain', worker.department);
}

export function editWorker() {
  findByLastName();
  cy.get('[id^="edit-record"]').click();
  cy.get('#registration-form-modal').should('be.visible');
  cy.getByPlaceholder('First Name').clear();
  cy.getByPlaceholder('First Name').type(editName);
  cy.get('#submit').click();
  cy.get('.rt-tr[role="row"]').eq(1).should('contain', editName);
  cy.get('.rt-tr[role="row"]').eq(1).should('not.contain', worker.name);
}
