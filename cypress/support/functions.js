/// <reference types='cypress' />
import WebTablesPageObject from '../support/webTables.pageObject';
const faker = require('faker');
const webTablesPage = new WebTablesPageObject();

function createWorker() {
  const email = faker.internet.email();
  const randomAge = Math.floor(Math.random() * (65 - 18 + 1)) + 18;
  const randomSalary = Math.floor(Math.random(10) * 100000);
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: email.toLowerCase(),
    age: randomAge,
    salary: randomSalary,
    department: faker.name.jobArea()
  };
}

function randomSelect() {
  const data = ['5', '10', '20', '25', '50', '100'];
  return data[Math.floor(Math.random() * data.length)];
}

function deleteAllWorkers() {
  cy.get('.rt-table')
    .find('.action-buttons')
    .then((row) => {
      const workers = row.length;
      let record = 1;
      for (let a = 0; a < workers; a++) {
        cy.get(`#delete-record-${record}`).click();
        record++;
      };
    });
}
function addWorker() {
  const worker = createWorker();
  cy.clickOnElement('#addNewRecordButton', 'Add');
  webTablesPage.fillFirstNameField(worker.firstName);
  webTablesPage.fillLastNameField(worker.lastName);
  webTablesPage.fillEmailField(worker.email);
  webTablesPage.fillAgeField(worker.age);
  webTablesPage.fillSalaryField(worker.salary);
  webTablesPage.fillDepartmentField(worker.department);
  cy.clickOnElement('#submit', 'Submit');
  return worker;
}

module.exports = {
  createWorker, randomSelect, deleteAllWorkers, addWorker
};
